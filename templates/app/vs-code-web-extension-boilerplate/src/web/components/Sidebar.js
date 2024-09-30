import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../reducers/AuthReducer';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async (event) => {
        event.preventDefault(); 
        console.log("Logging out...");
        try {
            dispatch(AuthActions.logout());
            navigate('/');
        } catch (error) {
            console.log("Error", error)
        }
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-white shadow-lg">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">Create MERN App</h2>
            </div>
            <nav className="flex-grow mt-6">
                <Link to="/" className={`flex items-center px-6 py-3 ${location.pathname === '/' ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}>
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-600 text-lg">👤</span>
                    </div>
                    Profile
                </Link>
                <Link to="/settings" className={`flex items-center px-6 py-3 ${location.pathname === '/settings' ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}>
                    <Shield className="w-6 h-6 mr-3 text-gray-400" />
                    Settings
                </Link>
            </nav>
            <div className="flex flex-col p-6 mt-auto">
                <div 
                    className={`flex items-center px-6 py-3 rounded-md cursor-pointer text-gray-700 hover:bg-gray-100`}
                    onClick={handleLogout}
                >
                    <LogOut className="w-6 h-6 mr-3 text-gray-400" />
                    Logout
                </div>
                <p className="text-xs text-gray-500 mt-4">Create MERN App</p>
            </div>
        </div>
    );
};

export default Sidebar;
