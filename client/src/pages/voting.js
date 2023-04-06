import React, { useEffect, useState } from 'react'
import '../stylesheets/voting.css'
import Chess from '../photos/chess.jpg'
import { useCookies } from 'react-cookie';
import Lightning from '../photos/lightning.png';
import {useSpring, animated} from 'react-spring'

const Voting = () => {

    const [data,setData] = useState([])
    const [cookie,setCookie] = useCookies()
    const jwt = cookie.jwt
    
    useEffect(() => {
        if(!jwt){
            window.location.assign('/login') 
    } 
    })

    const onSubmit = (e) => {
        e.preventDefault()
        const industry = e.target.industry.value;
        fetch(`http://localhost:5000/vote/voting?id=63eba2c8a262fd1624daa95a&industry=${industry}`,{
            method: 'PATCH',
            redirect: 'follow',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data.name);
            console.log(data)
        })
      .catch((error) => console.log(error));
    }

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
        <animated.div className='ocontainer' style={fade}>
            <div className='ohead'>
                <img src={Chess} className="obgphoto" />
                <h2 className='obgh2'>Voting</h2>
            </div>
            <div className='obody'>
                <div className='oborder'>
                    <img className='oficon1' src={Lightning} />
                    <div className='oborders'>
                        <form onSubmit={onSubmit} >
                        <p>Vote for the Industry you belive is the most important. <br/>It will help us understand values and the importance <br/> of certain industries and specific colleges.</p>
                        <select className='onewindustry' name="industry">
                            <option value="" defaultValue className='s-value'>Industry</option>
                            <option value="computer" className='s-value'>Computer</option>
                            <option value="finance" className='s-value'>Finance</option>
                            <option value="manufacturing" className='s-value'>Manufacuring</option>
                            <option value="agriculture" className='s-value'>Agriculture</option>
                            <option value="medical" className='s-value'>Medical</option>
                            <option value="education" className='s-value'>Education</option>
                            <option value="defense" className='s-value'>Defense</option>
                            <option value="energy" className='s-value'>Energy</option>
                            <option value="entertainment" className='s-value'>Entertainment</option>
                            <option value="law" className='s-value'>Law</option>
                        </select> <br/>
                        <input type="submit" className='osubmiter' />
                        </form>
                    </div>
                    <img className='oficon-2' src={Lightning} />
                </div>
            </div>
        </animated.div>
     );
}
 
export default Voting;