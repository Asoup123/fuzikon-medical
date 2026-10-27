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
 const categories=document.querySelector('.product-sidebar .category-buttons');if(!categories)return;
 categories.parentElement.querySelectorAll('.fzk-category-scroll-indicator,.fzk-category-hint').forEach(el=>el.remove());
 let queued=false;
 function update(){
  queued=false;
  const items=[...categories.querySelectorAll('.category-button')];if(!items.length)return;
  const area=categories.getBoundingClientRect();
  const first=items[0].getBoundingClientRect(),last=items[items.length-1].getBoundingClientRect();
  categories.dataset.moreLeft=String(first.left<area.left-3);
  categories.dataset.moreRight=String(last.right>area.right+3);
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 categories.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 if('ResizeObserver' in window){const observer=new ResizeObserver(schedule);observer.observe(categories);[...categories.children].forEach(el=>observer.observe(el))}
 new MutationObserver(schedule).observe(categories,{childList:true,subtree:true});
 document.fonts?.ready.then(schedule);schedule();
})();
