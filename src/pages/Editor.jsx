import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Editor = () => {
    const { id } = useParams();
    // eslint-disable-next-line
    const [mindmap, setMindmap] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        setError("")

        getDoc(doc(db, "mindmaps", id)).then((snapshot) => {
            setMindmap(snapshot.data())
        }).catch(err => {
            setError(err.code)
        }).finally(() => {
            setLoading(false)
        })

        console.log("Fetching doc")
    }, [id])

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
            <canvas></canvas>
        </>
    )
}

export default Editor;