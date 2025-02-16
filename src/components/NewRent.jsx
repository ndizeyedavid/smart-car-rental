import { Loader, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import pb from '../utils/pocketbase';

export default function NewRent({ setIsModalOpen, setDummy }) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)
    const [customers, setCustomers] = useState([]);
    const [cars, setCars] = useState([]);

    const handleClose = (e) => {
        if (e.target.id == "modal") {
            setIsModalOpen(false);
        }
    }

    async function addRent(data) {
        toast.loading("Registering a new rental", { id: "add" });
        setLoading(true);

        try {
            await pb.collection("rents").create(data)

            toast.success("Car rented successfully", { id: "add" });
        } catch (err) {
            toast.error("Failed to register rented car", { id: "add" });
        } finally {
            setDummy(Math.random());
            setLoading(false);
            setIsModalOpen(false);
        }
    }

    useEffect(() => {
        async function fetch_rents() {
            const fetch_customers = await pb.collection("customers").getFullList();
            const fetch_cars = await pb.collection("cars").getFullList();


            setCustomers(fetch_customers);
            setCars(fetch_cars);
        }

        fetch_rents()
    }, [setDummy]);

    return (
        <div id="modal" onClick={(e) => handleClose(e)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Register Car Rent</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit(addRent)} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer</label>
                        {/* <input type="text" {...register("customer_id")} /> */}
                        <select
                            name="customer"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("customer_id")}

                        >
                            <option>- Select customer -</option>
                            {customers.map((data, index) => (
                                <option key={index} value={data.id}>{data.user_name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Car</label>
                        {/* <input type="text" {...register("customer_id")} /> */}

                        <select
                            name="car"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                            {...register("car_id")}

                        >
                            <option>- Select car -</option>

                            {cars.map((data, index) => (
                                <option key={index} value={data.id}>{data.car_model + "(" + data.plate_number + ")"}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Return Date</label>
                        <input
                            type="date"
                            name="return_date"
                            required
                            disabled={loading}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("return_date")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center w-full gap-2"><Loader size={30} id="spin" /> Loading</span>
                        )
                            : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}
