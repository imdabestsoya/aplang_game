import { describe, expect, it } from 'vitest';
import { content } from '../../src/content/foundation';
import { initialState, transition } from '../../src/engine/transition';
import { loadRun, loadSettings, RUN_KEY, saveRun, saveSettings, serializeRun, SETTINGS_KEY } from '../../src/persistence/storage';
import { validState } from '../../src/persistence/validation';
import type { StoragePort } from '../../src/persistence/storage';
import { act, fixture, pick, prepared } from '../fixtures/engine';

function memory() {
  const values = new Map<string, string>();
  const storage: StoragePort = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
  return { values, storage, access: () => storage };
}

describe('versioned run storage', () => {
  it('starts fresh without writing anything on load', () => {
    const store = memory();
    const result = loadRun(content, store.access);
    expect(result).toMatchObject({ issue: null, needsRecovery: false, canSave: true });
    expect(result.state).toEqual(initialState(content));
    expect(store.values.size).toBe(0);
  });
  it('restores consequence, effects and evidence exactly once and rejects pre-refresh actions', () => {
    const store = memory();
    const before = prepared(initialState(fixture));
    const state = pick(before, 'question');
    expect(saveRun(state, fixture, store.access)).toBeNull();
    const loaded = loadRun(fixture, store.access);
    expect(loaded.issue).toBeNull();
    expect(loaded.state).toEqual(state);
    expect(transition(loaded.state, { type: 'choose', revision: before.revision, cardId: 'entry', choiceId: 'question', variantId: null }, fixture).state).toBe(loaded.state);
    expect(loaded.state.history).toHaveLength(1);
    expect(loaded.state.reputation).toBe(61);
  });
  it('round-trips every phase, hints, replay snapshots, and terminal outcomes', () => {
    const store = memory();
    let state = initialState(fixture);
    const roundTrip = () => {
      expect(validState(state, fixture)).toBe(true);
      saveRun(state, fixture, store.access);
      expect(loadRun(fixture, store.access).state).toEqual(state);
    };
    roundTrip();
    state = act(state, { type: 'hint', puzzleId: 'p1' }); roundTrip();
    state = prepared(state); roundTrip();
    for (const id of ['question', 'challenge', 'wait', 'refuse']) {
      state = pick(state, id); roundTrip();
      state = act(state, { type: 'continue' }); roundTrip();
    }
    state = act(state, { type: 'replay', chapter: 2 }); roundTrip();
    state = pick(state, 'panic'); roundTrip();
    state = act(state, { type: 'continue' }); roundTrip();
    state = act(state, { type: 'restart' }); roundTrip();
  });
  it('round-trips the non-ending sample boundary', () => {
    const store = memory();
    const state = act(pick(initialState(content), 'question-source', content), { type: 'continue' }, content);
    saveRun(state, content, store.access);
    expect(loadRun(content, store.access).state).toEqual(state);
  });
  it.each(['{', 'null', '{}', '{"version":999}', '{"version":1,"contentVersion":"outdated"}'])('preserves corrupt/incompatible data %s until explicit recovery', (raw) => {
    const store = memory(); store.values.set(RUN_KEY, raw);
    const loaded = loadRun(content, store.access);
    expect(loaded.needsRecovery).toBe(true);
    expect(loaded.canSave).toBe(false);
    expect(store.values.get(RUN_KEY)).toBe(raw);
  });
  it('rejects well-formed JSON with invalid state, history or checkpoints', () => {
    const state = pick(initialState(content), 'question-source', content);
    const invalid = [
      { ...state, reputation: null }, { ...state, hysteria: 1000 },
      { ...state, revision: -1 }, { ...state, currentCardId: 'missing' },
      { ...state, flags: { ...state.flags, falseAccusation: 'false' } },
      { ...state, flags: { ...state.flags, falseAccusation: true } },
      { ...state, flags: { ...state.flags, poppetProvenance: true } },
      { ...state, evidenceIds: ['missing'] }, { ...state, phase: 'choice' },
      { ...state, history: [...state.history, ...state.history] },
      { ...state, checkpoints: [] }, { ...state, ending: { id: 'name-preserved' } },
      { ...state, solvedPuzzleIds: ['missing'] },
      { ...state, hintLevels: { missing: 7 } },
      { ...state, history: [{ ...state.history[0], after: { reputation: 100, hysteria: 25 } }] },
    ];
    for (const value of invalid) {
      const store = memory();
      const envelope = JSON.parse(serializeRun(state, content)); envelope.state = value;
      store.values.set(RUN_KEY, JSON.stringify(envelope));
      const loaded = loadRun(content, store.access);
      expect(loaded.needsRecovery).toBe(true);
      expect(loaded.state).toEqual(initialState(content));
    }
  });
  it('rejects a save that erases a recorded accusation', () => {
    const state = pick(initialState(fixture), 'accuse');
    state.flags.falseAccusation = false;
    expect(validState(state, fixture)).toBe(false);
  });
  it('supports unavailable storage and write-quota errors without losing live state', () => {
    const inaccessible = () => { throw new Error('SecurityError'); };
    expect(loadRun(content, inaccessible)).toMatchObject({ canSave: false, needsRecovery: false });
    const state = pick(initialState(content), 'question-source', content);
    const quota: StoragePort = { getItem: () => null, setItem: () => { throw new Error('QuotaExceededError'); } };
    expect(saveRun(state, content, () => quota)).toContain('current game still works');
    expect(state.history).toHaveLength(1);
    expect(saveRun(state, content, inaccessible)).toContain('could not be saved');
  });
});

describe('separate persistent settings', () => {
  it('preserves preferences and unrelated storage through restart and replay', () => {
    const store = memory();
    store.values.set('another-app', 'leave alone');
    saveSettings({ muted: true, reducedMotion: true }, store.access);
    let state = pick(initialState(content), 'question-source', content);
    saveRun(state, content, store.access);
    state = act(state, { type: 'replay', chapter: 1 }, content);
    saveRun(state, content, store.access);
    state = act(state, { type: 'restart' }, content);
    saveRun(state, content, store.access);
    expect(loadSettings(store.access).settings).toEqual({ muted: true, reducedMotion: true });
    expect(store.values.get('another-app')).toBe('leave alone');
  });
  it('uses safe defaults for invalid/unavailable settings', () => {
    const store = memory(); store.values.set(SETTINGS_KEY, '{"version":1,"muted":"yes"}');
    expect(loadSettings(store.access)).toMatchObject({ settings: { muted: false, reducedMotion: false } });
    expect(loadSettings(() => { throw new Error(); }).issue).toBeTruthy();
    expect(saveSettings({ muted: true, reducedMotion: false }, () => { throw new Error(); })).toContain('still apply');
  });
});
