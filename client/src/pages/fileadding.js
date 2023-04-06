import React from 'react'
import '../stylesheets/fileadding.css'
import Lightning from '../photos/lightning.png'
import {useSpring, animated} from 'react-spring'

const FileAdding = () => {

    const onSubmit = (e) => {
        const title = e.target.atitle.value;
        const file = e.target.afile.files[0];
        const description = e.target.adescription.value;

        const formData = new FormData();
        formData.append('file', file);

        e.preventDefault() 
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
        <animated.div className='container' style={fade}>
            <div className='blueshell'>
                <div className='yellow'>
                    <form onSubmit={onSubmit}>
                        <h2>Add A New File</h2>
                        <input type="text" className="atitle" name="atitle" placeholder="Title: " autoComplete='off'/>
                        <img src={Lightning} className="lefti" />
                        <input type="file" className="afile" name="afile" />
                        <img src={Lightning} className="righti" />
                        <textarea className="adescription" name="adescription" placeholder="Description: " autoComplete='off'/>
                        <input type="submit" className="asubmit" />
                    </form>
                </div>
            </div>
        </animated.div>
     );
}
 
export default FileAdding;