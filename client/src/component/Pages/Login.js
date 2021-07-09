import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }

    }, [history])

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            
            const {data} = await axios.post("http://localhost:5000/api/auth/login",{email,password},config);
            console.log("Data we get after login");
            console.log(data.token);
            localStorage.setItem("authToken",data.token);
            console.log("token saved in localStorage")
            history.push("/");
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }


    return (
        <div className="login">
            <form onSubmit={loginHandler} className="login__form">
                <h3 className="login__title">Login</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Email: </label>
                    <input type="email"
                        required
                        id="name"
                        placeholder="Enter a valid Email"
                        value={email}
                        tabIndex={1}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password:
                        <Link to="/forgotPassword" tabIndex={4} className="login__forgotpassword">Forgot Password</Link>
                    </label>
                    <input type="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        tabIndex={2}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" tabIndex={3}> Login </button>
                <span className="login__subtext">Don't have an Account? <Link to="/register"> Register </Link></span>
            </form>
        </div>
    )
}

export default Login;
