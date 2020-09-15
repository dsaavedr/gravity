var n,
    minspeed = 4,
    gravity = 0.15,
    color = "black",
    mouse = null,
    particles = [],
    gravSlider,
    partSlider,
    minSlider,
    radios,
    selectedRadio,
    centerRadio,
    showCenter = false,
    int;

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

    if (WIDTH > 900) {
        selectedRadio = 1;
    } else {
        selectedRadio = 0;
    }

    addChecks();

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

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

    if (showCenter) { point(mouse.x, mouse.y, "white", 10); }

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
    radios = document.getElementsByName("type");
    centerRadio = document.getElementById("center");

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

    var prev = null;

    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function () {
            log(this.value);
            (prev) ? log(prev.value) : null;
            if (this !== prev) {
                selectedRadio = this.value;
            }
            checkRadios();
        });
        if (i == selectedRadio) {
            radios[i].checked = true;
            selectedRadio = radios[i].value;
        }
        checkRadios();
    }

    centerRadio.addEventListener('change', function () {
        showCenter = !showCenter;
    });
}

function checkRadios() {
    if (selectedRadio == "random") {
        mouse = new Vector(WIDTH / 2, HEIGHT / 2);
        var c = 0;
        var v = Vector.random();
        int = setInterval(function () {
            if (mouse.x > WIDTH || mouse.x < 0 || mouse.y > HEIGHT || mouse.y < 0) {
                mouse.set(WIDTH / 2, HEIGHT / 2);
            }
            if (c % 25 == 0) {
                v = Vector.random();
            }
            mouse.add(v.setMag(random(1, 2)));
            c++;
        }, 10);

        window.onmousedown = null;
        window.onmousemove = null;
    } else if (selectedRadio == "click") {
        canvas.onmousedown = function (e) {
            mouse = new Vector(e.clientX, e.clientY);
        }
        /* window.onmousedown = function (e) {
            mouse = new Vector(e.clientX, e.clientY);
        } */

        window.onmousemove = null;
        clearInterval(int);
    } else if (selectedRadio == "mouse") {
        var c = 0;
        window.onmousemove = function (e) {
            if (c % 10 === 0) {
                mouse = new Vector(e.clientX, e.clientY);
            }

            c++;
        }
        window.onmousedown = null;
        clearInterval(int);
    }
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