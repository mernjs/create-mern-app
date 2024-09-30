import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';

const Settings = () => {
    const user = useSelector((state) => state.auth?.user);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-grow p-10 bg-gray-50">
                <div className="bg-white shadow-md rounded-lg p-8">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
                        <button className="text-indigo-600 hover:text-indigo-800">Update profile</button>
                    </div>

                    <div className="flex items-center mb-6">
                        <img src={user?.image_url} alt={user?.first_name} className="w-16 h-16 rounded-full mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">{`${user?.first_name || ''} ${user?.last_name || ''}`}</h3>
                        </div>
                    </div>

                    <div className="space-y-6">
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
