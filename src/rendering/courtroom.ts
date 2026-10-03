/** Original code-drawn pixel scenery. Snow stays behind the window frames. */
export function drawCourtroom(ctx: CanvasRenderingContext2D, room: string, time: number, quiet: boolean) {
  const rect = (x:number,y:number,w:number,h:number,color:string) => {ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
  rect(0,0,320,180,'#151e29');
  rect(8,8,304,156,'#342b29');
  rect(16,16,288,48,'#51463b');
  rect(16,64,288,80,'#766049');
  for(let y=64;y<144;y+=16){rect(16,y,288,1,'#44382e');for(let x=16+(y%32?0:24);x<304;x+=48)rect(x,y,1,16,'#4d4034');}
  for(let y=70;y<140;y+=16)for(let x=24;x<297;x+=32){rect(x+(y%3),y,9,1,'#806a51');rect(x+12,y+6,4,1,'#68543f');}
  for(const x of [34,246]) {
    rect(x-4,21,44,39,'#251f21');rect(x,24,36,30,'#253c50');
    rect(x,44,36,10,'#9eafb5');rect(x+4,35,8,11,'#182d3b');rect(x+23,31,8,15,'#182d3b');
    for(let i=0;i<17;i++){const sx=(i*13+(quiet?0:Math.floor(time/170)))%36;const sy=(i*7+(quiet?0:Math.floor(time/85)))%29;rect(x+sx,24+sy,1,1,'#e4eded');}
    rect(x+17,24,2,30,'#8c7558');rect(x,38,36,2,'#8c7558');rect(x-3,54,42,4,'#cbd1ca');
  }
  rect(16,61,288,3,'#ab8960');
  rect(8,8,5,156,'#ad8a5c');rect(307,8,5,156,'#ad8a5c');
  rect(140,144,40,28,'#263240');rect(143,144,34,3,'#d2d6ce');
  if(room==='chamber') {
    // High-backed seat, court seal, bench, witness stand and public benches.
    rect(143,24,32,35,'#251f21');rect(148,29,22,26,'#763b3e');
    rect(153,17,12,8,'#b69b61');rect(158,12,2,8,'#d2b77b');
    rect(119,52,82,12,'#332b27');rect(116,49,88,5,'#b39466');
    rect(126,53,4,8,'#866346');rect(190,53,4,8,'#866346');
    rect(123,43,3,6,'#dfd0a2');rect(123,40,3,3,'#e3ac60');rect(191,43,3,6,'#dfd0a2');rect(191,40,3,3,'#e3ac60');
    rect(136,47,12,2,'#ede1bd');rect(175,45,9,3,'#342921');
    rect(32,80,48,9,'#4c332b');rect(32,78,48,3,'#a37e54');
    rect(232,96,32,14,'#382a27');rect(230,93,36,4,'#aa865b');
    rect(32,118,44,6,'#402e29');rect(242,118,44,6,'#402e29');
    rect(128,90,66,42,'#793d41');rect(132,94,58,34,'#5f3338');
  } else if(room==='archive') {
    rect(90,22,134,35,'#2f2928');
    for(let x=96;x<219;x+=9){rect(x,26,6,24,['#96564b','#b39364','#547273'][Math.floor(x/9)%3]);rect(x,30,6,2,'#c6ad7f');}
    rect(88,52,138,5,'#ab875a');
    rect(40,79,70,12,'#47352d');rect(38,77,74,4,'#af936a');
    rect(48,75,18,3,'#e5d5b0');rect(81,73,15,5,'#c7b78f');
    rect(210,79,56,12,'#47352d');rect(208,77,60,4,'#af936a');
    rect(218,74,25,3,'#e5d5b0');rect(139,110,34,6,'#9b805a');
  } else {
    // Covered public gallery: a place to hear grievances, not a farm.
    rect(106,22,104,35,'#2c2827');rect(110,26,96,26,'#725b42');
    for(const x of [116,142,168,190])rect(x,29,14,17,'#d9c69b');
    rect(35,80,76,7,'#ae8b60');rect(39,87,4,9,'#523f31');rect(101,87,4,9,'#523f31');
    rect(210,80,76,7,'#ae8b60');rect(214,87,4,9,'#523f31');rect(276,87,4,9,'#523f31');
    rect(139,113,37,5,'#b19770');
  }
}

export function drawPetitioner(ctx:CanvasRenderingContext2D, x:number, y:number, day:number, walking:boolean, time:number, quiet:boolean) {
  const step=walking&&!quiet?Math.floor(time/130)%2:0;
  const coats=['#79877d','#946554','#627d94','#92744c','#72708c','#8d535b','#5a817e','#776753'];
  ctx.fillStyle='#241f26';ctx.fillRect(x-5,y,12,3);
  ctx.fillStyle='#2b2630';ctx.fillRect(x-3,y-5,3,6+step);ctx.fillRect(x+2,y-5,3,7-step);
  ctx.fillStyle=coats[(day-1)%coats.length];ctx.fillRect(x-5,y-18,12,14);ctx.fillRect(x-7,y-16,3,10);ctx.fillRect(x+7,y-16,3,10);
  ctx.fillStyle='#d2ac84';ctx.fillRect(x-3,y-26,8,8);
  ctx.fillStyle='#3c3030';ctx.fillRect(x-4,y-28,10,4);ctx.fillRect(x-6,y-25,14,2);
  ctx.fillStyle='#e3d4aa';ctx.fillRect(x+6,y-12,5,7);
}
