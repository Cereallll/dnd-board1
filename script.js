const board = document.getElementById("board");
const canvas = document.getElementById("hexGrid");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = board.clientWidth;
    canvas.height = board.clientHeight;
    drawHexGrid();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawHexGrid(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const size = 35;
    const w = Math.sqrt(3) * size;
    const h = 2 * size;

    ctx.strokeStyle = "rgba(255,255,255,.25)";

    for(let y=0;y<canvas.height+h;y+=size*1.5){

        for(let x=0;x<canvas.width+w;x+=w){

            drawHex(
                x + ((Math.floor(y/(size*1.5)) % 2) * w/2),
                y,
                size
            );

        }

    }

}

function drawHex(x,y,size){

    ctx.beginPath();

    for(let i=0;i<6;i++){

        let angle =
            Math.PI/180*(60*i+30);

        let px =
            x + size*Math.cos(angle);

        let py =
            y + size*Math.sin(angle);

        if(i===0)
            ctx.moveTo(px,py);
        else
            ctx.lineTo(px,py);

    }

    ctx.closePath();
    ctx.stroke();

}

document.getElementById("addToken")
.addEventListener("click",()=>{

    const token =
        document.createElement("div");

    token.className = "token";
    token.style.background = "blue";
    token.style.left = "100px";
    token.style.top = "100px";

    token.textContent =
        prompt("Label?","FTR");

    board.appendChild(token);

    token.addEventListener("dblclick",()=>{

        const color =
            prompt(
                "Color?",
                token.style.background
            );

        token.style.background = color;

    });

    drag(token);

});

function drag(el){

    let dragging = false;

    el.addEventListener("mousedown",()=>{

        dragging = true;

    });

    document.addEventListener(
        "mouseup",
        ()=>dragging=false
    );

    document.addEventListener(
        "mousemove",
        e=>{

            if(!dragging) return;

            const rect =
                board.getBoundingClientRect();

            el.style.left =
                (e.clientX-rect.left-20)
                +"px";

            el.style.top =
                (e.clientY-rect.top-20)
                +"px";

        });

}
