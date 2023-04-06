import React, { useEffect, useState } from 'react';
import AdminPic from '../photos/adminpic.jpg';
import Trophy from '../photos/trophy.png';
import '../stylesheets/admin.css';
import Select from 'react-select';
import {useSpring, animated} from 'react-spring'

const Admin = () => {

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

  const onClick1 = () => {
    window.location.href = '/files';
  };

  const onClick2 = () => {
    window.location.href = '/vinfo';
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectedOptions = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const industryOptions = [
    { value: 'computer', label: 'Computer' },
    { value: 'finance', label: 'Finance' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'medical', label: 'Medical' },
    { value: 'education', label: 'Education' },
    { value: 'defense', label: 'Defense' },
    { value: 'energy', label: 'Energy' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'law', label: 'Law' }
  ];
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '25px',
      width: '350px',
      backgroundColor: '#008db1',
      color: 'white',
      fontSize: '18px',
      border: '1px solid #024a5c',
      borderRadius: '5px',
      paddingLeft: '7px',
      marginLeft: '20px',
      marginTop: '35px',
      lineHeight: '25px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 0, 255, 0.2)' : null
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black',
      ':hover': {
        backgroundColor: '#007bff',
        color: 'white'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#01596f',
      borderRadius: '5px',
      padding: '2px 5px',
      height: '35px',
      marginTop: '-2px'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: '16px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: '16px',
      ':hover': {
        backgroundColor: 'transparent',
        color: '#007bff',
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid #024a5c',
      borderRadius: '5px',
      marginTop: '0px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0px',
      backgroundColor: '#01596f',
      fontSize: '16px',
      lineHeight: '20px',
      maxHeight: '150px',
      overflowY: 'auto',
      color: 'white'
    }),
    option: (provided) => ({
        ...provided,
        backgroundColor: '#01596f',
        color: 'white',
        ':hover': {
            backgroundColor: '#00b6e3',
            color: 'white'
          }
      }),
  };
  
  

  const onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.fid.value;
    const title = e.target.ftitle.value;
    const file = e.target.ffile.files[0];
    const description = e.target.fdescription.value;

    const formData = new FormData();
    formData.append('file', file);

    if (e.target.ftype.value == 'POST') {
      fetch(`http://localhost:5000/file?name=${title}&description=${description}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
        .then(() => {
          console.log('POSTED');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.ftype.value == 'PUT') {
        fetch(`http://localhost:5000/file/edit?name=${title}&description=${description}&id=${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData,
          })
            .then(() => {
              console.log('EDITED');
            })
            .catch((err) => {
              console.log(err);
            });
    } else if (e.target.ftype.value == 'DELETE') {
        fetch(`http://localhost:5000/file/delete?id=${id}`, {
            method: 'DELETE',
            credentials: 'include'
          })
            .then(() => {
              console.log('DELETED');
            })
            .catch((err) => {
              console.log(err);
            });
    }
  };

  const on2Submit = (e) => {
    e.preventDefault()
    const uid = e.target.uid.value;
    const changeto = e.target.uadmin.value;
    fetch(`http://localhost:5000/user/admin/${uid}?changeTo=${changeto}`,{
        method: 'PATCH',
        credentials: 'include'
    })
    .then(() => {
        console.log('PATCHED');
    })
    .catch((err) => {
        console.log(err);
    });
}

const on3Submit = (e) => {
    e.preventDefault();
    const id = e.target.cid.value;
    const title = e.target.ctitle.value;
    const cindustry = selectedOptions.map((industry) => industry.value);
    const description = e.target.cdescription.value;
    const itags = cindustry.map((tag) => `itags[]=${tag}`).join('&');
  
    if (e.target.ctype.value == 'POST') {
      fetch(`http://localhost:5000/vote/college?name=${title}&description=${description}&${itags}`, {
        method: 'POST',
        credentials: 'include',
      })
        .then(() => {
          console.log('POSTED');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.ctype.value == 'PUT') {
      fetch(`http://localhost:5000/vote/college/edit?id=${id}&name=${title}&description=${description}&${itags}`, {
        method: 'PATCH',
        credentials: 'include',
      })
        .then(() => {
          console.log('PUT');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.ctype.value == 'DELETE') {
      fetch(`http://localhost:5000/vote/college/delete?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(() => {
          console.log('DELETED');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  
  return (
    <animated.div className="container" style={fade}>
      <div className="topphoto">
        <img src={AdminPic} className="topadmin" alt="admin" />
        <h2>Just One Of Us</h2>
        <button onClick={onClick1} className="bbutton">
          File Info Page
        </button>
        <button onClick={onClick2} className="ybutton">
          Voting Info Page
        </button>
      </div>
      <div className="forms">
        <div className="leftf">
          <form onSubmit={onSubmit}>
            <h2>File</h2>
            <input type="text" className="fid" name="fid" placeholder="ID: " autoComplete='off'/>
            <select className="ftype" name="ftype">
              <option value="" defaultValue className="f-value">
                Type
              </option>
              <option value="POST" className="f-value">
                POST
              </option>
              <option value="PUT" className="s-value">
                PUT
              </option>
              <option value="DELETE" className="s-value">
                DELETE
              </option>
            </select>
            <input type="text" className="ftitle" name="ftitle" placeholder="Title: " autoComplete='off'/>
            <input type="file" className="ffile" name="ffile" />
            <textarea className="fdescription" name="fdescription" placeholder="Description: " autoComplete='off'/>
            <input type="submit" className="fsubmit" />
          </form>
        </div>
        <div className='topmiddle'>
            <form onSubmit={on2Submit}>
                <h2>User</h2>
                <input type="text" className="uid" name="uid" placeholder="ID: " autoComplete='off'/>
                <select className="uadmin" name="uadmin">
                <option value="" defaultValue className="f-value">
                    Type
                </option>
                <option value="true" className="f-value">
                    True
                </option>
                <option value="false" className="s-value">
                    False
                </option>
                </select>
                <input type="submit" className="usubmit" />
            </form>
        </div>
        <div className='bottomm'>
            <img src={Trophy} className="trophy" />
        </div>
        <div className='rightc'>
        <form onSubmit={on3Submit}>
            <h2>College</h2>
            <input type="text" className="cid" name="cid" placeholder="ID: " autoComplete='off'/>
            <select className="ctype" name="ctype">
              <option value="" defaultValue className="f-value">
                Type
              </option>
              <option value="POST" className="f-value">
                POST
              </option>
              <option value="PUT" className="s-value">
                PUT
              </option>
              <option value="DELETE" className="s-value">
                DELETE
              </option>
            </select>
            <input type="text" className="ctitle" name="ctitle" placeholder="Title: " autoComplete='off' size="8"/>
            <Select
                options={industryOptions}
                isMulti
                styles={customStyles}
                placeholder='Industry: '
                name="cindustry"
                onChange={handleSelectedOptions}
                value={selectedOptions}
            />
            <textarea className="cdescription" name="cdescription" placeholder="Description: " autoComplete='off'/>
            <input type="submit" className="csubmit" />
          </form>
        </div>
      </div>
    </animated.div>
  );
};

export default Admin;
