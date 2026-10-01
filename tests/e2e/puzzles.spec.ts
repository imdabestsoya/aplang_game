import { expect, test } from '@playwright/test';
import witnesses from '../routes/fixtures/narrative.json' with { type: 'json' };
import { puzzleForms } from '../../src/content/puzzleForms';

for (const name of ['name-preserved', 'recoverable-mistake'] as const) {
  test(`${name}: follow the complete witness through normal controls, hints, retries and refresh`, async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto('/');
    for (const step of witnesses.witnesses[name].steps) {
      for (const puzzle of step.puzzleAnswers) {
        const region = page.getByRole('region', { name: new RegExp(`^${puzzle.puzzleId}:`) });
        await expect(region).toBeVisible();
        const before = await page.getByRole('definition').allTextContents();
        const fields = puzzleForms[puzzle.puzzleId];
        // Complete a wrong submission through native select controls.
        for (const field of fields) await region.getByLabel(field.label, { exact: true }).selectOption(field.options[0].value);
        await region.getByRole('button', { name: 'Check reasoning' }).click();
        await expect(region.getByRole('status')).toContainText('no penalty');
        for (let level = 1; level <= 3; level++) await region.getByRole('button', { name: `Hint ${level} of 3` }).click();
        expect(await page.getByRole('definition').allTextContents()).toEqual(before);
        for (let i = 0; i < fields.length; i++) {
          const select = region.getByLabel(fields[i].label, { exact: true });
          await select.focus();
          await expect(select).toBeFocused();
          // Native select type-ahead works with macOS Chromium without relying on an OS popup.
          const option = fields[i].options.find(o => o.value === puzzle.answer[i])!;
          await page.keyboard.type(option.label);
          await page.keyboard.press('Tab');
          await expect(select).toHaveValue(puzzle.answer[i]);
        }
        await region.getByRole('button', { name: 'Check reasoning' }).focus();
        await page.keyboard.press('Enter');
        await expect(region.getByRole('status')).toContainText('Reasoning established');
        await page.reload();
        await expect(region.getByRole('status')).toContainText('Reasoning established');
        await expect(region.getByRole('button', { name: 'Check reasoning' })).toBeDisabled();
        if (name === 'name-preserved' && puzzle.puzzleId === 'P1') await region.screenshot({ path: testInfo.outputPath('poppet-puzzle.png') });
        expect(await page.getByRole('definition').allTextContents()).toEqual(before);
      }
      await expect(page.getByRole('group').getByRole('button')).toHaveCount(2);
      // Match the actual displayed label, including the sourced variant.
      const trace = witnesses.witnesses[name].trace.find(t => t.cardId === step.cardId)!;
      expect(trace.choiceId).toBe(step.choiceId);
      await page.getByRole('group').getByRole('button', { name: trace.label, exact: true }).click();
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
    }
    await expect(page.getByRole('region', { name: 'Your ending' })).toContainText('A Name Preserved');
    await expect(page.getByRole('heading', { name: 'A Name Preserved', exact: true })).toBeFocused();
    await expect(page.locator('.jail-bars')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Explore symbolism' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Your ending' })).toContainText('not physical escape');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Journal' }).click();
    await page.getByRole('button', { name: 'Replay chapter 2' }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole('group').getByRole('button').first().click();
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
    }
    const puzzle = page.getByRole('region', { name: /^P1:/ });
    await expect(puzzle.getByRole('button', { name: 'Check reasoning' })).toBeEnabled();
    await expect(puzzle.getByRole('button', { name: 'Hint 1 of 3' })).toBeEnabled();
  });
}
