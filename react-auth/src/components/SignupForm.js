import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, } from 'semantic-ui-react'
import axiosWithAuth  from '../utils/axiosWithAuth.js';

const SignupForm = () => {
    const [userInfo, setUserInfo] = useState('');
    const history = useHistory()  

    const handleChange = e => {
        setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value,
        })
      }

     const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/register', userInfo)
            .then(res => {
                // localStorage.setItem('token', res.data.token);
                // localStorage.setItem('user', res.data.user);
                history.push('/api/auth/login');
            })
            .catch(err => {
                localStorage.removeItem("token");
                console.log('invalid login: ', err);
            });
    };  

    return (
       <div className="register">
           <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Field
         
            >
                <label>Username</label>
                <input 
                   required
                    type='text'
                    name='username'
                    placeholder='Username' 
                    value={userInfo.username}
                    onChange={handleChange}
                    
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input 
                required
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={userInfo.password}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Department</label>
                <input 
                required
                    type='text'
                    name='department'
                    placeholder='Department' 
                    value={userInfo.department}
                    onChange={handleChange}
                />
            </Form.Field>
                <p>
                    Already have an account? <Link to="/api/auth/login">Log in!</Link>
                </p>

            <Button id="btn" type='submit'>Register</Button>
        </Form>
       </div>
  )
}

export default SignupForm;