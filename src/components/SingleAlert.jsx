
export default function SingleAlert({ title, description, time, priority }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-4">
                <div
                    className={`w-3 h-3 rounded-full ${priority === 'High'
                        ? 'bg-red-500'
                        : priority === 'Medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                ></div>
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <span className="text-sm text-gray-400">{new Date(time).toLocaleString()}</span>
        </div>
    )
}
