import AMWave from './AMWave.js';
import FMWave from './FMWave.js';
import CarrierWave from './CarrierWave.js';
import MessageWave from './MessageWave.js';
import Wave from './Wave.js';

let c = document.getElementById("canvas"); // Grab canvas object
let ctx = c.getContext("2d"); // Define canvas context

let fmWave = new FMWave();
let amWave = new AMWave();
let carrierWave = new CarrierWave();
let messageWave = new MessageWave();

var carrier = new Wave(50, .2);
var message = new Wave(50, 0.01);

var modulationIndex = 1;

document.addEventListener('keydown', (event) => {
    event.preventDefault();
}, false);

document.addEventListener('keyup', (event) => {
    event.preventDefault();
}, false);

window.addEventListener("resize", (event) => {
    document.body.scrollTop = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", (event) => {
    document.body.scrollTop = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    main();
});




async function main() {
    draw();
}

function draw() {
    message.frequency = parseFloat(document.getElementById("messageFrequency").value);
    carrier.frequency = parseFloat(document.getElementById("carrierFrequency").value);

    message.amplitude = parseInt(document.getElementById("messageAmplitude").value);
    carrier.amplitude = parseInt(document.getElementById("carrierAmplitude").value);



    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let height = canvas.height / 5;
    let amplitude = height / 2;

    carrierWave.draw(ctx, carrier, message, modulationIndex, canvas.width, height / 2);
    messageWave.draw(ctx, carrier, message, modulationIndex, canvas.width, height + height / 2);
    fmWave.draw(ctx, carrier, message, parseInt(document.getElementById("fmModIdx").value), canvas.width, height * 2 + height / 2);
    amWave.draw(ctx, carrier, message, parseInt(document.getElementById("amModIdx").value), canvas.width, height, height * 2 + (height / 2) * 1.75);
    requestAnimationFrame(draw);
}