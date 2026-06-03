const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants =
JSON.parse(localStorage.getItem("participants")) || [
"ANDI","BUDI","SITI","RINA"
];

let rotation = 0;

// ================= ADMIN SELECTED WINNER =================
let forcedWinner = null;

// ================= SAVE PRIZE =================
function savePrize(){
const value = document.getElementById("prizeInput").value;
localStorage.setItem("prize",value);
document.getElementById("prizeTitle").innerText = value;
}

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
ctx.rotate(i*angle+angle/2);
ctx.fillStyle="#000";
ctx.fillText(name,150,10);
ctx.restore();

});
}

// ================= SPIN CONTROLLED =================
function spin(){

if(participants.length === 0) return;

// kalau admin belum set
if(!forcedWinner){
alert("SET PEMENANG DI ADMIN DULU!");
return;
}

// cari index dari forced winner
const winnerIndex = participants.indexOf(forcedWinner);

// kalau nama tidak ada
if(winnerIndex === -1){
alert("PEMENANG TIDAK ADA DI DAFTAR!");
return;
}

const angle = 360 / participants.length;

// target posisi (HARUS PAS DI WINNER)
const target =
3600 + (360 - (winnerIndex * angle) - angle / 2);

rotation += target;

canvas.style.transition =
"transform 45s cubic-bezier(0.05,0.9,0.1,1)";

canvas.style.transform =
`rotate(${rotation}deg)`;

// popup muncul SETELAH spin selesai
setTimeout(()=>{
showWinner(forcedWinner);
},45000);
}

// ================= SET WINNER ADMIN =================
function forceWinner(){
const name =
document.getElementById("forceWinnerInput").value.toUpperCase();

if(!name) return;

forcedWinner = name;

// simpan sementara
localStorage.setItem("forcedWinner", name);

alert("PEMENANG DI SET: " + name);

closeAdmin();
}

// ================= WINNER =================
function showWinner(name){
document.getElementById("winnerName").innerText = name;
document.getElementById("modalPrize").innerText =
document.getElementById("prizeTitle").innerText;
document.getElementById("winnerModal").style.display="flex";

// reset setelah menang
forcedWinner = null;
localStorage.removeItem("forcedWinner");
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

// ================= ADMIN PANEL =================
document.addEventListener("keydown", function(e){
if(e.ctrlKey && e.shiftKey && e.code === "KeyA"){
document.getElementById("adminPanel").style.display = "block";
}
});

function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

// ================= INIT =================
document.getElementById("spinBtn").addEventListener("click",spin);

drawWheel();
renderList();
