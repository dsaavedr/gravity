var n = 2000,
    c = 0,
    minspeed = 3,
    gravity = 0.05,
    color = "black",
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

    mouse = new Vector(random(WIDTH), random(HEIGHT));

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'orange';
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
            Vector.random(),
            color,
            random(2, 6)
        ));
        particles[i].vel.setMag(random(5, 10));
    }

    ani();
}

function ani() {
    ctx.save();
    // ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();

    for (var i = 0; i < n; i++) {
        var p = particles[i];
        p.borders();
        if (mouse) {
            var g = Vector.sub(mouse, p.pos);
            g.setMag(gravity);
            p.applyForce(g);
        }
        p.update();
        if (p.vel.mag() < minspeed) {
            p.vel.setMag(minspeed);
        }
        p.show();
    }


    requestAnimationFrame(ani);
}

init();