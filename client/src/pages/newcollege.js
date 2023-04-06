import React, { useEffect, useState } from 'react';
import Lightning from '../photos/lightning.png'
import '../stylesheets/newcollege.css'
import Select from 'react-select';
import {useSpring, animated} from 'react-spring'

const NewCollege = () => {

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
          marginLeft: '190px',
          marginTop: '35px',
          lineHeight: '25px',
          boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 0, 255, 0.2)' : null,
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
        const title = e.target.ntitle.value;
        const nindustry = selectedOptions.map((industry) => industry.value);
        const description = e.target.ndescription.value;
        const itags = nindustry.map((tag) => `itags[]=${tag}`).join('&');

        e.preventDefault() 
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
    }

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectedOptions = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    return ( 
        <animated.div className='ncontainer' style={fade}>
            <div className='nblueshell'>
                <div className='nyellow'>
                    <form onSubmit={onSubmit}>
                        <h2>Add A New College</h2>
                        <input type="text" className="ntitle" name="ntitle" placeholder="Title: " autoComplete='off'/>
                        <img src={Lightning} className="nlefti" />
                        <img src={Lightning} className="nrighti" />
                        <Select
                            options={industryOptions}
                            isMulti
                            styles={customStyles}
                            placeholder='Industry: '
                            name="nindustry"
                            onChange={handleSelectedOptions}
                            value={selectedOptions}
                        />
                        <textarea className="ndescription" name="ndescription" placeholder="Description: " autoComplete='off'/>    
                        <input type="submit" className="nsubmit" />
                    </form>
                </div>
            </div>
        </animated.div>
     );
}
 
export default NewCollege;