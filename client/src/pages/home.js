import React, { useEffect, useState } from 'react';
import '../stylesheets/home.css'
import Skyline from '../photos/skyline.jpg';
import { useCookies } from 'react-cookie';
import Beach from '../photos/beach.jpg';
import Construction from '../photos/construction.jpg';
import JHouses from '../photos/jhouse.jpg';
import Working from '../photos/working.jpg'
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';

const Home = () => {

    const toFiles = () => {
        window.location.href = '/files';
      };

      const addFiles = () => {
        window.location.href = '/addfile';
      };

      const addColleges = () => {
        window.location.href = '/newcollege';
      };

      const toColleges = () => {
        window.location.href = '/vinfo';
      };

      const [cookie, setCookie] = useCookies();
    const jwt = cookie.jwt;
    const userId = localStorage.getItem('userid')
    const [user, setUser] = useState([]);
    const [colleges,setColleges] = useState([]);
    const [files,setFiles] = useState([]);

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

    useEffect(() => {
        if (!jwt) {
          window.location.assign('/login');
        } else {
            fetch(`http://localhost:5000/user/one/${userId}`)
            .then(res => res.json())
            .then(data => {
              setUser(data)
            })
            .catch(err => console.log(err));
    
            fetch(`http://localhost:5000/vote/suggestions?id=${userId}`)
            .then(res => res.json())
            .then(data => {
              setColleges(data)
            })
            .catch(err => console.log(err));

            fetch(`http://localhost:5000/file/five`)
            .then(res => res.json())
            .then(data => {
              setFiles(data)
            })
            .catch(err => console.log(err));
        }
      }, [jwt]);

      const firstTwo = colleges.slice(0, 2);
      const lastTwo = colleges.slice(2);

    return ( 
        <animated.div className='hcontainer' style={fade}>
            <div className='hhead'>
                <img src={Skyline} className="hbgphoto" />
                <h2 className='hbgh2'>Voting</h2>
                <button className='hblue' onClick={toFiles}>Created Files</button>
                <button className='h1green' onClick={addFiles}>File</button>
                <button className='h2green' onClick={addColleges}>College</button>
                <button className='hyellow' onClick={toColleges}>Voted Colleges</button>
            </div>
            <div className='hcinfo'>
                <div className='hcolor'>
                    <div className='hleft'>
                    {firstTwo.map((college) => {
                        const images = [Beach, Construction, JHouses, Working];
                        const randomImage = images[Math.floor(Math.random() * images.length)];
                        return (
                            <div key={college._id} className="hcard1">
                                    <img src={randomImage} className='hcel-image' />
                                    <h4>{college.name}</h4>
                                    <p>{college.description}</p>
                            </div>
                        )
                        })}
                    </div>
                <div className='hmiddle'>
                    <h1>College <br/> Suggestions</h1>
                    <h2>Your Industry: <br/>{user.voted}</h2> 
                </div>
                <div className='hright'>
                    {lastTwo.map((college) => {
                        const images = [Beach, Construction, JHouses, Working];
                        const randomImage = images[Math.floor(Math.random() * images.length)];
                        return (
                            <div key={college._id} className="hcard2">
                                    <img src={randomImage} className='hcel-image' />
                                    <h4>{college.name}</h4>
                                    <p>{college.description}</p>
                            </div>
                        )
                        })}
                    </div>
                </div>
            </div>
            <div className="hbluebox">
                <h2>5 Files For You</h2>
                <div className='h5files'>
                    {files.map((file) => {
                        const images = [Beach, Construction, JHouses, Working];
                        const randomImage = images[Math.floor(Math.random() * images.length)];
                        return (
                            <div key={file._id} className="hcard">
                                <Link className="hclink" to={`/files/${file._id}`}>
                                    <img src={randomImage} className='hcel-image' />
                                    <h4>{file.metadata.name}</h4>
                                    <p>{file.metadata.description}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </animated.div>
     );
}
 
export default Home;