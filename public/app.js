const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let participants =
JSON.parse(localStorage.getItem("participants")) || [
"ANDI",
"BUDI",
"SITI",
"RINA"
];

let prize =
localStorage.getItem("prize") ||
"HADIAH 1 JUTA";

document.getElementById("prizeTitle").innerText =
prize;

document.getElementById("prizeInput").value =
prize;

let rotation = 0;

function savePrize(){

const value =
document.getElementById("prizeInput").value;

localStorage.setItem("prize",value);

document.getElementById("prizeTitle").innerText =
value;
}

function addParticipant(){

const input =
document.getElementById("nameInput");

if(!input.value) return;

participants.push(
input.value.toUpperCase()
);

saveParticipants();

input.value="";

drawWheel();
}

function saveParticipants(){

localStorage.setItem(
"participants",
JSON.stringify(participants)
);

renderList();
}

function renderList(){

const list =
document.getElementById("list");

list.innerHTML="";

participants.forEach((p,index)=>{

const li=document.createElement("li");

li.innerHTML=
`${p}
<button onclick="removeParticipant(${index})">
❌
</button>`;

list.appendChild(li);

});
}

function removeParticipant(index){

participants.splice(index,1);

saveParticipants();

drawWheel();
}

function drawWheel(){

ctx.clearRect(0,0,600,600);

const angle =
(2*Math.PI)/participants.length;

participants.forEach((name,i)=>{

ctx.beginPath();

ctx.moveTo(300,300);

ctx.arc(
300,
300,
280,
i*angle,
(i+1)*angle
);

ctx.fillStyle =
i%2===0
? "#f2d16b"
: "#c89d2d";

ctx.fill();

ctx.save();

ctx.translate(300,300);

ctx.rotate(
i*angle+
angle/2
);

ctx.fillStyle="black";

ctx.font="bold 20px Arial";

ctx.fillText(
name,
150,
10
);

ctx.restore();

});

}

function spin(){

if(participants.length===0)
return;

const winnerIndex =
Math.floor(
Math.random()*
participants.length
);

const angle =
360/participants.length;

const target =
3600+
(360-(winnerIndex*angle)-angle/2);

rotation += target;

canvas.style.transform =
`rotate(${rotation}deg)`;

setTimeout(()=>{

showWinner(
participants[winnerIndex]
);

},8000);

}

function showWinner(name){

document.getElementById("winnerName")
.innerText=name;

document.getElementById("modalPrize")
.innerText=
localStorage.getItem("prize");

document.getElementById("winnerModal")
.style.display="flex";
}

function closeModal(){

document.getElementById("winnerModal")
.style.display="none";
}

document
.getElementById("spinBtn")
.addEventListener("click",spin);

renderList();
drawWheel();
