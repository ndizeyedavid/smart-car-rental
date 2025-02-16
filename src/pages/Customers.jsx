import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import { Edit, Filter, Search, Trash2 } from 'lucide-react'
import pb from '../utils/pocketbase'
import Empty from '../components/Empty'
import NewCustomer from '../components/NewCustomer'

function Customers() {

    const [searchTerm, setSearchTerm] = useState('')
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        async function fetch_customers() {
            const results = await pb.collection("customers").getFullList();

            setCustomers(results);
        }

        fetch_customers();
    }, [dummy])

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                <TopNav />
                <main className="p-8 overflow-auto h-[calc(100vh-4rem)]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Add New Customer
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <Filter />
                            Filter
                        </button>
                    </div>

                    {/* Customers Table */}
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                        {customers.length === 0 ?
                            <Empty title="No Customers recorded" text="You haven't recored any customer yet, try adding one from the 'Add New Customer' button" />
                            :
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"></th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Added Date</th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.map(customer => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={pb.files.getURL(customer, customer.avatar)} alt={customer.user_name} width={60} height={60} className='w-[60px] h-[60px] rounded-full shadow-md' />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.user_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.created}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="mr-3 text-blue-600 hover:text-blue-800"><Edit /></button>
                                                <button className="text-red-600 hover:text-red-800"><Trash2 /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </main>
            </div>
            {isModalOpen && <NewCustomer setDummy={setDummy} setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}

export default Customers
