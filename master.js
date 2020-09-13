var n,
    c = 0,
    minspeed = 4,
    gravity = 0.15,
    color = "black",
    mouse = null,
    particles = [],
    gravSlider,
    partSlider,
    minSlider;

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

    n = WIDTH * 0.8;

    mouse = new Vector(random(WIDTH), random(HEIGHT));

    addChecks();

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    window.onmousemove = function (e) {
        if (c % 10 === 0) {
            mouse = new Vector(e.clientX, e.clientY);
        }

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

    for (var i = 0; i < particles.length; i++) {
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

function addChecks() {
    gravSlider = document.getElementById("gravity");
    gravSlider.value = gravity;
    partSlider = document.getElementById("particles");
    partSlider.value = n;
    minSlider = document.getElementById("minspeed");
    minSlider.value = minspeed;

    gravSlider.addEventListener('change', function () {
        gravity = this.value;
    });

    partSlider.addEventListener('change', function () {
        if (this.value <= n) {
            particles = particles.slice(n - this.value);
        } else {
            for (var i = 0; i < (this.value - particles.length); i++) {
                let vel = Vector.random();
                particles.push(new Particle(
                    new Vector(random(WIDTH), random(HEIGHT)),
                    vel.setMag(random(5, 10)),
                    color,
                    random(2, 6)
                ));
            }
        }
        n = this.value;
    });

    minSlider.addEventListener('change', function () {
        minspeed = this.value;
    });
}

function openNav() {
    var inputs = document.getElementById("inputs");
    inputs.style.width = "250px";
    inputs.style.paddingLeft = "25px";
}

function closeNav() {
    var inputs = document.getElementById("inputs");
    inputs.style.width = "0";
    inputs.style.paddingLeft = "0";
}

init();