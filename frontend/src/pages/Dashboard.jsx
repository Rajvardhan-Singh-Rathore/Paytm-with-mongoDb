import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

export function Dashboard(){
  const [balance,setBalance] = useState(0);
  const [filter,setFilter] = useState('');
  const [users,setUsers] = useState([]);

  useEffect(()=>{return async()=>{
    const response = await axios.get('http://localhost:3000/api/v1/user/balance',{
      headers:{'authorization':localStorage.getItem('token')}
    });
    setBalance(response.data.balance);
  }},[balance]);
  const [searchParams] = useSearchParams();
  const search =async(e)=>{
    setFilter(e.target.value);
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
    if(response.data==undefined){setUser([]);return;}
    setUsers(response.data.users);
  }
  return(
    <div>
      <AppBar></AppBar>
      <div className="p-3 flex flex-col gap-3">
        <h1 className="text-xl mt-3">Your balance Rs {balance}</h1>
        <Users onSearch={search} users={users}></Users>
      </div>
    </div>
  )
}