import { Link } from "react-router-dom"
import { signOut, getAuth } from "firebase/auth"
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

const Navbar = () => {
    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div className="navbar bg-base-100 border-b border-b-base-200">
            <div className="flex-1">
                <p className="normal-case text-xl font-bold">Cloudmap 🌤️</p>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="editor">Files</Link></li>
                    <li>
                        <select data-choose-theme className="select select-bordered">
                            <option disabled value="">Theme</option>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </li>
                    <li tabIndex={0}>
                        <p>
                            Account
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </p>
                        <ul className="p-2 bg-base-100">
                            <li><p onClick={() => signOut(getAuth())}>Sign Out</p></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar