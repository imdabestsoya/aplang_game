import { initialState } from '../engine/transition';
import type { Content, GameState } from '../engine/types';
import { validState } from './validation';

export const RUN_KEY = 'the-weight.run';
export const SETTINGS_KEY = 'the-weight.settings';
export const SAVE_VERSION = 1;
export interface StoragePort { getItem(key: string): string | null; setItem(key: string, value: string): void }
export type StorageAccess = () => StoragePort;
export const browserStorage: StorageAccess = () => window.localStorage;
export interface Settings { muted: boolean; reducedMotion: boolean }
export const defaultSettings: Settings = { muted: false, reducedMotion: false };
export interface LoadedRun {
  state: GameState;
  issue: string | null;
  needsRecovery: boolean;
  canSave: boolean;
}

export function serializeRun(state: GameState, content: Content): string {
  return JSON.stringify({ version: SAVE_VERSION, contentVersion: content.version, state });
}

export function loadRun(content: Content, access: StorageAccess = browserStorage): LoadedRun {
  const fallback = initialState(content);
  let raw: string | null;
  try { raw = access().getItem(RUN_KEY); }
  catch { return { state: fallback, issue: 'Browser storage is unavailable. You can play in this tab, but progress will not survive refresh.', needsRecovery: false, canSave: false }; }
  if (raw === null) return { state: fallback, issue: null, needsRecovery: false, canSave: true };
  try {
    const save = JSON.parse(raw);
    if (save?.version !== SAVE_VERSION || save?.contentVersion !== content.version) return {
      state: fallback, issue: 'This save belongs to an incompatible game version. Start a new game to replace it, or keep it and play without saving.', needsRecovery: true, canSave: false,
    };
    if (!validState(save.state, content)) throw new Error('Invalid save');
    // Hydrate the validated snapshot directly. Never call transition on load.
    return { state: save.state, issue: null, needsRecovery: false, canSave: true };
  } catch {
    return { state: fallback, issue: 'The saved game could not be read. Start a new game to replace it, or keep it and play without saving.', needsRecovery: true, canSave: false };
  }
}

export function saveRun(state: GameState, content: Content, access: StorageAccess = browserStorage): string | null {
  try { access().setItem(RUN_KEY, serializeRun(state, content)); return null; }
  catch { return 'Progress could not be saved. Your current game still works in this tab; refresh may restore an older save or start over.'; }
}

export function loadSettings(access: StorageAccess = browserStorage): { settings: Settings; issue: string | null } {
  try {
    const raw = access().getItem(SETTINGS_KEY);
    if (raw === null) return { settings: { ...defaultSettings }, issue: null };
    const saved = JSON.parse(raw);
    if (saved?.version !== 1 || typeof saved.muted !== 'boolean' || typeof saved.reducedMotion !== 'boolean') throw new Error('Invalid settings');
    return { settings: { muted: saved.muted, reducedMotion: saved.reducedMotion }, issue: null };
  } catch { return { settings: { ...defaultSettings }, issue: 'Saved preferences are unavailable. Changes still apply in this tab.' }; }
}

export function saveSettings(settings: Settings, access: StorageAccess = browserStorage): string | null {
  try { access().setItem(SETTINGS_KEY, JSON.stringify({ version: 1, ...settings })); return null; }
  catch { return 'Preferences could not be saved. They still apply in this tab.'; }
}
