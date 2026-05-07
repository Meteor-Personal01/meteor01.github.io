// 网站运行时间
function showRuntime() {
  window.setTimeout("showRuntime()", 1000);
  const start = new Date("2026/05/03 20:00:00"); // 改成你的博客创建时间
  const now = new Date();
  const diff = now - start;
  
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const leave1 = diff % (24 * 3600 * 1000);
  const hours = Math.floor(leave1 / (3600 * 1000));
  const leave2 = leave1 % (3600 * 1000);
  const minutes = Math.floor(leave2 / (60 * 1000));
  const leave3 = leave2 % (60 * 1000);
  const seconds = Math.round(leave3 / 1000);
  
  const runtime = document.getElementById('runtime');
  if(runtime) {
    runtime.innerHTML = "本站已运行 " + days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + " 秒";
  }
}
showRuntime();