var n = 1000,
    c = 0,
    mouse = null,
    particles = [];

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    window.onmousemove = function (e) {
        if (c % 50 === 0) {
            log('test');
        }

        mouse = new Vector(e.clientX, e.clientY);
        c++;
    }

    for (var i = 0; i < n; i++) {
        particles.push(new Particle(
            new Vector(random(WIDTH), random(HEIGHT)),
            Vector.random()
        ));
        particles[i].vel.setMag(random(3, 4));
    }

    ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < n; i++) {
        var p = particles[i];
        p.borders();
        if (mouse) {
            var g = Vector.sub(mouse, p.pos);
            g.setMag(0.05);
            p.applyForce(g);
        }
        p.update();
        p.show();
    }


    requestAnimationFrame(ani);
}

init();