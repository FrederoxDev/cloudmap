import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Cloudmap 🌤️</h1>
                        <p className="py-6">A small web-app for making digital mindmaps. Free forever.</p>
                        <Link to="/editor"><button className="btn btn-primary">Open Editor</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;