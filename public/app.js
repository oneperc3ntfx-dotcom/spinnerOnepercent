const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants =
JSON.parse(localStorage.getItem("participants")) || [
"ANDI","BUDI","SITI","RINA"
];

let rotation = 0;
let forcedWinner = null;

// ================= BIGGER TEXT =================
ctx.font = "bold 22px Arial";

// ================= DRAW WHEEL =================
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

// 🔥 BESARKAN NAMA
ctx.font = "bold 26px Arial";
ctx.fillStyle = "#000";
ctx.fillText(name,120,10);

ctx.restore();

});
}

// ================= SPIN CONTROLLED =================
function spin(){

if(!forcedWinner){
alert("SET PEMENANG DULU DI ADMIN!");
return;
}

const index = participants.indexOf(forcedWinner);

if(index === -1){
alert("PEMENANG TIDAK ADA!");
return;
}

const angle = 360 / participants.length;

const target =
3600 + (360 - (index * angle) - angle / 2);

rotation += target;

canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${rotation}deg)`;

setTimeout(()=>{
showWinner(forcedWinner);
},45000);
}

// ================= WINNER =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("modalPrize").innerText =
document.getElementById("prizeTitle").innerText;
document.getElementById("winnerModal").style.display="flex";
forcedWinner = null;
}

// ================= PARTICIPANT =================
function addParticipant(){
const input=document.getElementById("nameInput");
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
list.innerHTML+=`<li>${p} <button onclick="remove(${i})">❌</button></li>`;
});
}

function remove(i){
participants.splice(i,1);
localStorage.setItem("participants",JSON.stringify(participants));
drawWheel();
renderList();
}

// ================= ADMIN CTRL + SHIFT =================
document.addEventListener("keydown",function(e){
if(e.ctrlKey && e.shiftKey && e.code==="KeyA"){
document.getElementById("adminPanel").style.display="block";
}
});

// ================= ADMIN 5X CLICK TITLE =================
let clickCount = 0;
document.getElementById("title").addEventListener("click",function(){
clickCount++;
if(clickCount >= 5){
document.getElementById("adminPanel").style.display="block";
clickCount=0;
}
setTimeout(()=>clickCount=0,2000);
});

// ================= ADMIN FUNCTIONS =================
function forceWinner(){
forcedWinner = document.getElementById("forceWinnerInput").value.toUpperCase();
alert("PEMENANG SET: " + forcedWinner);
closeAdmin();
}

function resetParticipants(){
participants=[];
localStorage.removeItem("participants");
drawWheel();
renderList();
}

function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

// ================= INIT =================
document.getElementById("spinBtn").addEventListener("click",spin);
drawWheel();
renderList();
