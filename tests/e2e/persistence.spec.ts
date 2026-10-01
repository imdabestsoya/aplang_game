import { expect, test } from '@playwright/test';

const key = 'the-weight.run';
test('rapid clicks record once; reload keeps consequence, journal and continuation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Inspect the household report' }).click();
  await page.getByRole('button', { name: 'Ask who witnessed' }).evaluate((button: HTMLButtonElement) => { button.click(); button.click(); });
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('1 decision');
  const saved = await page.evaluate((key) => localStorage.getItem(key), key);
  await page.reload();
  await expect(page.getByRole('status')).toContainText('You ask for a witness');
  await expect(page.getByText('Uneasy', { exact: true })).toBeVisible();
  await expect(page.getByRole('group').getByRole('button').first()).toBeDisabled();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(saved);
  await page.getByRole('button', { name: 'Journal' }).click();
  await expect(page.getByRole('region', { name: 'Your journal' }).getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'Your journal' })).toContainText('source unconfirmed');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('This is not a game ending.', { exact: false })).toBeVisible();
  await page.reload();
  await expect(page.getByText('This is not a game ending.', { exact: false })).toBeVisible();
});

test('replay and restart reset run data but preserve preferences and unrelated keys', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Settings', { exact: true }).click();
  await page.getByLabel('Mute sound').check();
  await page.getByLabel('Reduce motion').check();
  await page.evaluate(() => localStorage.setItem('another-app', 'keep'));
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await page.getByRole('button', { name: 'Journal' }).click();
  await page.getByRole('button', { name: 'Replay chapter 1' }).click();
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('0 decisions');
  await expect(page.getByRole('button', { name: 'Ask who witnessed' })).toBeEnabled();
  await expect(page.getByText('Rumors spreading', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Support Parris' }).click();
  await page.getByRole('button', { name: 'Restart game' }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('0 decisions');
  await page.getByText('Settings', { exact: true }).click();
  await expect(page.getByLabel('Mute sound')).toBeChecked();
  await expect(page.getByLabel('Reduce motion')).toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('another-app'))).toBe('keep');
});

for (const [name, raw] of [['corrupt', '{'], ['incompatible', '{"version":999}']] as const) {
  test(`${name} save is preserved until explicit new game`, async ({ page }) => {
    await page.goto('/');
    await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
    await page.reload();
    await expect(page.getByRole('region', { name: 'Save recovery' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ask who witnessed' })).toBeDisabled();
    expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(raw);
    await page.getByRole('button', { name: 'Start a new game', exact: true }).click();
    await page.getByRole('button', { name: 'Ask who witnessed' }).click();
    await page.reload();
    await expect(page.getByRole('region', { name: 'Save recovery' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Journal' })).toContainText('1 decision');
  });
}

test('declining replacement leaves original save intact while play continues', async ({ page }) => {
  await page.goto('/');
  await page.evaluate((key) => localStorage.setItem(key, '{'), key);
  await page.reload();
  await page.getByRole('button', { name: 'Keep save and play without saving' }).click();
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await expect(page.getByRole('status')).toContainText('You ask for a witness');
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe('{');
});

test('storage access denied still permits in-memory play', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }));
  await page.goto('/');
  await expect(page.getByRole('alert').filter({ hasText: 'Browser storage is unavailable' })).toBeVisible();
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('1 decision');
  await page.getByRole('button', { name: 'Restart game' }).click();
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('0 decisions');
});

test('quota failures preserve live state and explain refresh risk', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Full', 'QuotaExceededError'); }; });
  await page.goto('/');
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await expect(page.getByRole('alert')).toContainText('Progress could not be saved');
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('1 decision');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('This is not a game ending.', { exact: false })).toBeVisible();
});
