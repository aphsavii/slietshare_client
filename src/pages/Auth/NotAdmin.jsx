import  {useSelector} from 'react-redux'
import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
function NotAdmin() {
        const {isAuthenticated,user} = useSelector((state) => state.auth);
        const navigate = useNavigate();
        useEffect(() => {
            if (isAuthenticated && user?.role == "admin") {
                navigate('/');
            }  
        });
    return (
        <div className="text-center py-24 h-screen ">
            <h1 className="mb-4 text-6xl font-semibold text-primaryBlue">403</h1>
            <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're trying to access Admin things.</p>
            <div className="animate-bounce">
                <svg className="mx-auto h-16 w-16 text-primaryBlue my-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </div>
            <p className="mt-4 text-gray-600">Let's get you back <Link to="/" className="text-blue-500">home</Link>.</p>
        </div>
        )
}

export default NotAdmin