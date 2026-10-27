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