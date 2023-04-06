import React, { useState } from 'react';
import '../stylesheets/files.css'
import Lightning from '../photos/lightning.png';
import Beach from '../photos/beach.jpg';
import Construction from '../photos/construction.jpg';
import JHouses from '../photos/jhouse.jpg';
import Working from '../photos/working.jpg';
import Jet from '../photos/jet.jpg';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'

const Files = () => {
  const [data, setData] = useState([]);
  const [searchError, setSearchError] = useState(false); // Add new state for search error

  const onClick = () => {
    window.location.assign('/addfile');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    fetch(`http://localhost:5000/file/search?name=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setSearchError(true); // Set search error state to true if no results
        } else {
          setData(data); // Otherwise, set the data state with the results
          setSearchError(false);
        }
      });
  };

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
});

return (
  <animated.div className='ffiles' style={fade}>
    <div className='ftphoto'>
      <img src={Jet} className="fbg-photo"/>
      <h3>Files</h3>
      <button onClick={onClick} className="fnf-button">New File</button>
      <form onSubmit={onSubmit} className='fsearchform'>
        <img className='fficon' src={Lightning} />
        <input type='text' placeholder='Search Files:' name='search' className='fsearch-form' autoComplete='off'/>
      </form>
    </div>
    <div className='fresults'>
      {data.length ?
        data.map((file) => {
          const images = [Beach, Construction, JHouses, Working];
          const randomImage = images[Math.floor(Math.random() * images.length)];
          return (
            <div key={file._id} className="fcard">
              <Link className="fclink" to={`/files/${file._id}`}>
                <img src={randomImage} className='fcel-image' />
                <h4>{file.metadata.name}</h4>
                <p>{file.metadata.description}</p>
              </Link>
            </div>
          );
        }) : (
        <div className="fnothing">
          <p>No File Found</p>
        </div>
      )}
    </div>
  </animated.div>
);

};

export default Files;

