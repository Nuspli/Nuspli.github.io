(function makeDitheredHeroBackground() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const pixelSize = 12;
    const width = 512;

    const height = hero.offsetHeight;

    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const ctx = c.getContext("2d");

    const img = ctx.createImageData(width, height);
    const data = img.data;

    const bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ];

    const top =    { r: 0x14, g: 0x18, b: 0x21 };
    const bottom = { r: 0x0f, g: 0x11, b: 0x15 };

    for (let by = 0; by < height; by += pixelSize) {
        const t = by / (height - 1);

        const baseR = top.r + t * (bottom.r - top.r);
        const baseG = top.g + t * (bottom.g - top.g);
        const baseB = top.b + t * (bottom.b - top.b);

        for (let bx = 0; bx < width; bx += pixelSize) {

            const mx = Math.floor(bx / pixelSize) % 4;
            const my = Math.floor(by / pixelSize) % 4;

            const threshold =
                (bayer[my][mx] + 0.5) / 16 - 0.5;

            const d = threshold * 10;

            const r = clamp(baseR + d);
            const g = clamp(baseG + d);
            const b = clamp(baseB + d);

            for (let y = 0; y < pixelSize; y++) {
                for (let x = 0; x < pixelSize; x++) {
                    const px = bx + x;
                    const py = by + y;
                    if (px >= width || py >= height) continue;

                    const i = (py * width + px) * 4;
                    data[i]     = r;
                    data[i + 1] = g;
                    data[i + 2] = b;
                    data[i + 3] = 255;
                }
            }
        }
    }

    ctx.putImageData(img, 0, 0);

    hero.style.backgroundImage = `url(${c.toDataURL()})`;
})();

function clamp(v) {
    return Math.max(0, Math.min(255, Math.round(v)));
}

///////////////////////////////////////////////////////////////////////

const IMAGE_SRC = "img/cat.jpg";

document.querySelectorAll(".demo").forEach(initDemo);

function initDemo(demo) {
    const canvas = demo.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const slider = demo.querySelector(".levels");
    const toggle = demo.querySelector(".toggle");
    const dropdown = demo.querySelector(".algorithm"); // optional
    const resolutionSlider = demo.querySelector(".resolution"); // optional

    let ditheringEnabled = true;
    const type = demo.dataset.type; // "ordered" | "diffusion" | "random"
    let algorithm = dropdown ? dropdown.value : null;

    const img = new Image();
    img.src = IMAGE_SRC;

    const MAX_CANVAS_WIDTH = 512;

    img.onload = () => {
        const scale = Math.min(1, MAX_CANVAS_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        draw();
    };

    slider.addEventListener("input", draw);
    toggle.addEventListener("click", () => {
        ditheringEnabled = !ditheringEnabled;
        draw();
    });

    if (dropdown) {
        dropdown.addEventListener("change", () => {
            algorithm = dropdown.value;
            draw();
        });
    }

    const resolutionValues = [32, 64, 128, 256, 512];

    resolutionSlider.addEventListener("input", draw);

    function draw() {
        const displayWidth = canvas.width;
        const displayHeight = canvas.height;

        // Slider-Index auf echte Auflösung mappen
        const resIndex = parseInt(resolutionSlider.value);
        const tempWidth = resolutionValues[resIndex];
        const tempHeight = Math.round(tempWidth * img.height / img.width);

        // Offscreen-Canvas
        const temp = document.createElement("canvas");
        temp.width = tempWidth;
        temp.height = tempHeight;
        const tempCtx = temp.getContext("2d");

        tempCtx.drawImage(img, 0, 0, tempWidth, tempHeight);

        if (!ditheringEnabled) {
            applyQuantization(tempCtx, temp, slider.value);
        } else {
            switch (type) {
                case "ordered":
                    applyOrderedDithering(tempCtx, temp, slider.value, algorithm);
                    break;
                case "diffusion":
                    switch (algorithm) {
                        case "floyd-steinberg":
                            applyFloydSteinberg(tempCtx, temp, slider.value); break;
                        case "jarvis-judice-ninke":
                            applyJarvisJudiceNinke(tempCtx, temp, slider.value); break;
                        case "stucki":
                            applyStucki(tempCtx, temp, slider.value); break;
                        case "atkinson":
                            applyAtkinsonDithering(tempCtx, temp, slider.value); break;
                    }
                    break;
                case "random":
                    applyRandomDithering(tempCtx, temp, slider.value);
                    break;
            }
        }

        ctx.clearRect(0, 0, displayWidth, displayHeight);
        ctx.imageSmoothingEnabled = false; // pixelige Darstellung
        ctx.drawImage(temp, 0, 0, displayWidth, displayHeight);
    }
}


function applyQuantization(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    levels = parseInt(levels);

    for (let i = 0; i < data.length; i += 4) {
        for (let c = 0; c < 3; c++) {
            data[i + c] =
                Math.round((data[i + c] / 255) * (levels - 1)) *
                (255 / (levels - 1));
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

const BAYER_MATRICES = {
    bayer2: [
        [0, 2],
        [3, 1]
    ],
    bayer4: [
        [0,  8,  2, 10],
        [12, 4, 14, 6],
        [3, 11, 1,  9],
        [15, 7, 13, 5]
    ],
    bayer8: [
        [ 0, 32,  8, 40,  2, 34, 10, 42],
        [48, 16, 56, 24, 50, 18, 58, 26],
        [12, 44,  4, 36, 14, 46,  6, 38],
        [60, 28, 52, 20, 62, 30, 54, 22],
        [ 3, 35, 11, 43,  1, 33,  9, 41],
        [51, 19, 59, 27, 49, 17, 57, 25],
        [15, 47,  7, 39, 13, 45,  5, 37],
        [63, 31, 55, 23, 61, 29, 53, 21]
    ]
};

function applyOrderedDithering(ctx, canvas, levels, variant="bayer4") {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    levels = parseInt(levels);

    const matrix = BAYER_MATRICES[variant] || BAYER_MATRICES.bayer4;
    const mSize = matrix.length;
    const scale = 1 / (mSize * mSize);

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            const threshold = (matrix[y % mSize][x % mSize] + 0.5) * scale;

            for (let c = 0; c < 3; c++) {
                const oldVal = data[i + c] / 255;

                // adjust pixel with threshold
                const adjusted = oldVal + (threshold - 0.5) / (levels - 1);

                // quantize
                const quantized = Math.round(adjusted * (levels - 1)) / (levels - 1);

                data[i + c] = Math.max(0, Math.min(255, quantized * 255));
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}


function applyFloydSteinberg(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    levels = parseInt(levels);
    const w = canvas.width;
    const h = canvas.height;

    function quantize(v) {
        return Math.round(v * (levels - 1)) / (levels - 1);
    }

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;

            for (let c = 0; c < 3; c++) {
                const oldVal = data[i + c] / 255;
                const newVal = quantize(oldVal);
                const error = oldVal - newVal;

                data[i + c] = newVal * 255;

                // Fehler verteilen
                distributeError(x + 1, y    , c, error * 7 / 16);
                distributeError(x - 1, y + 1, c, error * 3 / 16);
                distributeError(x    , y + 1, c, error * 5 / 16);
                distributeError(x + 1, y + 1, c, error * 1 / 16);
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

    function distributeError(x, y, channel, value) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;

        const idx = (y * w + x) * 4 + channel;
        const v = data[idx] / 255 + value;

        data[idx] = Math.max(0, Math.min(255, v * 255));
    }
}

function applyJarvisJudiceNinke(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    levels = parseInt(levels);
    const w = canvas.width;
    const h = canvas.height;

    function quantize(v) {
        return Math.round(v * (levels - 1)) / (levels - 1);
    }

    // JJN Kernel
    const kernel = [
        { dx:  1, dy: 0, w: 7/48 }, { dx:  2, dy: 0, w: 5/48 },

        { dx: -2, dy: 1, w: 3/48 }, { dx: -1, dy: 1, w: 5/48 },
        { dx:  0, dy: 1, w: 7/48 }, { dx:  1, dy: 1, w: 5/48 },
        { dx:  2, dy: 1, w: 3/48 },

        { dx: -2, dy: 2, w: 1/48 }, { dx: -1, dy: 2, w: 3/48 },
        { dx:  0, dy: 2, w: 5/48 }, { dx:  1, dy: 2, w: 3/48 },
        { dx:  2, dy: 2, w: 1/48 }
    ];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;

            for (let c = 0; c < 3; c++) {
                const oldVal = data[i + c] / 255;
                const newVal = quantize(oldVal);
                const error = oldVal - newVal;

                data[i + c] = newVal * 255;

                for (const k of kernel) {
                    distributeError(x + k.dx, y + k.dy, c, error * k.w);
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

    function distributeError(x, y, channel, value) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;

        const idx = (y * w + x) * 4 + channel;
        const v = data[idx] / 255 + value;

        data[idx] = Math.max(0, Math.min(255, v * 255));
    }
}

function applyStucki(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    levels = parseInt(levels);
    const w = canvas.width;
    const h = canvas.height;

    function quantize(v) {
        return Math.round(v * (levels - 1)) / (levels - 1);
    }

    // Stucki Kernel
    const kernel = [
        { dx:  1, dy: 0, w: 8/42 }, { dx:  2, dy: 0, w: 4/42 },

        { dx: -2, dy: 1, w: 2/42 }, { dx: -1, dy: 1, w: 4/42 },
        { dx:  0, dy: 1, w: 8/42 }, { dx:  1, dy: 1, w: 4/42 },
        { dx:  2, dy: 1, w: 2/42 },

        { dx: -2, dy: 2, w: 1/42 }, { dx: -1, dy: 2, w: 2/42 },
        { dx:  0, dy: 2, w: 4/42 }, { dx:  1, dy: 2, w: 2/42 },
        { dx:  2, dy: 2, w: 1/42 }
    ];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;

            for (let c = 0; c < 3; c++) {
                const oldVal = data[i + c] / 255;
                const newVal = quantize(oldVal);
                const error = oldVal - newVal;

                data[i + c] = newVal * 255;

                for (const k of kernel) {
                    distributeError(x + k.dx, y + k.dy, c, error * k.w);
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

    function distributeError(x, y, channel, value) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;

        const idx = (y * w + x) * 4 + channel;
        const v = data[idx] / 255 + value;

        data[idx] = Math.max(0, Math.min(255, v * 255));
    }
}

function applyAtkinsonDithering(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    levels = parseInt(levels);
    const w = canvas.width;
    const h = canvas.height;

    function quantize(v) {
        return Math.round(v * (levels - 1)) / (levels - 1);
    }

    const kernel = [
        { dx: 1, dy: 0, w: 1/8 }, { dx: 2, dy: 0, w: 1/8 },
        { dx: -1, dy: 1, w: 1/8 }, { dx: 0, dy: 1, w: 1/8 },
        { dx: 1, dy: 1, w: 1/8 }, { dx: 0, dy: 2, w: 1/8 }
    ];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;

            for (let c = 0; c < 3; c++) {
                const oldVal = data[i + c] / 255;
                const newVal = quantize(oldVal);
                const error = oldVal - newVal;

                data[i + c] = newVal * 255;

                for (const k of kernel) {
                    distributeError(x + k.dx, y + k.dy, c, error * k.w);
                }
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);

    function distributeError(x, y, channel, value) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;

        const idx = (y * w + x) * 4 + channel;
        const v = data[idx] / 255 + value;

        data[idx] = Math.max(0, Math.min(255, v * 255));
    }
}

function applyRandomDithering(ctx, canvas, levels) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    levels = parseInt(levels);

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) / (levels - 1);

        for (let c = 0; c < 3; c++) {
            let v = data[i + c] / 255;
            v = Math.min(1, Math.max(0, v + noise));
            v = Math.round(v * (levels - 1)) / (levels - 1);
            data[i + c] = v * 255;
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

