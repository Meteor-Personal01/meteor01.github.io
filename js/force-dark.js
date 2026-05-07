(function() {
  var html = document.documentElement;
  
  // 1. 立即强制设置
  html.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  
  // 2. 监听是否被主题脚本改回亮色，改回就强行纠正
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'data-theme') {
        if (html.getAttribute('data-theme') !== 'dark') {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    });
  });
  
  observer.observe(html, { attributes: true });
})();