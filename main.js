const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

for(let i=0;i<columns;i++){
    drops[i]=Math.random()*canvas.height/fontSize;
}

function draw(){

    // Efek jejak
    ctx.fillStyle="rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#083313";
    ctx.font=fontSize+"px Consolas";
    ctx.shadowColor="#083313";
    ctx.shadowBlur=10;
    for(let i=0;i<drops.length;i++){

        // Random 0 atau 1
        const text=Math.random()>0.5 ? "1" : "0";
        ctx.fillText(text,i*fontSize,drops[i]*fontSize);
        if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
            drops[i]=0;
        }
        drops[i]++;
    }
}

setInterval(draw,35);

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

});



const url = document.getElementById("QrUrl");
const buton = document.getElementById("QrButton");
const image = document.getElementById("QrImg");
const download = document.getElementById("QrDownload");

buton.addEventListener("click", async function () {
  const dataURL = await QRCode.toDataURL(url.value);
  console.log(dataURL);
  image.src = dataURL;
});

download.addEventListener("click", () => {
    if(!image.src){
        alert("Buat QR CODE terlebih dahulu ");
        return;
    }

    const link = document.createElement("a");

    link.href = image.src;
    link.download = "QrCode.png";

    link.click();
})
