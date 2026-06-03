const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let participants = ["ANDI","BUDI","SITI","RINA"];

// 🔥 WINNER STATE (EMPTY = RANDOM MODE)
let forcedWinner = "";

// ================= GET PARTICIPANTS =================
app.get("/participants",(req,res)=>{
res.json(participants);
});

// ================= ADD =================
app.post("/participants",(req,res)=>{
const name = req.body.name?.toUpperCase();
if(name && !participants.includes(name)){
participants.push(name);
}
res.json(participants);
});

// ================= DELETE =================
app.delete("/participants",(req,res)=>{
const name = req.body.name?.toUpperCase();
participants = participants.filter(p => p !== name);
res.json(participants);
});

// ================= RESET =================
app.post("/reset",(req,res)=>{
participants = [];
res.json(participants);
});

// ================= SET WINNER =================
app.post("/winner",(req,res)=>{
const name = req.body.name;

// 🔥 KUNCI LOGIC:
// kosong "" = random mode
if(!name || name.trim() === ""){
forcedWinner = "";
}else{
forcedWinner = name.toUpperCase();
}

res.json({forcedWinner});
});

// ================= GET WINNER =================
app.get("/winner",(req,res)=>{
res.json({forcedWinner});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log("RUNNING"));
