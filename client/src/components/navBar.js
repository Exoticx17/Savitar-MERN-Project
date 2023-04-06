import '../stylesheets/navbar.css'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Lightning from '../photos/lightning.png'
import {useSpring, animated} from 'react-spring'

const Navbar = () => {

    const [cookie,setCookie] = useCookies()
    const jwt = cookie.jwt
    let userId = localStorage.getItem('userid')
    const [data,setData] = useState([])
    const [admin,setAdmin] = useState()
    const [pdata,setPData] = useState([])
    useEffect( () => {
        if(jwt){
            fetch(`http://localhost:5000/user/one/${userId}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow',
                credentials: 'include'
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setPData(data)
                setAdmin(pdata.admin)
            }) 
          
        }
    })

    
    const onSubmit = async () =>{
        try {
            
            fetch('http://localhost:5000/user/logout',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow',
                credentials: 'include'
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
            })
            .then(() => {
                window.setTimeout(() => {
                    window.location.assign('/login')
                },200)
            })
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div className='landing-nav'>
            <Link to={jwt ? '/home' : '/'} ><img className='icon' src={Lightning}/></Link>
            <Link to={jwt ? '/home' : '/'} className='savitar'>Savitar</Link>
            <Link to='/admin' className={admin ? 'xadmin' : 'hide'}>Admin</Link>
            <Link to='/files' className={!admin ?'xfiles' : 'filess'}>Files</Link>
            <Link to='/voting' className={!jwt ? 'xvoting' : 'voting'}>Voting</Link>
            <Link to='/vinfo' className={!jwt ? 'xvinfo' : 'vinfo'}>Voting Info</Link>
            <Link to='/login' className={jwt ? 'hide' : 'xlogin'}>Login</Link>
            <Link to='/signup' className={jwt ? 'hide' : 'xsignup'}>Signup</Link>
            <h6 className={jwt ? 'xlogout' : 'hide'} onClick={onSubmit}>Logout</h6>
    </div>
     );
}
 
export default Navbar;