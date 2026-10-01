import { expect, test } from '@playwright/test';
import registry from '../../src/content/symbolism.json' with { type: 'json' };

test('symbolism is spoiler-gated, shared, keyboard closable and restores focus', async ({ page }, testInfo) => {
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeHidden();
  const reveal = page.getByRole('button', { name: 'Reveal symbolism (spoilers)' });
  await reveal.focus(); await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close guide' })).toBeFocused();
  await expect(dialog.locator('summary')).toHaveCount(36);
  await dialog.getByText('S15 — Poppet and needle', { exact: true }).click();
  await expect(dialog.getByText(registry.find(r => r.id === 'S15')!.meaning, { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('symbolism-guide.png') });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden(); await expect(reveal).toBeFocused();
});

test('optional sound requires enable, mute persists, and captions survive audio failure', async ({ page }) => {
  await page.addInitScript(() => {
    let created = 0;
    Object.defineProperty(window, 'AudioContext', { value: class { constructor() { created++; throw new Error('Audio unavailable'); } } });
    Object.defineProperty(window, 'audioContextsCreated', { get: () => created });
  });
  await page.goto('/');
  expect(await page.evaluate(() => Reflect.get(window, 'audioContextsCreated'))).toBe(0);
  await expect(page.getByText(/Sound description:/)).toBeVisible();
  await page.getByRole('button', { name: 'Enable optional ambience' }).click();
  expect(await page.evaluate(() => Reflect.get(window, 'audioContextsCreated'))).toBe(1);
  await expect(page.getByText('Audio is unavailable.', { exact: false })).toBeVisible();
  await page.getByText('Settings', { exact: true }).click();
  await page.getByLabel('Mute sound').check();
  await page.getByLabel('Reduce motion').check();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Enable optional ambience' })).toBeDisabled();
  await page.getByText('Settings', { exact: true }).click();
  await expect(page.getByLabel('Reduce motion')).toBeChecked();
});

test('360px and 200 percent page zoom preserve controls, dialog and focus', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 720, height: 1000 });
  await page.goto('/');
  // Chromium page CSS zoom exercises 200% rendering and 360 CSS px of usable width.
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  await page.getByRole('button', { name: 'Inspect the household report' }).click();
  await expect(page.getByRole('heading', { name: 'A report without a witness' })).toBeVisible();
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const buttons = page.getByRole('group', { name: 'What will you lend your voice to?' }).getByRole('button');
  for (const button of await buttons.all()) expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.getByRole('button', { name: 'Reveal symbolism (spoilers)' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('zoom-200.png') });
  await page.getByRole('button', { name: 'Close guide' }).click();
  await expect(page.getByRole('button', { name: 'Reveal symbolism (spoilers)' })).toBeFocused();
});

test('pressure motion respects both preferences and real audio mutes and silences at the desk', async ({ page }, testInfo) => {
  test.setTimeout(60000);
  await page.addInitScript(() => {
    const Native = window.AudioContext;
    let contexts = 0;
    const gains: GainNode[] = [];
    window.AudioContext = class extends Native {
      constructor() { super(); contexts++; }
      createGain() { const gain = super.createGain(); gains.push(gain); return gain; }
    };
    Object.defineProperty(window, 'audioProbe', { get: () => ({ contexts, volume: gains[0]?.gain.value }) });
  });
  await page.goto('/');
  expect(await page.evaluate(() => Reflect.get(window, 'audioProbe').contexts)).toBe(0);
  await page.getByRole('button', { name: 'Enable optional ambience' }).click();
  await expect(page.locator('[data-audio-state]')).toHaveAttribute('data-audio-state', 'playing');
  await expect.poll(() => page.evaluate(() => Reflect.get(window, 'audioProbe').volume)).toBeGreaterThan(.2);
  await page.getByText('Settings', { exact: true }).click();
  await page.getByLabel('Mute sound').check();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, 'audioProbe').volume)).toBeLessThan(.001);
  await page.getByLabel('Mute sound').uncheck();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, 'audioProbe').volume)).toBeGreaterThan(.2);
  for (const choice of [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]) {
    await page.getByRole('group', { name: 'What will you lend your voice to?' }).getByRole('button').nth(choice).click();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A rule that cannot be disproved');
  await expect(page.locator('.danger-note').first()).toContainText('Near rupture');
  await expect(page.locator('.court-seal')).toHaveCSS('animation-name', 'unsettled-seal');
  await page.getByLabel('Reduce motion').check();
  await expect(page.locator('.court-seal')).toHaveCSS('animation-name', 'none');
  await page.getByLabel('Reduce motion').uncheck();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.court-seal')).toHaveCSS('animation-name', 'none');
  await page.screenshot({ path: testInfo.outputPath('court-pressure.png'), fullPage: true });
  for (let i = 0; i < 4; i++) {
    await page.getByRole('group', { name: 'What will you lend your voice to?' }).getByRole('button').first().click();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The weight of a name');
  await expect(page.locator('[data-audio-state]')).toHaveAttribute('data-audio-state', 'silent');
  await expect.poll(() => page.evaluate(() => Reflect.get(window, 'audioProbe').volume)).toBeLessThan(.001);
  await expect(page.getByText('Sound description: Silence at the confession desk and after the ending.')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('confession-desk.png'), fullPage: true });
});
