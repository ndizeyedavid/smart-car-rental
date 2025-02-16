import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert';
import pb from '../utils/pocketbase';
import Empty from '../components/Empty';

function Logs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function fetch_logs() {
            const results = await pb.collection("logs").getFullList();

            setLogs(results);
        }

        fetch_logs();
    }, [])

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <TopNav />

                {/* Dashboard Content */}
                <main className="p-8 overflow-auto h-[calc(100vh-4rem)]">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-6 text-2xl font-semibold">Rental Logs</h2>
                        {logs.length === 0 && <Empty title="Log box empty" text="There is no new event at the moment" />}
                        <div className="grid grid-rows-1 gap-2">
                            {logs.map((data, index) => (
                                <Alert key={index} level={data.priority} title={data.title} description={data.description} date={data.created} />
                            ))}

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Logs
