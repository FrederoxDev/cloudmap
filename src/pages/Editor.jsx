import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { DocumentReference, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Editor = () => {
    const { id } = useParams();
    const docRef = doc(db, "mindmaps", id);
    const [mindmap, setMindmap] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        setError("")

        getDoc(docRef).then((snapshot) => {
            setMindmap(snapshot.data())
        }).catch(err => {
            setError(err.code)
        }).finally(() => {
            setLoading(false)
        })
    }, [doc])

    if (loading) return <p>Loading...</p>
    if (error) return (
        <div className="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
            </div>
        </div>
    )

    return (
        <>
            <div>{mindmap && <p>{JSON.stringify(mindmap)}</p>}</div>

            <div>
                <p><kbd className="kbd kbd-sm">ctrl + S</kbd> Save</p>
            </div>

            <Link to="/editor" className="link">Back to files</Link>
        </>
    )
}

export default Editor;