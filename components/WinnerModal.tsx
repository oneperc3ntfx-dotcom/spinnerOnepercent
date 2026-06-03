export default function WinnerModal({
 winner
}:{
 winner:string
}){

 if(!winner) return null;

 return(
  <div className="fixed inset-0 flex items-center justify-center bg-black/70">
   <div className="luxury-card p-10">
    <h1 className="text-5xl gold">
      🎉 {winner}
    </h1>
   </div>
  </div>
 );
}
