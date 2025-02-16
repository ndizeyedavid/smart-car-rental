import React, { useEffect } from 'react'

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import SingleMetric from '../components/SingleMetric';
import SingleAlert from '../components/SingleAlert';
import pb from '../utils/pocketbase';
import { CarFront, KeyRound, TriangleAlert, Users2 } from 'lucide-react';
import Empty from '../components/Empty';

function Dashboard() {

    const [fetchedAnalytics, setFetchedAnalytics] = useState({});
    const [alerts, setAlerts] = useState([]);
    useEffect(() => {
        async function fetch_dashboard() {

            const fetch_cars = await pb.collection("cars").getFullList();
            const fetch_active_rents = await pb.collection("rents").getFullList({
                filter: "returned = false"
            });
            const fetch_customers = await pb.collection("customers").getFullList()
            const fetch_alerts = await pb.collection("logs").getFullList();
            const fetch_notif_alerts = await pb.collection("logs").getFullList({
                filter: "priority = 'High'"
            });

            setAlerts(fetch_notif_alerts);

            const analytics_obj = {
                cars: fetch_cars.length,
                rents: fetch_active_rents.length,
                customers: fetch_customers.length,
                alerts: fetch_alerts.length
            };

            setFetchedAnalytics(analytics_obj);
        }

        fetch_dashboard();
    }, []);

    const metrics = [
        { title: 'Total Cars', value: fetchedAnalytics.cars, change: '+12%', icon: <CarFront size={40} className='text-red-500' /> },
        { title: 'Active Rentals', value: fetchedAnalytics.rents, change: '+5%', icon: <KeyRound size={40} className='text-yellow-500' /> },
        { title: 'Customers', value: fetchedAnalytics.customers, change: '+8%', icon: <Users2 size={40} className='text-blue-500' /> },
        { title: 'Sensor Alerts', value: fetchedAnalytics.alerts, change: '-2%', icon: <TriangleAlert size={40} className='text-orange-500' /> },
    ];


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
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((metric) => (
                            <SingleMetric key={metric.title} title={metric.title} icon={metric.icon} value={metric.value} />
                        ))}
                    </div>

                    {/* Recent Alerts */}
                    <div className="p-6 bg-white shadow-sm rounded-xl">
                        <h2 className="mb-6 text-xl font-bold">Recent Sensor Alerts</h2>
                        <div className="space-y-4">
                            {alerts.length === 0 && <Empty title="No alerts at this moment" text="Wait for new alerts to be recorded" />}
                            {alerts.map((data, index) => (
                                <SingleAlert key={index} title={alert.title} description={data.description} time={data.created} priority={data.priority} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Dashboard
