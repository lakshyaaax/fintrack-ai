import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ NEW

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // prevent double click

        setLoading(true); // ✅ start loading

        try {

            const response = await login({
                email,
                password,
            });

            // Save JWT Token
            localStorage.setItem(
                "access_token",
                response.access_token
            );

            // Save Logged-in User
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            toast.success("Welcome back! 👋");

            // Redirect to Dashboard
            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        } finally {
            setLoading(false); // ✅ stop loading
        }
    };

    return (
        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h1>FinTrack AI 💰</h1>

                <h3>Welcome Back 👋</h3>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading} // ✅ disable button
                >
                    {loading ? "Logging in..." : "Login"} {/* ✅ dynamic text */}
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;