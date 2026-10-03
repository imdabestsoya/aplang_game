import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
const townMaps=[{title:'Records room',interactions:[{title:'The land register'},{title:'The rejected offer'},{title:'The copied testimony'},{title:'The clerk’s timebook'}]},{title:'Petition gallery',interactions:[{title:'The old complaint'},{title:'The reeve’s petition'}]}];
const connections=[{correct:"Merrin wants the land. His accusation needs closer checking."},{correct:"One witness copied the other. This is only one account."},{correct:"The reeve may want revenge. We still need proof of his charge."}];
async function start(page:Page){await page.goto('/');for(let i=0;i<3;i++)await page.getByRole('button',{name:'Next lesson'}).click();await page.getByRole('button',{name:'Take your seat'}).click();await expect(page.locator('canvas')).toHaveAttribute('data-ready','true');await expect(page.getByRole('heading',{name:'Day 1 · The field beyond the fence'})).toBeVisible();await page.getByRole('button',{name:'Adjourn to investigate'}).click();}
async function close(page:Page){await page.getByRole('button',{name:'Close popup',exact:true}).click();}
async function prepare(page:Page){for(const m of townMaps){await page.getByRole('button',{name:'Places',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:m.title,exact:false}).click();for(const i of m.interactions){await page.getByRole('button',{name:'Objects',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:new RegExp(i.title)}).click();await close(page);}}await page.getByRole('button',{name:'Record',exact:true}).click();for(const c of connections)await page.getByRole('button',{name:c.correct,exact:true}).click();await close(page);}
test('tutorial, controls, popup containment and fullscreen',async({page})=>{await start(page);await expect(page.getByRole('button',{name:'Places',exact:true})).toBeVisible();await page.screenshot({path:`test-results/judge-world-${test.info().project.name}.png`});await page.keyboard.press('ArrowRight');await page.getByRole('button',{name:'Objects',exact:true}).click();await page.getByRole('dialog').getByRole('button').filter({hasText:'Inspect'}).first().click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await page.getByRole('button',{name:'Enter fullscreen',exact:true}).click();expect(await page.evaluate(()=>!!document.fullscreenElement)).toBe(true);await page.getByRole('button',{name:'Resume hearing',exact:true}).click();await expect(page.locator('.binary-choices button')).toHaveCount(2);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);await page.screenshot({path:`test-results/judge-${test.info().project.name}.png`});});
test('investigation and all eight hearings can stop the hunt',async({page})=>{test.setTimeout(60000);await start(page);await prepare(page);const scenarioQuotes=['common vengeance writes the law','Is the accuser always holy now','common vengeance writes the law','A person is either with this court','A person is either with this court','Is the accuser always holy now','Is the accuser always holy now','I have given you my soul'];for(let day=1;day<=8;day++){if(day===1)await page.getByRole('button',{name:'Resume hearing',exact:true}).click();await expect(page.getByRole('heading',{name:new RegExp(`Day ${day} ·`)})).toBeVisible();await expect(page.getByRole('dialog').getByRole('complementary',{name:'Words from The Crucible'})).toContainText(scenarioQuotes[day-1]);await expect(page.getByRole('dialog').locator('cite')).toContainText(/Act (II|III|IV)/);await page.locator('.binary-choices button').first().click();if(day<8)await page.getByRole('button',{name:'Continue to the next day'}).click();}await expect(page.getByRole('heading',{name:'The hearings are stayed'})).toBeVisible();await page.reload();await expect(page.getByRole('heading',{name:'The hearings are stayed'})).toBeVisible();});
test('self protection brings Shame, threshold quote and chaos',async({page})=>{await start(page);for(let day=1;day<=4;day++){if(day===1)await page.getByRole('button',{name:'Resume hearing',exact:true}).click();await expect(page.getByRole('heading',{name:new RegExp(`Day ${day} ·`)})).toBeVisible();await page.locator('.binary-choices button').last().click();if(day===1)await expect(page.getByRole('dialog')).toContainText('Is the accuser always holy now?');if(day===3)await expect(page.getByRole('dialog')).toContainText('common vengeance writes the law');if(day<4)await page.getByRole('button',{name:'Continue to the next day'}).click();}await expect(page.getByRole('heading',{name:'The town breaks apart'})).toBeVisible();});
test('storage failure, motion and optional audio remain playable',async({page})=>{await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new Error('quota');};});await start(page);await page.getByRole('button',{name:'Move east',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await expect(page.getByRole('alert')).toContainText('could not be saved');await page.getByRole('checkbox',{name:'Reduce motion'}).check();await expect(page.locator('main')).toHaveClass(/quiet-motion/);await page.getByRole('button',{name:'Enable town pulse'}).click();await expect(page.getByRole('button',{name:'Mute town pulse'})).toBeVisible();await close(page);await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByRole('button',{name:'Mute town pulse'}).click();await expect(page.getByRole('button',{name:'Enable town pulse'})).toBeVisible();});

test('automatic arrival resumes safely; adjournment allows investigation; snow respects motion',async({page})=>{
  await start(page);
  await expect(page.locator('canvas')).toHaveAttribute('data-weather','snow-falling');
  await page.getByRole('button',{name:'Places',exact:true}).click();
  await page.getByRole('button',{name:'Records room',exact:true}).click();
  await page.reload();
  await expect(page.getByRole('heading',{name:'Day 1 · The field beyond the fence'})).toBeVisible();
  await page.getByRole('button',{name:'Adjourn to investigate'}).click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('canvas')).toHaveAttribute('data-weather','snow-still');
  await page.getByRole('button',{name:'Settings',exact:true}).click();
  await page.getByRole('button',{name:'Begin a new term',exact:true}).click();
  await page.getByRole('button',{name:'Start a new term',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Day 1 · The field beyond the fence'})).toBeVisible();
  await page.locator('.binary-choices button').first().click();
  await page.getByRole('button',{name:'Continue to the next day'}).click();
  await expect(page.getByRole('heading',{name:'Day 2 · Two voices in perfect agreement'})).toBeVisible();
});

test('visible meters update with signed ruling changes and survive reload',async({page})=>{
  await start(page);
  await expect(page.getByRole('meter',{name:'Reputation',exact:true})).toHaveAttribute('aria-valuenow','62');
  await expect(page.getByRole('meter',{name:'Hysteria',exact:true})).toHaveAttribute('aria-valuenow','30');
  await page.getByRole('button',{name:'Resume hearing',exact:true}).click();
  await page.locator('.binary-choices button').last().click();
  const dialog=page.getByRole('dialog');
  await expect(dialog.getByRole('meter',{name:'Reputation',exact:true})).toHaveAttribute('aria-valuenow','71');
  await expect(dialog.getByRole('meter',{name:'Hysteria',exact:true})).toHaveAttribute('aria-valuenow','51');
  await expect(dialog.locator('.judge-meters')).toContainText('(+9)');
  await expect(dialog.locator('.judge-meters')).toContainText('(+21)');
  await expect(page.locator('.judge-hud [aria-label="Reputation"]')).toHaveAttribute('aria-valuenow','71');
  await page.reload();
  await expect(dialog.getByRole('meter',{name:'Hysteria',exact:true})).toHaveAttribute('aria-valuenow','51');
  await page.getByRole('button',{name:'Continue to the next day'}).click();
  await expect(page.getByRole('heading',{name:'Day 2 · Two voices in perfect agreement'})).toBeVisible();
  await page.locator('.binary-choices button').first().click();
  await expect(dialog.getByRole('meter',{name:'Reputation',exact:true})).toHaveAttribute('aria-valuenow','55');
  await expect(dialog.locator('.judge-meters')).toContainText('(-16)');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);
  await page.screenshot({path:`test-results/live-meters-${test.info().project.name}.png`});
});

test('corrupt save is preserved until replacement and legacy progress survives',async({page})=>{
  await page.addInitScript(()=>{if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','yes');localStorage.setItem('the-weight:judge:v1','{broken');localStorage.setItem('the-weight:trail:journey:v2','old journey');localStorage.setItem('the-weight:save:v1','old card');}});
  await start(page);
  expect(await page.evaluate(()=>localStorage.getItem('the-weight:judge:v1'))).toBe('{broken');
  await page.getByRole('button',{name:'Settings',exact:true}).click();
  await expect(page.getByRole('alert')).toContainText('could not be loaded');
  await page.getByRole('button',{name:'Replace only the judge save'}).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('the-weight:judge:v1')!).state);
  expect(saved.day).toBe(1);expect(saved.history).toHaveLength(0);
  expect(await page.evaluate(()=>localStorage.getItem('the-weight:trail:journey:v2'))).toBe('old journey');
  expect(await page.evaluate(()=>localStorage.getItem('the-weight:save:v1'))).toBe('old card');
  await page.reload();
  await expect(page.getByRole('heading',{name:'Day 1 · The field beyond the fence'})).toBeVisible();
});

test('denied reads and writes allow a ruling without storage',async({page})=>{
  await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('denied');};Storage.prototype.setItem=()=>{throw Error('denied');};});
  await start(page);
  await page.getByRole('button',{name:'Resume hearing',exact:true}).click();
  await page.locator('.binary-choices button').first().click();
  await expect(page.getByRole('dialog').getByRole('meter',{name:'Reputation',exact:true})).toHaveAttribute('aria-valuenow','46');
  await page.getByRole('button',{name:'Continue to the next day'}).click();
  await expect(page.getByRole('heading',{name:'Day 2 · Two voices in perfect agreement'})).toBeVisible();
});

test('missing artwork still opens hearings and permits object inspection',async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/assets/trail/*.json',route=>route.abort());
  await page.goto('/');for(let i=0;i<3;i++)await page.getByRole('button',{name:'Next lesson'}).click();
  await page.getByRole('button',{name:'Take your seat'}).click();
  await expect(page.getByRole('heading',{name:'Day 1 · The field beyond the fence'})).toBeVisible();
  await page.getByRole('button',{name:'Adjourn to investigate'}).click();
  await expect(page.getByRole('alert')).toContainText('artwork is unavailable');
  await page.getByRole('button',{name:'Objects',exact:true}).click();
  await page.getByRole('button',{name:/The daily docket/}).click();
  await expect(page.getByRole('heading',{name:'The daily docket'})).toBeVisible();
  await close(page);await page.getByRole('button',{name:'Resume hearing',exact:true}).click();
  await page.locator('.binary-choices button').first().click();
  await expect(page.getByRole('heading',{name:'The town responds'})).toBeVisible();
  expect(errors).toEqual([]);
});

test('repeated ruling and continuation input commits only once',async({page})=>{
  await start(page);await page.getByRole('button',{name:'Resume hearing',exact:true}).click();
  await page.locator('.binary-choices button').last().evaluate(button=>{(button as HTMLButtonElement).click();(button as HTMLButtonElement).click();});
  let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('the-weight:judge:v1')!).state);
  expect(saved.history).toHaveLength(1);expect(saved.reputation).toBe(71);expect(saved.hysteria).toBe(51);
  await page.reload();await expect(page.getByRole('heading',{name:'The town responds'})).toBeVisible();
  await page.getByRole('button',{name:'Continue to the next day'}).evaluate(button=>{(button as HTMLButtonElement).click();(button as HTMLButtonElement).click();});
  await expect(page.getByRole('heading',{name:'Day 2 · Two voices in perfect agreement'})).toBeVisible();
  saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('the-weight:judge:v1')!).state);
  expect(saved.day).toBe(2);expect(saved.history).toHaveLength(1);
});
