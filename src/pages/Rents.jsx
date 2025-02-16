import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import { Search, Filter, Calendar, Edit, Eye, MoreHorizontal, Delete, Trash2 } from 'lucide-react'
import pb from '../utils/pocketbase'
import NewRent from '../components/NewRent'
import toast from 'react-hot-toast'
import Empty from '../components/Empty'

function Rents() {
    const [searchTerm, setSearchTerm] = useState('')
    const [rentals, setRentals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        async function fetch_rentals() {
            const results = await pb.collection("rents").getFullList({
                expand: "customer_id,car_id"
            })

            setRentals(results);
        }

        fetch_rentals()
    }, [dummy]);


    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            returned: 'bg-green-100 text-green-800',
            overDate: 'bg-red-100 text-red-800'
        }
        return `px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`
    }

    async function handleDelete(id) {
        if (confirm("Are you sure you want to delete this rental?\nThis action is irreversable")) {

            try {
                toast.loading("Removing car rental", { id: "delete" });
                await pb.collection("rents").delete(id);
                toast.success("Rental removed successfully", { id: "delete" })
            } catch (err) {
                toast.error("Unable to remove rental", { id: "delete" });
            } finally {
                setDummy(Math.random());
            }


        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                <TopNav />

                <main className="p-8 overflow-auto h-[calc(100vh-4rem)]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Rental Management</h1>
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Create New Rental
                        </button>
                    </div>

                    {/* Filters and Search */}
                    <div className="flex gap-4 mb-6 ">
                        <div className="relative w-[75%]">
                            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="Search rentals..."
                                className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                <Calendar size={16} />
                                Date Range
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                <Filter size={16} />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Rentals Table */}
                    <div className="overflow-hidden bg-white rounded-lg shadow">

                        {rentals.length === 0 ?
                            <Empty title="No Cars rented yet" text="Trying adding a new rent by the 'New rental' button" />

                            :

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Rental ID</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Car</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Period</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rentals.map((rental) => (
                                        <tr key={rental.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap"># {rental.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={pb.files.getURL(rental.expand.customer_id, rental.expand.customer_id.avatar)} className='w-[100px] h-[100px] object-cover rounded-md shadow-md' />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={pb.files.getURL(rental.expand.car_id, rental.expand.car_id.car_image)} className='w-[100px] h-[100px] object-cover rounded-md shadow-md' />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm">
                                                    <div>{rental.startDate}</div>
                                                    <div className="text-gray-500">To {new Date(rental.return_date).toDateString()}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getStatusBadge(rental.returned ? "returned" : "pending")}>
                                                    {rental.returned ? "Returned" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{rental.price.toLocaleString()} RWF</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => handleDelete(rental.id)} className="text-red-600 hover:text-red-800">
                                                        <Trash2 size={30} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }

                    </div>
                </main>
            </div>
            {isModalOpen && <NewRent setDummy={setDummy} setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}

export default Rents
