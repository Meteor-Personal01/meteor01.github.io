!(function() {
  var canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;";
  document.body.appendChild(canvas);
  
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  var particles = [];
  
  function createFirework(x, y) {
    var colors = [
      {r:255,g:80,b:80}, {r:80,g:255,b:80}, {r:80,g:150,b:255},
      {r:255,g:220,b:80}, {r:255,g:80,b:200}, {r:80,g:255,b:255},
      {r:255,g:180,b:80}, {r:200,g:100,b:255}
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];
    
    for (var i = 0; i < 18; i++) {
      var angle = (Math.PI * 2 / 18) * i + Math.random() * 0.4;
      var speed = Math.random() * 3 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: Math.random() * 2.5 + 1,
        color: color,
        created: Date.now()
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var now = Date.now();
    
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      var age = now - p.created;
      
      // 0.5秒后消失
      if (age > 500) {
        particles.splice(i, 1);
        continue;
      }
      
      var progress = age / 500;
      var alpha = 1 - progress;
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgb(" + p.color.r + "," + p.color.g + "," + p.color.b + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  
  document.addEventListener("click", function(e) {
    createFirework(e.clientX, e.clientY);
  });
  
  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  animate();
})();