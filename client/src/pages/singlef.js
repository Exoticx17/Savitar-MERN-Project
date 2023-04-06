import React, { useEffect, useState } from 'react';
import '../stylesheets/singlef.css';
import Sandy from '../photos/sandy.jpg'
import { useParams } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import { useCookies } from 'react-cookie';

const SingleF = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [cookie,setCookie] = useCookies()
  const jwt = cookie.jwt

  useEffect(() => {
    if(!jwt){
      window.location.assign('/login') 
    } 
    fetch(`http://localhost:5000/file/one/${id}`)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const type = blob.type;
        if (type.startsWith('image/')) {
          const img = URL.createObjectURL(blob);
          setFile(<img src={img} alt="file" className='image'/>);
        } else if (type.startsWith('video/')) {
          const src = URL.createObjectURL(blob);
          setFile(
            <video controls className='video'>
              <source src={src} type={type} />
            </video>
          );
        } else if (type.startsWith('audio/')) {
          const src = URL.createObjectURL(blob);
          setFile(
            <audio controls>
              <source src={src} type={type} className='audio'/>
            </audio>
          );
        } else {
          setFile(<p>File type not supported</p>);
        }
      })
      .catch((error) => console.log(error));
      
    fetch(`http://localhost:5000/file/getone/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFileName(data.name);
        setFileDescription(data.description);
      })
      .catch((error) => console.log(error));
  }, [id]);

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
    <animated.div className="scontainer" style={fade}>
    <div className="sinfo">
    <img src={Sandy} className="scard-pic"/>
      <h2 className='sh2'>{fileName}</h2>
      <div className='sflex'>
        <p className='sp'>{fileDescription}</p>
      </div>
    </div>
      <div className='sreturn'>
        {file}
      </div>
    </animated.div>
  );
};

export default SingleF;
