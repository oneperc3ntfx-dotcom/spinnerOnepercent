"use client";

import { useState } from "react";
import SpinnerWheel from "@/components/SpinnerWheel";
import WinnerModal from "@/components/WinnerModal";

export default function Home(){

 const [winner,setWinner]=useState("");
 const [spinning,setSpinning]=useState(false);

 const data=[
  {option:"Andi"},
  {option:"Budi"},
  {option:"Siti"},
  {option:"Rina"},
 ];

 const [index,setIndex]=useState(0);

 const spin=()=>{

  const random=Math.floor(
   Math.random()*data.length
  );

  setIndex(random);
  setSpinning(true);

  setTimeout(()=>{
   setWinner(data[random].option);
   setSpinning(false);
  },6000);
 };

 return(
  <main className="min-h-screen flex flex-col items-center justify-center">

   <h1 className="text-6xl gold mb-10">
    GRAND LUCKY DRAW
   </h1>

   <SpinnerWheel
    data={data}
    spinning={spinning}
    prizeIndex={index}
   />

   <button
    onClick={spin}
    className="mt-8 px-8 py-4 bg-yellow-500 text-black rounded-xl"
   >
    SPIN
   </button>

   <WinnerModal winner={winner}/>
  </main>
 );
}
