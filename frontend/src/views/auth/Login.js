import React, {useState, useEffect} from 'react';
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/showProducts');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }

        await axios
            .post('http://127.0.0.1:8000/api/v1/users/auth/login/', user)
            .then(data => {
                if (data.data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.data.key);
                    window
                        .location
                        .replace('http://localhost:3000/showProducts');
                } else {
                    setEmail('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            })
            .catch(err => {
                console.clear()
                alert('아이디 또는 비밀번호가 일치하지 않습니다.')
                setEmail('')
                setPassword('')
            })
        };

    return (
        <div className="login">
            {loading === false && <h1>Login</h1>}
            {errors === true && <h2>Cannot log in with provided credentials</h2>}
            {
                loading === false && (
                    <form onSubmit={onSubmit}>
                        <label htmlFor='email'>Email address:</label>
                        <br/>
                        <input
                            className="email-box"
                            name='email'
                            type='email'
                            value={email}
                            required="required"
                            onChange={e => setEmail(e.target.value)}/>{' '}
                        <br/>
                        <label htmlFor='password'>Password:</label>
                        <br/>
                        <input
                            className="password-box"
                            name='password'
                            type='password'
                            value={password}
                            required="required"
                            onChange={e => setPassword(e.target.value)}/>{' '}
                        <br/>
                        <input className="login-btn" type='submit' value='Login'/>
                    </form>
                )
            }
        </div>
    );
};

export default Login;