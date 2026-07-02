import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
export function Signin(){
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');

    const navigate = useNavigate();
    const fetchToken = async()=>{
        const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
            username,password
        });
        const {token} = response.data;
        localStorage.setItem('token',token);
        navigate('/dashboard');
    }
    return(
        <div className="back p-10 w-full h-screen bg-zinc-800 flex items-center justify-center">
            <div className="signInBox w-100 p-3 bg-zinc-200 rounded-md shadow-sm flex flex-col justify-center items-center gap-2 text-center font-thin text-lg">
                <Heading label={'SignIn'}></Heading>
                <SubHeading label={'Enter you information to SignIn'}></SubHeading>
                <InputBox onChange={(e)=>setusername(e.target.value)} placeholder={'rvsr@gmail.com'} label={'Email'}></InputBox>
                <InputBox onChange={(e)=>setpassword(e.target.value)} placeholder={'123456'} label={'Password'}></InputBox>
                <Button label={'SignIn'} onClick={fetchToken}></Button>
                <BottomWarning label={"Didn't have an account"} to={'/signup'} linkText={'SignIn'}></BottomWarning>
            </div>
        </div>
    )
}