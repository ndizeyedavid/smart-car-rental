import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav';
import Sidebar from '../components/Sidebar';
import { PlusCircle } from 'lucide-react';
import NewCar from '../components/NewCar';
import pb from '../utils/pocketbase';
import Empty from "../components/Empty";

function Cars() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        async function fetch_cars() {
            const results = await pb.collection("cars").getFullList();

            setCars(results);
        }

        fetch_cars()
    }, [dummy])


    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {/* Top Navigation */}
                <TopNav />

                {/* Dashboard Content */}
                <main className="p-8 overflow-auto h-[calc(100vh-4rem)]">
                    {/* Table view of all cars */}
                    <div className="p-4 bg-white rounded-lg shadow-md">

                        <div className='flex items-center justify-between mb-5'>
                            <h2 className="mb-4 text-xl font-bold">Available Cars</h2>
                            <button onClick={() => setIsModalOpen(true)} className='flex items-center gap-2 px-3 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700'> <PlusCircle /> New Car</button>
                        </div>

                        {cars.length === 0 ?
                            <Empty title="No Cars recorded" text="You haven't recored any car yet, try adding one form the 'New Car' button" />
                            :
                            <table className="w-full border border-collapse border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-300">Preview</th>
                                        <th className="px-4 py-2 border border-gray-300">Model</th>
                                        <th className="px-4 py-2 border border-gray-300">Brand</th>
                                        <th className="px-4 py-2 border border-gray-300">Plate Number</th>
                                        <th className="px-4 py-2 border border-gray-300">Added Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map((car, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="px-3 py-2 border border-gray-300">
                                                <img src={pb.files.getURL(car, car.car_image)} alt={car.car_model} className="object-cover w-16 h-16 mx-auto rounded" />
                                            </td>
                                            <td className="px-3 py-2 border border-gray-300">{car.car_model}</td>
                                            <td className="px-3 py-2 border border-gray-300">{car.car_brand}</td>
                                            <td className="px-3 py-2 border border-gray-300">{car.plate_number}</td>
                                            <td className="px-3 py-2 border border-gray-300">{new Date(car.created).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </main>
            </div>
            {isModalOpen && <NewCar setIsModalOpen={setIsModalOpen} setDummy={setDummy} />}
        </div>
    );
}

export default Cars;
