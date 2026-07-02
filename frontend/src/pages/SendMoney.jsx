import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import axios from 'axios'

export function SendMoney(){
  const [searchParams] = useSearchParams();
  const [amount,setAmount] = useState(0);
  const onPress = async()=>{
    await axios.post('http://localhost:3000/api/v1/user/transfer',{
      toUserId:searchParams.get('toId'),
      amount:amount
    },{headers:{authorization:localStorage.getItem('token')}})
  }
  return(
    <div className="w-full text-zinc-900 h-screen bg-slate-200 flex items-center justify-center">
      <div className="card flex flex-col shadow-md rounded bg-zinc-100 p-12 gap-7">
        <div className="heading font-semibold text-2xl self-center mb-2 -mt-4">Send Money</div>
        <div className="receiverInfo flex flex-col gap-2">
          <div className="avatarAndName w-full flex gap-2 items-center justify-start ">
            <div className="Avatar text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xl bg-green-500">{searchParams.get('toName')[0].toUpperCase()}</div>
            <h1 className="font-semibold text-xl">{searchParams.get('toName')}</h1>
          </div>
            <h4>Amount in Rs</h4>
            <input onChange={(e)=>setAmount(e.target.value)} className="leading-none w-full h-12 rounded-md text-lg font-md text-zinc-700 font-thin px-2 py-1 outline-none border border-zinc-600 focus:border-2 focus:border-zinc-900 focus:text-zinc-900" placeholder = 'ex: 5'></input>
            <button onClick={onPress} className="cursor-pointer text-white px-3 py-2 bg-green-500 rounded-md font-md text-xl">Send Money</button>
        </div>
      </div>
    </div>
  )
}