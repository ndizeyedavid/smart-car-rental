import { Loader, X } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import pb from '../utils/pocketbase';

export default function NewCar({ setIsModalOpen, setDummy }) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)


    const handleClose = (e) => {
        if (e.target.id == "modal") {
            setIsModalOpen(false);
        }
    }

    async function addCar(data) {
        setLoading(true);
        toast.loading("Adding new car", { id: "add" });
        try {
            await pb.collection("cars").create({
                car_model: data.car_model,
                car_brand: data.car_brand,
                plate_number: data.plate_number,
                car_image: data.car_image[0]
            });
            toast.success(data.car_model + " added successfully", { id: "add" });
        } catch (err) {
            toast.error("Failed to add product", { id: "add" });
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
                    <h3 className="text-xl font-bold">Add New Car</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit(addCar)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Car Model</label>
                        <input
                            type="text"
                            name="model"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("car_model")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Car Brand</label>
                        <input
                            type="text"
                            name="brand"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("car_brand")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                        <input
                            type="text"
                            name="plate_number"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("plate_number")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Car Image</label>
                        <input
                            type="file"
                            name="image"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            accept='images/*'
                            {...register("car_image")}
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
                            : "Add Car"}
                    </button>
                </form>
            </div>
        </div>
    )
}
