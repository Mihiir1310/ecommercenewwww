"use client"
import { useFetch } from "@/hooks/useFetch"
//import { useEffect } from "react";

const Page = () => {
   const {data, postData, putData, deleteData} = useFetch("https://68f9d09def8b2e621e7d8737.mockapi.io/api/products");

const addData= ()=>{
    postData({name: "mihir"});
    console.log("add succesfully")
}
const updateData = async()=>{

   await putData(1,{name:"xyz"});
    console.log("update success")
}

const deeleteData = async() =>{
    await deleteData(9);
    console.log("delete success")
}

console.log("data>>>", data)

  return (
    <div>page
        <button onClick={addData}> add </button > 
        <br/>
        <button onClick={updateData}> update</button> 
        <br/>
        <button onClick={deeleteData}> delete</button> 
        <br/>
        
        
    </div>
  )
}

export default Page;