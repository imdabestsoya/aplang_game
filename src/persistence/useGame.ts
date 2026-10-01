import { useRef, useState } from 'react';
import { transition } from '../engine/transition';
import type { Action, Content } from '../engine/types';
import { loadRun, loadSettings, saveRun, saveSettings } from './storage';
import type { Settings } from './storage';

export function useGame(content: Content) {
  const [boot] = useState(() => loadRun(content));
  const [state, setState] = useState(boot.state);
  const current = useRef(boot.state);
  const canSave = useRef(boot.canSave);
  const [needsRecovery, setNeedsRecovery] = useState(boot.needsRecovery);
  const [storageIssue, setStorageIssue] = useState(boot.issue);
  const [actionError, setActionError] = useState<string | null>(null);
  const [preferences] = useState(() => loadSettings());
  const [settings, setSettings] = useState(preferences.settings);
  const [settingsIssue, setSettingsIssue] = useState(preferences.issue);

  function dispatch(action: Action) {
    if (needsRecovery) return;
    const result = transition(current.current, action, content);
    setActionError(result.error);
    if (result.state === current.current) return;
    // Update synchronously so rapid events cannot both consume one revision.
    current.current = result.state;
    setState(result.state);
    if (canSave.current) setStorageIssue(saveRun(result.state, content));
  }

  function recover(replace: boolean) {
    setNeedsRecovery(false);
    canSave.current = replace;
    setStorageIssue(replace ? saveRun(current.current, content) : 'Playing without saving. The existing save is preserved.');
  }

  function updateSettings(next: Settings) {
    setSettings(next);
    setSettingsIssue(saveSettings(next));
  }

  return { state, dispatch, settings, updateSettings, settingsIssue, storageIssue, actionError, needsRecovery, recover };
}
