const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// ================= GLOBAL DATA (SYNC ALL DEVICE) =================
let participants = ["ANDI","BUDI","SITI","RINA"];
let forcedWinner = null;

// ================= GET PARTICIPANTS =================
app.get("/participants",(req,res)=>{
res.json(participants);
});

// ================= ADD PARTICIPANT =================
app.post("/participants",(req,res)=>{
participants.push(req.body.name.toUpperCase());
res.json(participants);
});

// ================= RESET =================
app.post("/reset",(req,res)=>{
participants = [];
res.json(participants);
});

// ================= SET WINNER (FROM PC ADMIN) =================
app.post("/winner",(req,res)=>{
forcedWinner = req.body.name.toUpperCase();
res.json({forcedWinner});
});

// ================= GET WINNER =================
app.get("/winner",(req,res)=>{
res.json({forcedWinner});
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("SERVER RUNNING"));
