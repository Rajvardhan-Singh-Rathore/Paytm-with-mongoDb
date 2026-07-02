import { useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Users({onPress,onSearch,users}){
    const navigate = useNavigate();
    return(
        <div className="usersContainer flex flex-col gap-3 mt-5">
            <h1 className="font-semibold text-2xl">Users</h1>
            <input onChange={onSearch} className="search leading-none w-full h-14 rounded-md text-xl font-md text-zinc-700 font-thin px-3 py-2 outline-none border border-zinc-600 focus:border-2 focus:border-zinc-900 focus:text-zinc-900" placeholder = 'Search users...'></input>
            <div className="w-full flex flex-col gap-2">
                {users.map((el,idx)=>(
                    <div key={el._id} className="w-full flex justify-between px-3 py-2">
                        <div className="box1 flex gap-2 font-semibold text-lg">
                            <div className="Avatar w-10 h-10 rounded-full flex items-center justify-center bg-slate-400">{el.firstName[0]}</div>
                            <div><h2 className="mt-2">{el.firstName+" "+el.lastName}</h2></div>
                        </div>
                        <button onClick={()=>navigate(`/send/?toId=${el._id}&toName=${el.firstName}`)} className="cursor-pointer text-white px-3 py-2 bg-zinc-800 rounded-md font-md text-xl">Send Money</button>
                    </div>
                ))}
            </div>
        </div>
    )
}