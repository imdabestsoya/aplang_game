import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import witnesses from '../routes/fixtures/narrative.json' with { type: 'json' };
import { puzzleForms } from '../../src/content/puzzleForms';

async function tabTo(page: Page, target: Locator) {
  for (let i = 0; i < 120; i++) {
    if (await target.evaluate(element => element === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  await expect(target).toBeFocused();
}

test('complete a resistance route offline using keyboard or narrow touch controls', async ({ page, context }, testInfo) => {
  test.setTimeout(90000);
  const touch = testInfo.project.name === 'narrow-touch';
  const externalRequests: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173/')) externalRequests.push(request.url()); });
  await page.goto('/');
  await context.setOffline(true);
  const activate = async (target: Locator) => {
    if (touch) await target.tap();
    else { await tabTo(page, target); await page.keyboard.press('Enter'); }
  };
  for (const [index, step] of witnesses.witnesses['name-preserved'].steps.entries()) {
    for (const puzzle of step.puzzleAnswers) {
      const region = page.getByRole('region', { name: new RegExp(`^${puzzle.puzzleId}:`) });
      for (const [i, field] of puzzleForms[puzzle.puzzleId].entries()) {
        const select = region.getByLabel(field.label, { exact: true });
        if (touch) await select.selectOption(puzzle.answer[i]);
        else {
          await tabTo(page, select);
          await page.keyboard.type(field.options.find(option => option.value === puzzle.answer[i])!.label);
          await page.keyboard.press('Tab');
        }
      }
      await activate(region.getByRole('button', { name: 'Check reasoning' }));
      await expect(region.getByRole('status')).toContainText('Reasoning established');
    }
    if (step.cardId === 'whisper-03') {
      await activate(page.locator('summary').filter({ hasText: /^Q2:/ }));
      await activate(page.getByRole('button', { name: 'Skip optional passage' }));
      await expect(page.locator('summary').filter({ hasText: /^Q2:/ })).toBeFocused();
      await expect(page.getByRole('button', { name: 'Skip optional passage' })).toBeHidden();
    }
    const label = witnesses.witnesses['name-preserved'].trace[index].label;
    await activate(page.getByRole('group', { name: 'What will you lend your voice to?' }).getByRole('button', { name: label, exact: true }));
    await expect(page.locator('.consequence[role="status"]')).toBeVisible();
    await expect(page.locator('.consequence')).toHaveAttribute('aria-atomic', 'true');
    await activate(page.getByRole('button', { name: 'Continue', exact: true }));
  }
  await expect(page.getByRole('heading', { name: 'A Name Preserved', exact: true })).toBeFocused();
  const debrief = page.getByRole('region', { name: 'Context and limits of comparison' });
  await activate(debrief.locator('summary').filter({ hasText: 'Compare mechanisms' }));
  await expect(debrief).toContainText('Criticism is not automatically persecution');
  await activate(debrief.locator('summary').filter({ hasText: 'Historical Salem' }));
  await expect(debrief.getByRole('link', { name: /University of Virginia/ })).toBeVisible();
  expect(externalRequests).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('offline-ending.png'), fullPage: true });
  await context.setOffline(false);
});

test('enlarged default text preserves reading, evidence, choices and source labels', async ({ page }) => {
  await page.goto('/');
  const originalSize = await page.locator('.dialogue').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  // Exercise relative font sizing at 200%; this is not a physical browser-menu audit.
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.locator('.dialogue').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeCloseTo(originalSize * 2);
  await page.getByRole('button', { name: 'Inspect the household report' }).click();
  await expect(page.getByRole('heading', { name: 'A report without a witness' })).toBeVisible();
  for (let i = 0; i < 2; i++) {
    await page.getByRole('group', { name: 'What will you lend your voice to?' }).getByRole('button').first().click();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
  }
  const quote = page.locator('details').filter({ has: page.locator('summary').filter({ hasText: /^Q2:/ }) });
  await quote.locator('summary').click();
  await expect(quote.locator('blockquote')).toBeVisible();
  await expect(quote).toContainText('edition review pending');
  await expect(quote.getByRole('link', { name: 'Read Q2 source (opens a new tab)' })).toHaveAttribute('href', /^https:/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await quote.getByRole('button', { name: 'Skip optional passage' }).click();
  await expect(quote.locator('summary')).toBeFocused();
  const snapshot = await page.getByRole('main').ariaSnapshot();
  expect(snapshot).toContain('What will you lend your voice to?');
  expect(snapshot).toContain('Q2:');
});
