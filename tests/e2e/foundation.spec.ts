import { expect, test } from '@playwright/test';

test('inspect, decide, read consequence and journal, then explicitly restart', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Before a rumor becomes a fact');
  await expect(page.getByRole('group').getByRole('button')).toHaveCount(2);
  await page.getByRole('button', { name: 'Inspect the household report' }).click();
  await expect(page.getByText('Allegation · source unconfirmed')).toBeVisible();
  await expect(page.getByText('Rumors spreading', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ask who witnessed' }).click();
  await expect(page.getByRole('status')).toContainText('You ask for a witness');
  await expect(page.getByText('Uneasy', { exact: true })).toBeVisible();
  await expect(page.getByRole('group').getByRole('button').first()).toBeDisabled();
  await page.getByRole('button', { name: 'Journal' }).click();
  await expect(page.getByRole('region', { name: 'Your journal' }).getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'Your journal' })).toContainText('source unconfirmed');
  await page.getByRole('button', { name: 'Restart sample' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('0 decisions');
  await expect(page.getByText('Rumors spreading', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('keyboard can choose support without inspecting evidence', async ({ page }) => {
  await page.goto('/');
  // Traverse the real tab order rather than focusing the target programmatically.
  const choice = page.getByRole('button', { name: 'Support Parris' });
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press('Tab');
    if (await choice.evaluate((element) => element === document.activeElement)) break;
  }
  await expect(choice).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('Your support reassures Parris');
  await expect(page.getByRole('button', { name: 'Journal' })).toContainText('1 decision');
  await expect(page.getByRole('definition').first()).toHaveText('Accepted');
  await expect(page.getByText(/65|71|33/)).toHaveCount(0);
});
