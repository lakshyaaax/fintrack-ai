import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="navbar">

            <h2>Welcome, {user?.name || "User"} 👋</h2>

            <div className="profile-menu">

                <button
                    className="profile-btn"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    👤 {user?.name || "User"} ▾
                </button>

                {showMenu && (

                    <div className="dropdown-menu">

                        <button
                            onClick={() => {

                                setShowMenu(false);

                                navigate("/profile");

                            }}
                        >
                            👤 My Profile
                        </button>

                        <button
                            onClick={() => {

                                setShowMenu(false);

                                navigate("/settings");

                            }}
                        >
                            ⚙ Settings
                        </button>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Navbar;