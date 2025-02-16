import React, { useState } from 'react'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import pb from '../utils/pocketbase';
import { useNavigate } from 'react-router-dom';

function Settings() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    async function updatePassword(data) {
        setLoading(true);
        toast.loading("Updating password", { id: "update" });

        if (data.password === data.passwordConfirm) {

            try {
                await pb.collection("_superusers").update(pb.authStore.record.id, {
                    oldPassword: data.oldPassword,
                    password: data.password,
                    passwordConfirm: data.passwordConfirm,
                });

                toast.success("Password updated, Now login to confirm", { id: "update" })
                pb.authStore.clear();
                navigate("/")
            } catch (err) {
                toast.error("Failed to update password", { id: "update" });
            } finally {
                setLoading(false);
                reset();
            }
        } else {
            toast.error("Passwords don't match", { id: "update" })
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                <TopNav />
                <main className="p-8 overflow-auto h-[calc(100vh-4rem)]">
                    {/* Account Settings */}
                    <form onSubmit={handleSubmit(updatePassword)} className="max-w-4xl mx-auto space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

                        {/* Profile Section */}
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Password Settings</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Old Password</label>
                                    <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500" {...register("oldPassword")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500" {...register("password")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500" {...register("passwordConfirm")} />
                                </div>
                            </div>
                        </div>


                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button type='submit' disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Settings
