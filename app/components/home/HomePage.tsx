"use client";

import NavBar from "../re/NavBar";



interface HomePageInterface{
    setPageNumber:(pageNumber:number)=>void
}

function HomePage({setPageNumber}:HomePageInterface){
    return(
        <div className="px-2 py-2">
            <div className=" p-1">
                <NavBar setPageNumber={setPageNumber}/>
            </div>
        </div>
    )
}
export default HomePage