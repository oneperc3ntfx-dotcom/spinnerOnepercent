const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants =
JSON.parse(localStorage.getItem("participants")) || [
"ANDI","BUDI","SITI","RINA"
];

let rotation = 0;

// ================= PRIZE =================
function savePrize(){
const value = document.getElementById("prizeInput").value;
localStorage.setItem("prize",value);
document.getElementById("prizeTitle").innerText = value;
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
ctx.rotate(i*angle+angle/2);
ctx.fillStyle="#000";
ctx.fillText(name,150,10);
ctx.restore();

});
}

// ================= SPIN 45 DETIK =================
function spin(){

const winnerIndex = Math.floor(Math.random()*participants.length);
const angle = 360/participants.length;

const target =
3600 + (360 - (winnerIndex*angle) - angle/2);

rotation += target;

canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${rotation}deg)`;

setTimeout(()=>{
showWinner(participants[winnerIndex]);
},45000);
}

// ================= WINNER =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("modalPrize").innerText =
document.getElementById("prizeTitle").innerText;
document.getElementById("winnerModal").style.display="flex";
}

function closeModal(){
document.getElementById("winnerModal").style.display="none";
}

// ================= PARTICIPANTS =================
function addParticipant(){
const input = document.getElementById("nameInput");
participants.push(input.value.toUpperCase());
localStorage.setItem("participants",JSON.stringify(participants));
input.value="";
drawWheel();
renderList();
}

function renderList(){
const list=document.getElementById("list");
list.innerHTML="";
participants.forEach((p,i)=>{
list.innerHTML+=`
<li>${p} <button onclick="remove(${i})">❌</button></li>
`;
});
}

function remove(i){
participants.splice(i,1);
localStorage.setItem("participants",JSON.stringify(participants));
drawWheel();
renderList();
}

// ================= ADMIN =================
document.addEventListener("keydown",(e)=>{
if(e.ctrlKey && e.shiftKey && e.key==="A"){
document.getElementById("adminPanel").style.display="block";
}
});

function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

function forceWinner(){
const name=document.getElementById("forceWinnerInput").value;
showWinner(name.toUpperCase());
}

function resetParticipants(){
participants=[];
localStorage.removeItem("participants");
drawWheel();
renderList();
}

// ================= INIT =================
document.getElementById("spinBtn").addEventListener("click",spin);

drawWheel();
renderList();
