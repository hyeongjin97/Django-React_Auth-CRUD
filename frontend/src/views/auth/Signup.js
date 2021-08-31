import axios from 'axios';
import React, {useState, useEffect} from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUserName] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window
                .location
                .replace('http://localhost:3000/dashboard');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            email: email,
            username: username,
            password1: password1,
            password2: password2
        };
        if (password1 !== password2) {
            alert('비밀번호가 일치하지 않습니다')
            return false
        }
        if (password1.length < 8) {
            alert('비밀번호는 8자 이상이여야 하며 숫자로만 이루어질 수 없습니다.')
            return false
        }

        axios
            .post('http://127.0.0.1:8000/api/v1/users/auth/register/', user)
            .then(data => {
                if (data.data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.data.key);
                    window
                        .location
                        .replace('http://localhost:3000/dashboard');
                } else {

                    setEmail('');
                    setPassword1('');
                    setPassword2('');
                    setUserName('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <div className="sign-up">
            {loading === false && <h1>Signup</h1>}
            {errors === true && <h2>Cannot signup with provided credentials</h2>}
            <form onSubmit={onSubmit}>
                <label htmlFor='email'>Email address:</label>
                <br/>
                <input
                    className="sign-box"
                    name='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required="required"/>{' '}

                <br/>
                <label htmlFor='username'>User Name:</label>
                <br/>
                <input
                    className="sign-box"
                    name='username'
                    type='text'
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    required="required"/>{' '}

                <br/>
                <label htmlFor='password1'>Password:</label>
                <br/>
                <input
                    className="sign-box"
                    name='password1'
                    type='password'
                    value={password1}
                    onChange={e => setPassword1(e.target.value)}
                    required="required"/>{' '}
                <br/>
                <label htmlFor='password2'>Confirm password:</label>
                <br/>
                <input
                    className="sign-box"
                    name='password2'
                    type='password'
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                    required="required"/>{' '}
                <br/>
                <input type='submit' value='Signup'/>
            </form>
        </div>
    );
};

export default Signup;