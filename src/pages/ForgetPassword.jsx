import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ForgetPassword() {

    const { register, handleSubmit, reset } = useForm();

    async function resetPswd() {

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-700">Forget Password</h2>
                <p className="mb-6 text-center text-gray-500">Use your email to reset the password</p>

                <form onSubmit={handleSubmit(resetPswd)}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Email</label>
                        <div className="flex items-center px-4 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <Mail className="mr-2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full focus:outline-none"
                                {...register("email")}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Send recovery code
                    </button>
                </form>
            </div>
        </div>
    );
}
