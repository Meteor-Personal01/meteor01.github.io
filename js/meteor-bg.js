document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.createElement('canvas');
  canvas.id = 'meteor-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.prepend(canvas);
  
  var ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  
  var stars = [];
  var meteors = [];
  var cycleTimer = 0;
  var isActive = true;
  
  // 星星
  for (var i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.01 + 0.003,
      dir: Math.random() > 0.5 ? 1 : -1
    });
  }
  
  function createMeteor() {
    var startX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    var startY = Math.random() * canvas.height * 0.2 - 30;
    var speed = Math.random() * 15 + 20;
    var angle = Math.PI * 0.75 + (Math.random() - 0.5) * 0.3;
    
    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: Math.random() * 150 + 120,
      width: Math.random() * 2.5 + 2,
      life: 50 + Math.random() * 20,
      maxLife: 50 + Math.random() * 20
    });
  }
  
  function drawStar(s) {
    s.alpha += s.speed * s.dir;
    if (s.alpha > 0.8 || s.alpha < 0.1) s.dir *= -1;
    
    ctx.fillStyle = 'rgba(255, 255, 255, ' + s.alpha + ')';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  function drawMeteor(m) {
    var dx = m.vx;
    var dy = m.vy;
    var len = Math.sqrt(dx*dx + dy*dy);
    
    var headX = m.x;
    var headY = m.y;
    var tailX = m.x - (dx / len) * m.length;
    var tailY = m.y - (dy / len) * m.length;
    
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'rgba(150, 200, 255, 0.6)';
    
    var grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
    grad.addColorStop(0, 'rgba(255, 255, 255, ' + m.alpha + ')');
    grad.addColorStop(0.05, 'rgba(240, 248, 255, ' + (m.alpha * 0.95) + ')');
    grad.addColorStop(0.2, 'rgba(180, 220, 255, ' + (m.alpha * 0.6) + ')');
    grad.addColorStop(0.6, 'rgba(100, 160, 255, ' + (m.alpha * 0.2) + ')');
    grad.addColorStop(1, 'rgba(80, 120, 255, 0)');
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = m.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(headX, headY);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255, 255, 255, ' + m.alpha + ')';
    ctx.beginPath();
    ctx.arc(headX, headY, m.width * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < stars.length; i++) {
      drawStar(stars[i]);
    }
    
    cycleTimer++;
    if (cycleTimer > 300) {
      cycleTimer = 0;
      isActive = !isActive;
    }
    
    if (isActive) {
      if (cycleTimer % (2 + Math.floor(Math.random() * 3)) === 0) {
        createMeteor();
      }
    }
    
    for (var j = meteors.length - 1; j >= 0; j--) {
      var m = meteors[j];
      m.x += m.vx;
      m.y += m.vy;
      m.life--;
      m.alpha = Math.min(1, m.life / 15);
      
      if (m.life <= 0 || m.x < -500 || m.y > canvas.height + 500 || m.x > canvas.width + 500) {
        meteors.splice(j, 1);
        continue;
      }
      
      drawMeteor(m);
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  window.addEventListener('resize', resize);
});