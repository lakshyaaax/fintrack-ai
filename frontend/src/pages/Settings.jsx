import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [currency, setCurrency] = useState("₹");

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="settings-page">

                    <div className="settings-card">

                        <h2>⚙ Settings</h2>

                        <div className="setting-item">

                            <div>

                                <h3>🌙 Dark Mode</h3>

                                <p>Switch between Light and Dark theme.</p>

                            </div>

                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />

                        </div>

                        <div className="setting-item">

                            <div>

                                <h3>🔔 Notifications</h3>

                                <p>Enable or disable app notifications.</p>

                            </div>

                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />

                        </div>

                        <div className="setting-item">

                            <div>

                                <h3>💱 Currency</h3>

                                <p>Select your preferred currency.</p>

                            </div>

                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="₹">₹ INR</option>
                                <option value="$">$ USD</option>
                                <option value="€">€ EUR</option>
                                <option value="£">£ GBP</option>
                            </select>

                        </div>

                        <div className="setting-item">

                            <div>

                                <h3>ℹ About</h3>

                                <p>
                                    FinTrack AI v1.0
                                    <br />
                                    Built using React + Flask + JWT
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Settings;