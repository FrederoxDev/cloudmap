import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"
import { useAuth } from '../contexts/UserContext';
import { collection, getDocs, where, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import NewFile from "../components/NewFile";
import DeleteIcon from "../svgs/delete";
import RenameIcon from "../svgs/rename";
import DownloadIcon from "../svgs/download";

const FileView = () => {
    const [docs, setDocs] = useState([]);
    const { userCredentials } = useAuth();

    useEffect(() => {
        const q = query(collection(db, "mindmaps"), where("uid", "==", userCredentials.uid))

        getDocs(q).then((querySnapshot) => {
            const docs = [];
            const sorted = querySnapshot.docs.sort((a, b) => b.data().timestamp - a.data().timestamp)

            sorted.forEach((doc) => {
                const relativeTime = new Date(doc.data().timestamp * 1000).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                docs.push({
                    id: doc.id,
                    name: doc.data().name,
                    relativeTime: relativeTime
                })
            });
            setDocs(docs);
        });
    }, [userCredentials.uid]);

    const deleteFile = (id) => {
        if (window.confirm("Are you sure? Cannot be undone!")) {
            deleteDoc(doc(db, "mindmaps", id))
            .then(() => {
                setDocs(docs.filter(doc => doc.id !== id))
            })
            .catch((e) => console.error(e))
        }
    }

    const renameFile = (id) => {
        const newName = window.prompt("New File Name")
        if (newName === null) return;

        var docsCopy = docs.map(doc => {
            if (doc.id === id) doc.name = newName; 
            return doc
        });
        setDocs(docsCopy)

        updateDoc(doc(db, "mindmaps", id), {name: newName})
    }

    return (
        <>
            <NewFile />
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map((doc, index) =>
                            <tr className="hover" key={doc.id}>
                                <td>{index}</td>
                                <td>
                                    <Link to={`/editor/${doc.id}`} className="link link-hover">{doc.name}</Link>
                                </td>
                                <td>{doc.relativeTime}</td>
                                <td>
                                    <div className="tooltip" data-tip="Delete">
                                        <button className="fill-base-content hover:fill-accent-focus mr-4" onClick={() => deleteFile(doc.id)}><DeleteIcon /></button>
                                    </div>
                                    <div className="tooltip" data-tip="Rename">
                                        <button className="fill-base-content hover:fill-accent-focus mr-4" onClick={() => renameFile(doc.id)}><RenameIcon /></button>
                                    </div>
                                    <div className="tooltip" data-tip="Download">
                                        <button className="fill-base-content hover:fill-accent-focus mr-4" onClick={() => console.log(doc.id)}><DownloadIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FileView;