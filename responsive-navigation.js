(()=>{
 const header=document.querySelector('header.site-header');if(!header)return;
 const nav=header.querySelector('nav');if(!nav)return;
 const menu=document.createElement('button');menu.type='button';menu.className='fzk-menu-toggle';
 nav.id=nav.id||'fzk-main-nav';menu.setAttribute('aria-controls',nav.id);menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','開啟導覽選單');
 menu.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
 header.insertBefore(menu,nav);header.classList.add('responsive-nav-ready');
 function close(){header.classList.remove('nav-expanded');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','開啟導覽選單')}
 menu.onclick=()=>{const open=header.classList.toggle('nav-expanded');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'關閉導覽選單':'開啟導覽選單')};
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('nav-expanded')){close();menu.focus()}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 window.matchMedia('(min-width:768px)').addEventListener('change',close);
})();
(()=>{
 const categories=document.querySelector('.product-sidebar .category-buttons');
 if(!categories)return;
 let bar=categories.parentElement.querySelector('.fzk-category-scroll-indicator');
 if(!bar){bar=document.createElement('div');bar.className='fzk-category-scroll-indicator';bar.setAttribute('aria-hidden','true');bar.innerHTML='<span class="fzk-category-scroll-thumb"></span>';categories.after(bar)}
 const thumb=bar.querySelector('.fzk-category-scroll-thumb');
 let queued=false;
 function update(){
  queued=false;
  const max=categories.scrollWidth-categories.clientWidth;
  bar.hidden=max<=2;
  if(max<=2)return;
  const width=bar.clientWidth;
  const thumbWidth=Math.min(width,Math.max(28,width*categories.clientWidth/categories.scrollWidth));
  thumb.style.width=thumbWidth+'px';
  const progress=Math.max(0,Math.min(1,categories.scrollLeft/max));
  thumb.style.transform='translateX('+((width-thumbWidth)*progress)+'px)';
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 categories.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 if('ResizeObserver' in window){const observer=new ResizeObserver(schedule);observer.observe(categories);observer.observe(bar)}
 new MutationObserver(schedule).observe(categories,{childList:true,subtree:true});
 schedule();
})();
