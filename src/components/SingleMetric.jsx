import React from 'react'

export default function SingleMetric({ icon, title, value }) {
    return (
        <div
            className="p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{icon}</span>
                {/* <span
                    className={`text-sm ${metric.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}
                >
                    {metric.change}
                </span> */}
            </div>
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
    )
}
