import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'

const Register = ({ history }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }

    }, [history])


    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Password don't match");
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/register", { username, email, password }, config);
            localStorage.setItem("authToken", data.token);
            history.push("/");
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }


    return (
        <div className="register">
            <form onSubmit={registerHandler} className="register__form">
                <h3 className="register__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">UserName: </label>
                    <input type="text"
                        required
                        id="name"
                        placeholder="Enter UserName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email: </label>
                    <input type="email"
                        required
                        id="email"
                        placeholder="Enter a valid Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password: </label>
                    <input type="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name"> Confirm Password: </label>
                    <input type="password"
                        required
                        id="confirmPassword"
                        placeholder="Enter Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary"> Register </button>
                <span className="register__subtext">Already have an Account? <Link to="/login"> Login </Link></span>
            </form>
        </div>
    )
};

export default Register
