import React, {useEffect, useState} from 'react'
import '../stylesheets/landing.css'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {useSpring, animated} from 'react-spring'
import HeadPhoto from '../photos/headphoto.jpg'
import Services from '../photos/services.jpg'
import Customers from '../photos/customers.jpg'
import Product from '../photos/product.jpg'


const Landing = () => {

    const [cookie,setCookie] = useCookies()
    const jwt = cookie.jwt
    let userId = localStorage.getItem('userid')
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

    return ( 
        <animated.div className='lcontainer' style={fade}> 
            <div className='lpic-container'>
                <div className='lheader-nav'>
                    <h2>Change At Savitar <br/> Level Speeds.</h2>
                    <p>Learn about all the different types of industries out there <br/>and what you could be within them. So many new ways <br/>with videos, pictures, or pdfs to learn about your future.<br/> Your future, can also be changed with features to help<br/> vote and suggest colleges for your path to the top.</p>
                    <Link to='/files' className='lfilebtn'>Industries</Link>
                    <Link to={jwt ? '/home' : '/signup'} className='lstartbtn'>Get Started</Link>
                    <h3>Whats New At Savitar?</h3>
                </div>
                <img src={HeadPhoto} className='lheadphoto'/>
            </div>
            <div className='linfo-container'>
                <h2 className='linfohead'>Everything New!</h2>
                <div className='linfo1'>
                    <img src={Services} className='lservicephoto'/>
                    <h4>Services</h4>
                    <p>Learn at a quicker rate than most, at a slower cost than most. All coming to you from Savitar.</p>
                </div>
                <div className='linfo2'>
                    <img src={Customers} className='lcustomerphoto'/>
                    <h4>Customers</h4>
                    <p>All customers come here at one level and exit at another shot up level. All at Savitar speeds.</p>
                </div>
                <div className='linfo3'>
                    <img src={Product} className='lproductphoto'/>
                    <h4>Products</h4>
                    <p>Our products get better and better with your help. Learning from every Savitar customer.</p>
                </div>
            </div>
        </animated.div>
     );
}
 
export default Landing;