"use client";

import { Wheel } from "react-custom-roulette";

export default function SpinnerWheel({
 data,
 spinning,
 prizeIndex
}: any){

 return (
  <Wheel
   mustStartSpinning={spinning}
   prizeNumber={prizeIndex}
   data={data}
   backgroundColors={[
    "#D4AF37",
    "#A67C00",
    "#FFD700"
   ]}
   textColors={["#000"]}
  />
 );
}
