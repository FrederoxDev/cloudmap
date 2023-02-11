import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("")

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setLoading(false)
            setMessage(`Please check your inbox for further instructions.`)
        })
        .catch((e) => {
            if (e.code === "auth/user-not-found") setError(email + " is not associated with an account!")
            else setError(e.code)
            setMessage("")
            setLoading(false)
        })
    }

    return (
        <div className="flex items-center h-full justify-evenly">
            <div className='w-full max-w-xs'>
                <div>
                    <h2 className='mb-3 text-4xl text-center font-bold'>Reset Password</h2>

                    {error && <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    </div>}

                    {message && <div className="alert alert-success shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{message}</span>
                        </div>
                    </div>}

                    <form className="form-control w-full max-w-xs" onSubmit={handleSubmit}>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input type="email" className='input input-bordered w-full max-w-xs' required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="btn w-full mt-3" type="submit" disabled={loading}>Send Password Reset</button>
                    </form>
                </div>
                <div>
                    Remember your password? <Link to="/signin" className='link link-primary'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword