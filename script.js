window.addEventListener("DOMContentLoaded", () => {

const board = document.getElementById("board");
const canvas = document.getElementById("hexGrid");
const ctx = canvas.getContext("2d");

const mapImage = document.getElementById("mapImage");
const mapSelect = document.getElementById("mapSelect");
const uploadMap = document.getElementById("uploadMap");

const addTokenBtn = document.getElementById("addToken");
const resetBtn = document.getElementById("resetBoard");

let tokens = [];

/* =========================
   MAP SYSTEM
========================= */

mapSelect.addEventListener("change", (e) => {
    mapImage.src = e.target.value;
});

/* upload custom map */
uploadMap.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        mapImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

/* =========================
   CANVAS GRID
========================= */

function resizeCanvas() {
    canvas.width = board.clientWidth;
    canvas.height = board.clientHeight;
    drawHexGrid();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawHexGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = 35;
    const w = Math.sqrt(3) * size;

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;

    for (let y = 0; y < canvas.height + size; y += size * 1.5) {
        for (let x = 0; x < canvas.width + w; x += w) {

            const offset = (Math.floor(y / (size * 1.5)) % 2) * (w / 2);

            drawHex(x + offset, y, size);
        }
    }
}

function drawHex(x, y, size) {
    ctx.beginPath();

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i + 30);

        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }

    ctx.closePath();
    ctx.stroke();
}

/* =========================
   TOKENS
========================= */

addTokenBtn.addEventListener("click", () => {
    const label = prompt("Token label (FTR, WIZ, etc):", "FTR");
    if (!label) return;

    const token = document.createElement("div");
    token.className = "token";

    token.style.left = "100px";
    token.style.top = "100px";
    token.style.background = "blue";

    token.textContent = label;

    board.appendChild(token);
    makeDraggable(token);

    tokens.push(token);

    /* change color on click */
    token.addEventListener("dblclick", () => {
        const newColor = prompt("Token color:", token.style.background);
        if (newColor) token.style.background = newColor;
    });
});

/* =========================
   DRAG SYSTEM
========================= */

function makeDraggable(el) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", (e) => {
        dragging = true;

        const rect = el.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        el.style.cursor = "grabbing";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const boardRect = board.getBoundingClientRect();

        el.style.left = (e.clientX - boardRect.left - offsetX) + "px";
        el.style.top = (e.clientY - boardRect.top - offsetY) + "px";
    });
}

/* =========================
   RESET
========================= */

resetBtn.addEventListener("click", () => {
    tokens.forEach(t => t.remove());
    tokens = [];
});

});
