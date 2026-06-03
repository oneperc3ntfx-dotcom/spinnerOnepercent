const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants = [];
let forcedWinner = null;
let rotation = 0;

// ================= LOAD =================
async function loadData(){
const res = await fetch("/participants");
participants = await res.json();
drawWheel();
renderList();
}

// ================= DRAW =================
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

// TEXT LEBIH BESAR
ctx.font = "bold 28px Arial";
ctx.fillStyle = "#000";
ctx.fillText(name,120,10);

ctx.restore();

});
}

// ================= ADD =================
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

// ================= DELETE =================
async function remove(name){

await fetch("/participants",{
method:"DELETE",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

loadData();
}

// ================= RENDER =================
function renderList(){
const list=document.getElementById("list");
list.innerHTML="";

participants.forEach(p=>{
list.innerHTML+=`
<li>${p} <button onclick="remove('${p}')">❌</button></li>
`;
});
}

// ================= SET WINNER =================
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

// ================= SPIN 45 DETIK =================
async function spin(){

const winner = await getWinner();

if(!winner){
alert("SET WINNER DULU");
return;
}

const index = participants.indexOf(winner);

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

// ================= INIT =================
document.getElementById("spinBtn").addEventListener("click",spin);
loadData();
