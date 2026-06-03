const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants =
JSON.parse(localStorage.getItem("participants")) || [
"ANDI",
"BUDI",
"SITI",
"RINA"
];

let rotation = 0;

// ================= DRAW WHEEL =================
function drawWheel(){

ctx.clearRect(0,0,600,600);

const angle = (2 * Math.PI) / participants.length;

participants.forEach((name,i)=>{

ctx.beginPath();
ctx.moveTo(300,300);
ctx.arc(300,300,280,i*angle,(i+1)*angle);

ctx.fillStyle = i%2===0 ? "#f2d16b" : "#c89d2d";
ctx.fill();

ctx.save();
ctx.translate(300,300);
ctx.rotate(i*angle + angle/2);
ctx.fillStyle = "#000";
ctx.font = "bold 18px Arial";
ctx.fillText(name,150,10);
ctx.restore();

});

}

// ================= SPIN 45 DETIK =================
function spin(){

if(participants.length === 0) return;

const winnerIndex =
Math.floor(Math.random() * participants.length);

const angle = 360 / participants.length;

// 8 putaran penuh supaya lama
const target =
3600 +
(360 - (winnerIndex * angle) - angle/2);

rotation += target;

// IMPORTANT: 45 DETIK ANIMASI
canvas.style.transition =
"transform 45s cubic-bezier(0.05, 0.9, 0.1, 1)";

canvas.style.transform =
`rotate(${rotation}deg)`;

// tampilkan winner setelah 45 detik
setTimeout(() => {
showWinner(participants[winnerIndex]);
}, 45000);
}

// ================= WINNER =================
function showWinner(name){

document.getElementById("winnerName").innerText = name;

document.getElementById("modalPrize").innerText =
document.getElementById("prizeTitle").innerText;

document.getElementById("winnerModal").style.display = "flex";
}

// ================= CLOSE MODAL =================
function closeModal(){
document.getElementById("winnerModal").style.display = "none";
}

// ================= PARTICIPANT =================
function addParticipant(){
const input = document.getElementById("nameInput");
if(!input.value) return;

participants.push(input.value.toUpperCase());
localStorage.setItem("participants", JSON.stringify(participants));

input.value="";
drawWheel();
renderList();
}

function removeParticipant(index){
participants.splice(index,1);
localStorage.setItem("participants", JSON.stringify(participants));

drawWheel();
renderList();
}

function renderList(){
const list = document.getElementById("list");
list.innerHTML="";

participants.forEach((p,i)=>{
list.innerHTML += `
<li>
${p}
<button onclick="removeParticipant(${i})">❌</button>
</li>
`;
});
}

// ================= EVENT =================
document.getElementById("spinBtn").addEventListener("click", spin);

// INIT
drawWheel();
renderList();
