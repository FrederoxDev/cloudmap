import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { auth } from "../firebase"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { userCredentials } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                navigate("/editor/")
            })
            .catch((e) => {
                if (e.code === "auth/wrong-password") setError("Wrong Password!")
                else if (e.code === "auth/user-not-found") setError("Email does not have an account")
                else setError(e.code)
                console.log(e)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (userCredentials === null) return;
        navigate("/editor/")
    }, [userCredentials, navigate])

    return (
        <div className="flex items-center h-full justify-evenly">
            <div className='w-full max-w-xs'>
                <div>
                    <h2 className='mb-3 text-4xl text-center font-bold'>Sign In</h2>

                    {error && <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    </div>}

                    <form className="form-control w-full max-w-xs" onSubmit={handleSubmit}>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input type="email" className='input input-bordered w-full max-w-xs' required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className='label'>
                            <span className='label-text'>Password</span>
                        </label>
                        <input type="password" className='input input-bordered w-full max-w-xs' required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="label">
                            <Link to="/forgot-password" className="label-text-alt link">Forgot Password?</Link>
                        </label>

                        <button className="btn w-full mt-3" type="submit" disabled={loading}>Sign In</button>
                    </form>
                </div>
                <div>
                    Need an account? <Link to="/signup" className='link link-primary'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;