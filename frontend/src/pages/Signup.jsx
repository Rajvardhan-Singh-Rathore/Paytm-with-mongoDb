import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function Signup(){
    const [firstName,setFirstName] = useState('ajfdl');
    const [lastName,setlastName] = useState('');
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');

    const navigate = useNavigate();
    const fetchToken = async()=>{
        const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
            username,firstName,lastName,password
        });
        const {token} = response.data;
        localStorage.setItem('token',token);
        navigate('/dashboard');
    }
    return(
        <div className="back p-10 w-full h-screen bg-zinc-800 flex items-center justify-center">
            <div className="signUpBox w-100 p-3 bg-zinc-200 rounded-md shadow-md flex flex-col items-center justify-center gap-2 text-center font-thin text-lg">
                <Heading label={'Signup'}></Heading>
                <SubHeading label={'Enter you information to create an account'}></SubHeading>
                <InputBox onChange = {(e)=>setFirstName(e.target.value)} placeholder={'Rajvardhan'} label={'First Name'}></InputBox>
                <InputBox onChange = {(e)=>setlastName(e.target.value)} placeholder={'Singh Rathore'} label={'Last Name'}></InputBox>
                <InputBox onChange = {(e)=>setusername(e.target.value)} placeholder={'rvsr@gmail.com'} label={'Email'}></InputBox>
                <InputBox onChange = {(e)=>setpassword(e.target.value)} placeholder={'123456'} label={'Password'}></InputBox>
                <Button label={'Signup'} onClick={fetchToken}></Button>
                <BottomWarning label={'Already have an account'} to={'/signin'} linkText={'Signup'}></BottomWarning>
            </div>
        </div>
    )
}