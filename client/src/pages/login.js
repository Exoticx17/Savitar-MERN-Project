import React, { useState } from 'react'
import '../stylesheets/login.css'
import {useSpring, animated} from 'react-spring'

const Login = () => {

    const [eerror,setEerror] = useState('')
    const [perror,setPerror] = useState('')
    const [data,setData] = useState([])

    const fade = useSpring({
        from:{
            opacity: 0.1
        },
        to:{
            opacity: 1
        },
        config:{
            duration: 750
        }
    })

    const lformHandler = async (e) => {
        e.preventDefault()

        //Reset Errors
        setEerror('');
        setPerror('');

        //Set States
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(email,password)

        try {
            const res = await fetch('http://localhost:5000/user/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await res.json();
            setData(data)
            console.log(data)
            if(data.errors) {
                setEerror(data.errors.email)
                setPerror(data.errors.password)
            }
            if(data.user) {
                window.setTimeout(() => {
                    localStorage.setItem('userid', data.user)
                    localStorage.setItem('admin', data.admin)
                    window.location.assign('/') 
                },500)
            }
        } 
        catch(err){
            console.log(err)
        }
    }
    
    const emailStyle={ height: '30px'}
    const passStyle={ height: '30px'}

    return ( 
    <animated.div className="container" style={fade}>
        <div className='login-form'>
            <form onSubmit={lformHandler} className="lform">
            <h3 className='logger'> Login</h3>
                <div className='vertical-lines'>
                    <div className='emailx'>
                        <input type="text" name="email" className='email' required autoComplete='off'  placeholder="Email: " style={emailStyle}/>
                        <div className='email-error'>{eerror}</div>
                    </div>
                    <div className='passwordx' >
                        <input type="password" name="password" className='password' required autoComplete='off' placeholder="Password: " style={passStyle}/>
                        <div className='password-error'>{perror}</div>
                    </div>
                    <input type="submit" className='lsubmit' value='Login' />
                </div>
            </form>
        </div>
    </animated.div> 
    );
}
 
export default Login;
