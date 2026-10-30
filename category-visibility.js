// 分類顯示設定：所有公開入口共用，讀取失敗時暫停顯示商品。
window.categoryVisibility = {
  async load(client) {
    const {data,error}=await client.from('product_categories').select('id,is_visible');
    if(error) throw error;
    return new Map((data||[]).map(row=>[row.id,row.is_visible]));
  },
  visible(state,id) { return state.get(id)!==false; },
  apply(state) {
    document.querySelectorAll('a[href*="products.html?category="],.category-button[data-category]').forEach(el=>{
      const id=el.dataset.category || new URL(el.href,location.href).searchParams.get('category');
      el.hidden=!this.visible(state,id);
      if(el.hidden) el.style.setProperty('display','none','important');
      else el.style.removeProperty('display');
    });
  }
};
