import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../services/authService";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        // ✅ Password check
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            const response = await register({
                name,
                email,
                password,
            });

            toast.success("Account created successfully 🎉");

            // 👉 Redirect to login
            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h1>FinTrack AI 💰</h1>

                <h3>Create Account 🚀</h3>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;