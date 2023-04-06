import React, { useEffect, useState } from 'react';
import '../stylesheets/svinfo.css'
import { useCookies } from 'react-cookie';
import { useSpring, animated } from 'react-spring'
import Beach from '../photos/beach.jpg';
import Construction from '../photos/construction.jpg';
import JHouses from '../photos/jhouse.jpg';
import Working from '../photos/working.jpg';
import Nature from '../photos/nature.jpg'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const VInfo = () => {
  const [data, setData] = useState([]);
  const [cookie, setCookie] = useCookies();
  const jwt = cookie.jwt;
  const userId = localStorage.getItem('userid')
  const [voteSheet, setVoteSheet] = useState([]);
  const [average, setAverage] = useState([]);
  const [median, setMedian] = useState([]);
  const [highest, setHighest] = useState([]); 
  const [lowest, setLowest] = useState([]);
  const [user, setUser] = useState([]);
  const [colleges,setColleges] = useState([]);

  useEffect(() => {
    if (!jwt) {
      window.location.assign('/login');
    } else {
      fetch(`http://localhost:5000/vote/sheet?id=63eba2c8a262fd1624daa95a`)
        .then(res => res.json())
        .then(data => {
          setVoteSheet(data);
          const appList = [
            {
              Subject: 'Computer',
              Amount: data.computer || 0
            },
            {
              Subject: 'Finance',
              Amount: data.finance || 0
            },
            {
              Subject: 'Manufacturing',
              Amount: data.manufacturing || 0
            },
            {
              Subject: 'Agriculture',
              Amount: data.agriculture || 0
            },
            {
              Subject: 'Medical',
              Amount: data.medical || 0
            },
            {
              Subject: 'Education',
              Amount: data.education || 0
            },
            {
              Subject: 'Defense',
              Amount: data.defense || 0
            },
            {
              Subject: 'Energy',
              Amount: data.energy || 0
            },
            {
              Subject: 'Entertainment',
              Amount: data.entertainment || 0
            },
            {
              Subject: 'Law',
              Amount: data.law || 0
            }
          ];
          setData(appList);
        })
        .catch(err => console.log(err));

        fetch(`http://localhost:5000/vote/average?id=63eba2c8a262fd1624daa95a`)
        .then(res => res.json())
        .then(data => {
          const roundedData = Math.round(data * 10) / 10; // round to nearest tenth
          setAverage(roundedData);
        })
        .catch(err => console.log(err));      

      fetch(`http://localhost:5000/vote/median?id=63eba2c8a262fd1624daa95a`)
        .then(res => res.json())
        .then(data => {
          setMedian(data);
        })
        .catch(err => console.log(err));

      fetch(`http://localhost:5000/vote/range?id=63eba2c8a262fd1624daa95a`)
        .then(res => res.json())
        .then(data => {
          setHighest(data.highest || 0);
          setLowest(data.lowest  || 0)

        })
        .catch(err => console.log(err));

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
    }
  }, [jwt]);

  const firstTwo = colleges.slice(0, 2);
  const lastTwo = colleges.slice(2);
  console.log(firstTwo)
  console.log(lastTwo)
  
  const onClick = () => {
    window.location.assign('/newcollege');
  };

  const fade = useSpring({
    from: {
      opacity: 0.1
    },
    to: {
      opacity: 1
    },
    config: {
      duration: 750
    }
  });

  return (
    <animated.div className='vcontainer' style={fade}>
      <div className='vhead'>
        <img src={Nature} className="vbgphoto" />
        <h2>Voting And <br /> College Info</h2>
        <button onClick={onClick} className="vcbutton">New College</button>
      </div>
      <div className='vbodyi'>
        <div className='vbinfo'>
            <div className="vnumbers">
                <h2 className="vrange">Range: {highest} - {lowest}</h2>
                <h2 className='vaverage'>Average: {average}</h2>
                <h2 className='vmedian'>Median: {median}</h2>
            </div>
            <BarChart width={1100} height={450} data={data} className='vbar'>
                <XAxis dataKey="Subject" />
                <YAxis tickFormatter={tick => Math.floor(tick)} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Amount" stackId="a" fill="#1a6985" />
            </BarChart>
        </div>
      </div>
      <div className='vcinfo'>
        <div className='vcolor'>
            <div className='vleft'>
            {firstTwo.map((college) => {
                const images = [Beach, Construction, JHouses, Working];
                const randomImage = images[Math.floor(Math.random() * images.length)];
                return (
                    <div key={college._id} className="vcard1">
                            <img src={randomImage} className='vcel-image' />
                            <h4>{college.name}</h4>
                            <p>{college.description}</p>
                    </div>
                )
                })}
            </div>
        <div className='vmiddle'>
            <h1>College <br/> Suggestions</h1>
            <h2>Your Industry: <br/>{user.voted}</h2>
        </div>
        <div className='vright'>
            {lastTwo.map((college) => {
                const images = [Beach, Construction, JHouses, Working];
                const randomImage = images[Math.floor(Math.random() * images.length)];
                return (
                    <div key={college._id} className="vcard2">
                            <img src={randomImage} className='vcel-image' />
                            <h4>{college.name}</h4>
                            <p>{college.description}</p>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
    </animated.div>
  );
}  

export default VInfo;