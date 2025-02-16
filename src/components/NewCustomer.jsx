import { Loader, X } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import pb from '../utils/pocketbase';

export default function NewCustomer({ setIsModalOpen, setDummy }) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)


    const handleClose = (e) => {
        if (e.target.id == "modal") {
            setIsModalOpen(false);
        }
    }

    async function addCustomer(data) {
        setLoading(true);
        toast.loading("Creating a new customer instanace", { id: "add" });
        try {
            await pb.collection("customers").create({
                user_name: data.user_name,
                email: data.email,
                phone: data.phone,
                password: "1234567",
                passwordConfirm: "1234567",
                avatar: data.avatar[0]
            });
            toast.success("New customer successfully", { id: "add" });
        } catch (err) {
            toast.error("Failed to add customer", { id: "add" });
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            setDummy(Math.random())
        }

    }

    return (
        <div id="modal" onClick={(e) => handleClose(e)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">New Customer Form</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit(addCustomer)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Names</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("user_name")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                        <input
                            type="text"
                            name="email"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("email")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("phone")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Profile Image</label>
                        <input
                            type="file"
                            name="avatar"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            accept='images/*'
                            {...register("avatar")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2"><Loader size={30} id="spin" /> Loading</span>
                        )
                            : "Add Customer"}
                    </button>
                </form>
            </div>
        </div>
    )
}
