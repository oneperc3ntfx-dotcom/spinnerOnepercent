const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants = [];
let forcedWinner = null;
let rotation = 0;

// ================= LOAD DATA SERVER =================
async function loadData(){
const res = await fetch("/participants");
participants = await res.json();
drawWheel();
renderList();
}

// ================= DRAW WHEEL (BIG TEXT FIX) =================
function drawWheel(){

ctx.clearRect(0,0,600,600);

const angle = (2*Math.PI)/participants.length;

participants.forEach((name,i)=>{

ctx.beginPath();
ctx.moveTo(300,300);
ctx.arc(300,300,280,i*angle,(i+1)*angle);

ctx.fillStyle = i%2 ? "#c89d2d" : "#f2d16b";
ctx.fill();

ctx.save();
ctx.translate(300,300);
ctx.rotate(i*angle + angle/2);

// 🔥 BESARIN NAMA
ctx.font = "bold 28px Arial";
ctx.fillStyle = "#000";
ctx.fillText(name,120,10);

ctx.restore();

});
}

// ================= ADD PARTICIPANT (SYNC SERVER) =================
async function addParticipant(){

const name = document.getElementById("nameInput").value;

await fetch("/participants",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

document.getElementById("nameInput").value="";
loadData();
}

// ================= SET WINNER (ADMIN PC) =================
async function setWinner(){

const name = document.getElementById("forceWinnerInput").value;

await fetch("/winner",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

alert("WINNER SET: " + name);
closeAdmin();
}

// ================= GET WINNER =================
async function getWinner(){
const res = await fetch("/winner");
const data = await res.json();
return data.forcedWinner;
}

// ================= SPIN (SYNC WINNER) =================
async function spin(){

const winner = await getWinner();

if(!winner){
alert("SET WINNER DULU DI ADMIN");
return;
}

const index = participants.indexOf(winner);

if(index === -1){
alert("WINNER TIDAK ADA DI LIST");
return;
}

const angle = 360 / participants.length;

const target =
3600 + (360 - (index * angle) - angle/2);

rotation += target;

canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${rotation}deg)`;

setTimeout(()=>{
showWinner(winner);
},45000);
}

// ================= WINNER =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("winnerModal").style.display="flex";
}

// ================= RESET =================
async function resetAll(){
await fetch("/reset",{method:"POST"});
loadData();
}

// ================= ADMIN =================
function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

document.addEventListener("keydown",(e)=>{
if(e.ctrlKey && e.shiftKey && e.code==="KeyA"){
document.getElementById("adminPanel").style.display="block";
}
});

// ================= CLICK 5X TITLE =================
let click=0;
document.getElementById("title").addEventListener("click",()=>{
click++;
if(click>=5){
document.getElementById("adminPanel").style.display="block";
click=0;
}
setTimeout(()=>click=0,2000);
});

// ================= INIT =================
document.getElementById("spinBtn").addEventListener("click",spin);

loadData();
