import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/UserContext";

const NewFile = () => {
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { userCredentials } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        const docRef = await addDoc(collection(db, "mindmaps"), {
            name: fileName,
            uid: userCredentials.uid,
            timestamp: new Date()
        }).catch((e) => {
            setError(e.code)
            return;
        })

        setLoading(false);
        navigate(`/editor/${docRef.id}`);
    }

    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my-modal-3" className="btn">New File</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <form className="form-control w-full" onSubmit={handleSubmit}>
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">New File</h3>
                        {error !== "" && <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        </div>}
                        <label className='label mt-5'>
                            <span className='label-text'>File Name</span>
                        </label>
                        <input type="text" className='input input-bordered w-full' required
                            value={fileName} onChange={(e) => setFileName(e.target.value)}
                        />

                        <button className="btn w-full mt-3" type="submit" disabled={loading}>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewFile;