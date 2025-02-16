import { LogOut } from "lucide-react";
import pb from "../utils/pocketbase";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
    const navigate = useNavigate();

    function logOut() {
        if (confirm("You are about to sign out"))
            pb.authStore.clear()
        navigate("/")
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="relative invisible">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <span className="absolute left-3 top-2.5">🔍</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
                            A
                        </div>
                        <span className="font-medium">Admin</span>
                    </div>
                    <button type="button" onClick={logOut} className="flex items-center gap-2 p-2 rounded-xl hover:bg-red-100">
                        <LogOut className="text-red-600" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}
