import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">

            <h2>💰 FinTrack AI</h2>

            <nav>

                <Link to="/dashboard">
                    📊 Dashboard
                </Link>

                <Link to="/transactions">
                    💳 Transactions
                </Link>

                <Link to="/analytics">
                    📈 Analytics
                </Link>

                <Link to="/settings">
                    ⚙️ Settings
                </Link>

            </nav>

        </div>
    );
}

export default Sidebar;