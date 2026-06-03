const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants = [];
let secretClick = 0;

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

if(participants.length === 0) return;

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

ctx.font = "bold 28px Arial";
ctx.fillStyle = "#000";
ctx.fillText(name,120,10);

ctx.restore();

});
}

// ================= WINNER =================
async function getWinner(){
const res = await fetch("/winner");
const data = await res.json();
return data.forcedWinner;
}

// ================= SPIN =================
async function spin(){

const winner = await getWinner();

let finalWinner = winner;

// RANDOM MODE
if(!finalWinner){
const randomIndex = Math.floor(Math.random() * participants.length);
finalWinner = participants[randomIndex];
}

const index = participants.indexOf(finalWinner);

if(index === -1){
alert("WINNER TIDAK ADA");
return;
}

const total = participants.length;
const slice = 360 / total;

const winnerAngle = index * slice + slice / 2;
const offset = 90;

const finalRotation = (360 * 10) + (360 - winnerAngle - offset);

canvas.style.transition = "none";
canvas.style.transform = "rotate(0deg)";
canvas.getBoundingClientRect();

canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${finalRotation}deg)`;

setTimeout(()=>{
showWinner(finalWinner);
},45000);
}

// ================= WINNER =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("winnerModal").style.display="flex";
}

function closeModal(){
document.getElementById("winnerModal").style.display="none";
}

// ================= PARTICIPANTS =================
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

async function remove(name){

await fetch("/participants",{
method:"DELETE",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

loadData();
}

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

const name = document.getElementById("forceWinnerInput").value.trim();

await fetch("/winner",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

alert(name ? "WINNER LOCK: " + name : "RANDOM MODE");
loadWinnerUI();
}

// ================= LOAD WINNER UI =================
async function loadWinnerUI(){
const res = await fetch("/winner");
const data = await res.json();

document.getElementById("forceWinnerInput").value = data.forcedWinner || "";
}

// ================= HIDE SHOW =================
function hideParticipants(){
document.getElementById("participantsPanel").style.display="none";
}

function showParticipants(){
document.getElementById("participantsPanel").style.display="block";
}

// ================= SECRET ADMIN CLICK =================
document.getElementById("title").addEventListener("click",()=>{
secretClick++;

if(secretClick >= 7){
document.getElementById("adminPanel").style.display="block";
secretClick = 0;
}
});

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
loadWinnerUI();
