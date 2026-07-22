import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <div className="dashboard-main">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;