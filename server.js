const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// ================= DATA =================
let participants = ["ANDI","BUDI","SITI","RINA"];
let forcedWinner = null;

// ================= PUBLIC GET =================
app.get("/participants",(req,res)=>{
res.json(participants);
});

// ================= ADD PARTICIPANT =================
app.post("/participants",(req,res)=>{
const name = req.body.name?.toUpperCase();

if(name){
participants.push(name);
}

res.json(participants);
});

// ================= DELETE PARTICIPANT =================
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

// ================= WINNER =================
app.post("/winner",(req,res)=>{
forcedWinner = req.body.name?.toUpperCase();
res.json({forcedWinner});
});

app.get("/winner",(req,res)=>{
res.json({forcedWinner});
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("SERVER RUNNING"));
