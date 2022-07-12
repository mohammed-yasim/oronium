import React from 'react'
import { useHistory } from 'react-router-dom'
import { API } from '../etc/api';
import { setUserSession } from '../etc/Auth';
import "./login.css"
const ColoredLine = ({ color, width }) => (
    <hr
        style={{
            color: color,
            border: 1,
            borderColor: color,
            backgroundColor: color,
            height: 2,
            marginTop: 0,
            width: width
        }}
    />
);
function Login() {
    let history = useHistory();
    const onsubmitLoginForm = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target)
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        console.log(object)
        API.post('login', object).then((response) => {
            setUserSession(response.data.token);
            if(response.data.user==='artist'){
                history.push('/artist_onboard');
            }else{
                history.push('/');
            }
            
        }).catch(err => {
            console.log(err)
            event.target.reset()
        })
    }
    return (
        <div>
            <div className="head">
                <div className="form">
                    <form autoComplete='off' onSubmit={onsubmitLoginForm}>
                        <div className='form-inp-field'>
                            <h2>Login</h2>
                            <label> Email:</label><br />
                            <input type="email" name="email" placeholder='yourname@gmail.com' required /><br />
                            <label> Password:</label><br />
                            <input type="password" name="password" placeholder='password' required /><br />

                            <input type="submit" value="Submit" id='submit' />
                        </div>

                    </form>
                    <div className='flex-hr'>
                        <ColoredLine color="#E0E0E0" width="45%" /><p>or</p> <ColoredLine color="#E0E0E0" width="45%" />
                    </div>

                    <div className="g-btn-div">
                        <button className="g-btn"><p className='g-logo'></p>Continue with Google</button>
                    </div>

                    <p className='signup-p'>New to the platform? <a className='signup-link' title="0" href="#sign_up">Sign Up</a> Now</p>

                </div>

                <div className='pic-div'>
                    <div className="pic">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login