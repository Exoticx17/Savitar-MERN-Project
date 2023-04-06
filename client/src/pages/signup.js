import React, { useState } from 'react';
import '../stylesheets/signup.css';
import { useSpring, animated } from 'react-spring';

const Signup = () => {
  const [eerror, setEerror] = useState('');
  const [perror, setPerror] = useState('');
  const [data, setData] = useState([]);

  const fade = useSpring({
    from: {
      opacity: 0.1,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 750,
    },
  });

  const lformHandler = async (e) => {
    e.preventDefault();

    // Reset Errors
    setEerror('');
    setPerror('');

    // Set States
    const email = e.target.email.value;
    const password = e.target.password.value
    console.log(email,password)

    try {
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
          admin: 'false',
          voted: 'false',
        }),
      });

      const data = await response.json();
      setData(data);

      if (data.errors) {
        setEerror(data.errors.email);
        setPerror(data.errors.password);
      }

      if (data.user) {
        window.setTimeout(() => {
          localStorage.setItem('userid', data.user);
          localStorage.setItem('admin', data.admin);
          window.location.assign('/');
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailStyle = { height: '30px' };
  const passStyle = { height: '30px' };

  return (
    <animated.div className="sucontainer" style={fade}>
      <div className="signup-form">
        <form onSubmit={lformHandler} className="sform">
          <h3 className="slogger"> Signup</h3>
          <div className="svertical-lines">
            <vr />
            <div className="semailx">
              <input
                type="text"
                name="email"
                className="semail"
                required
                autoComplete="off"
                placeholder="Email: "
                style={emailStyle}
              />
              <div className="semail-error">{eerror}</div>
            </div>
            <div className="spasswordx">
              <input
                type="password"
                name="password"
                className="spassword"
                required
                autoComplete="off"
                placeholder="Passwword: "
                style={passStyle}
              />
              <div className="spassword-error">{perror}</div>
            </div>
            <input type="submit" className="ssubmit" value="Signup" />
            <vr />
          </div>
        </form>
      </div>
    </animated.div>
  );
};

export default Signup;
