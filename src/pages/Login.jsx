import NProgress from "nprogress";
import pb from "../utils/pocketbase";
import { Mail, Lock, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        if (pb.authStore.isValid) {
            navigate("/dashboard")
        }
    }, [dummy])

    async function login(data) {
        NProgress.start()
        setLoading(true)
        toast.loading("Signing you in", { id: "login" });
        try {
            await pb.collection("_superusers").authWithPassword(data.email, data.password);

            toast.success("Authenticating " + data.email, { id: "login" });
        } catch (err) {
            toast.error("Access Denied", { id: "login" });
        } finally {
            setLoading(false)
            reset();
            setDummy(Math.random());
            NProgress.done()
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-700">Car Rental Dashboard</h2>
                <p className="mb-6 text-center text-gray-500">Sign in to manage rentals</p>

                <form onSubmit={handleSubmit(login)}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Email</label>
                        <div className="flex items-center px-4 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <Mail className="mr-2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full focus:outline-none"
                                disabled={loading}
                                {...register("email")}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Password</label>
                        <div className="flex items-center px-4 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <Lock className="mr-2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full focus:outline-none"
                                disabled={loading}
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <label></label>
                        <Link to="/forget-password" className="text-blue-500 hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? <div className="flex items-center justify-center"><Loader id="spin" /></div> : "Sign In"}

                    </button>
                </form>
            </div>
        </div>
    );
}
