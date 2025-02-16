import { useState } from "react";
import { NavLink } from "react-router-dom";
import IsLoggedIn from "../utils/sessionVerifier";
import { CarFront, KeySquare, LayoutDashboard, Logs, User, LucideIndentDecrease, LucideIndentIncrease, Settings2 } from "lucide-react";

export default function Sidebar() {

    IsLoggedIn()

    const [sidebarOpen, setSidebarOpen] = useState(true);

    // ['Dashboard', 'Cars', 'Customers', "Rentals", 'Logs', 'Settings']
    const links = [
        {
            text: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard />
        },
        {
            text: "Customers",
            path: "/customers",
            icon: <User />
        },
        {
            text: "Cars",
            path: "/cars",
            icon: <CarFront />
        },
        {
            text: "Rentals",
            path: "/rentals",
            icon: <KeySquare />
        },
        {
            text: "Logs",
            path: "/logs",
            icon: <Logs />
        },
        {
            text: "Settings",
            path: "/settings",
            icon: <Settings2 />
        }
    ]

    return (
        <div
            className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}
        >
            <div className="flex items-center justify-between p-4">
                <h1
                    className={`${sidebarOpen ? 'block' : 'hidden'} text-xl font-bold text-indigo-600`}
                >
                    Smart&nbsp;Car&nbsp;Rental
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {sidebarOpen ? <LucideIndentDecrease size={30} /> : <LucideIndentIncrease size={30} />}
                </button>
            </div>
            <nav className="mt-8">
                {links.map(
                    (item, index) => (
                        < NavLink
                            to={item.path}
                            key={index}
                            className={`w-full p-4 flex items-center text-gray-600 text-[17px] font-medium hover:bg-indigo-50 transition-colors`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>
                                {item.text}
                            </span>
                        </NavLink>
                    ),
                )}
            </nav>
        </div >
    )
}
