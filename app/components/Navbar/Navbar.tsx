import BottomNav from "./BottomNav";
import Middel from "./Middel";


export default function Navbar() {
  return (
   <>
   <header className="w-full">
        <div className="hidden lg:block ">
              <Middel/>
        </div>

        <BottomNav/>
   </header>
   </>
  )
}
