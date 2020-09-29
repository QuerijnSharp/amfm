export default class CarrierWave {
    carrierWave;
    messageWave;

    draw(ctx, carrierWave, messageWave, modulationIndex, width, height, offset) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        ctx.strokeStyle = "black";

        for (let x = 0; x < width; x++) {
            let carrier = carrierWave.amplitude * Math.cos(2 * Math.PI * carrierWave.frequency * (x) + offset);
            //carrierWave.amplitude * Math.sin(2 * Math.PI * carrierWave.frequency * x);
            let message = messageWave.amplitude * Math.cos(2 * Math.PI * messageWave.frequency * (x ) + offset);

            //let product = carrierWave.amplitude * (1 + modulationIndex *
            //    Math.cos(messageWave.frequency * x))
            //     * Math.cos(carrierWave.frequency * x)  

            if (x == 0) {
                ctx.moveTo(x, height + carrier);
            }

            let product = (1 + (message / carrierWave.amplitude)) * carrier;

            //ctx.moveTo(x,500); // Where to start drawing
            ctx.lineTo(x, height + carrier);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}