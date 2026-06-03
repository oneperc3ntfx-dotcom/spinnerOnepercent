const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants = [];

// ================= LOAD PARTICIPANTS =================
async function loadData(){
const res = await fetch("/participants");
participants = await res.json();
drawWheel();
renderList();
}

// ================= DRAW WHEEL =================
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

// ================= GET WINNER =================
async function getWinner(){
const res = await fetch("/winner");
const data = await res.json();
return data.forcedWinner;
}

// ================= SPIN FIX FINAL =================
async function spin(){

const winner = await getWinner();

// 🎲 RANDOM MODE jika kosong
let finalWinner = winner;

if(!finalWinner){
const randomIndex = Math.floor(Math.random() * participants.length);
finalWinner = participants[randomIndex];
}

const index = participants.indexOf(finalWinner);

if(index === -1){
alert("WINNER TIDAK ADA DI LIST");
return;
}

const total = participants.length;

// 🎯 size per segment
const slice = 360 / total;

// 🎯 center winner
const winnerAngle = index * slice + slice / 2;

// 🚨 FIX POINTER (jam 12)
const offset = 90;

// 🎯 FINAL ROTATION AKURAT
const finalRotation = (360 * 10) + (360 - winnerAngle - offset);

// ❗ RESET ANIMASI
canvas.style.transition = "none";
canvas.style.transform = "rotate(0deg)";
canvas.getBoundingClientRect();

// 🎬 SPIN 45 DETIK
canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${finalRotation}deg)`;

// 🏆 SHOW WINNER
setTimeout(()=>{
showWinner(finalWinner);
},45000);
}

// ================= WINNER POPUP =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("winnerModal").style.display="flex";
}

// ================= ADD PARTICIPANT =================
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

// ================= DELETE PARTICIPANT =================
async function remove(name){

await fetch("/participants",{
method:"DELETE",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

loadData();
}

// ================= RENDER LIST =================
function renderList(){
const list=document.getElementById("list");
list.innerHTML="";

participants.forEach(p=>{
list.innerHTML+=`
<li>${p} <button onclick="remove('${p}')">❌</button></li>
`;
});
}

// ================= SET WINNER (STICKY UI) =================
async function setWinner(){

const input = document.getElementById("forceWinnerInput");
const name = input.value.trim();

await fetch("/winner",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name})
});

// 🔥 TIDAK DIHAPUS (biar nempel)
if(name === ""){
alert("MODE RANDOM AKTIF");
}else{
alert("WINNER LOCK: " + name.toUpperCase());
}

// sync UI
loadWinnerUI();
}

// ================= LOAD WINNER UI =================
async function loadWinnerUI(){
const res = await fetch("/winner");
const data = await res.json();

const input = document.getElementById("forceWinnerInput");

if(data.forcedWinner && data.forcedWinner !== ""){
input.value = data.forcedWinner;
}else{
input.value = ""; // random mode
}
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
loadWinnerUI();
