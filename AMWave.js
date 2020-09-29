export default class AMWave {
    carrierWave;
    messageWave;

    draw(ctx, carrierWave, messageWave, modulationIndex, width, height, y) {
        var maxHeight = 0;
        var minHeight = 0;
        for (let x = 0; x < width; x++) {
            let product = carrierWave.amplitude * (1 + modulationIndex *
                Math.cos(2 * Math.PI * messageWave.frequency * x))
                * Math.cos(2 * Math.PI * carrierWave.frequency * x)
            if (product > maxHeight)
                maxHeight = product;
            if (product < minHeight)
                minHeight = maxHeight;
        }

        //maxHeight *= 2;
        var h2 = Math.abs(minHeight) + maxHeight;
        h2 *= 1;
        const buffer = document.createElement('canvas');
        buffer.height = h2;
        buffer.width = width;
        const context = buffer.getContext('2d');

        context.save();
        context.beginPath();
        context.moveTo(0, maxHeight / 2);

        context.strokeStyle = "black";

        for (let x = 0; x < width; x++) {
            let carrier = carrierWave.amplitude * Math.cos(2 * Math.PI * carrierWave.frequency * x);
            //carrierWave.amplitude * Math.sin(2 * Math.PI * carrierWave.frequency * x);
            let message = messageWave.amplitude * Math.cos(2 * Math.PI * messageWave.frequency * x);

            let product = carrierWave.amplitude * (1 + modulationIndex *
                Math.cos(2 * Math.PI * messageWave.frequency * x))
                * Math.cos(2 * Math.PI * carrierWave.frequency * x)

            if (x == 0) {
                context.moveTo(x, (h2 / 2) + product);
            }
            //let product = (1 + (message / carrierWave.amplitude)) * carrier;

            //ctx.moveTo(x,500); // Where to start drawing
            context.lineTo(x, (h2 / 2) + product);
        }
        context.stroke();
        context.closePath();
        context.restore();

        ctx.drawImage(buffer, 0, 0, width, h2, 0, y, width, height);
    }
}