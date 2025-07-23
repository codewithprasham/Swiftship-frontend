import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ordersBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Orders',
            data: [400, 300, 500, 200, 650],
            backgroundColor: '#3b82f6',
            borderRadius: 8,
        },
    ],
};

const usersBarData = {
    labels: ['Customers', 'Admins'],
    datasets: [
        {
            label: 'Users',
            data: [700, 50],
            backgroundColor: ['#22c55e', '#a855f7'],
            borderRadius: 6,
        },
    ],
};

const inventoryPieData = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
        {
            data: [400, 100],
            backgroundColor: ['#0ea5e9', '#facc15'],
            borderWidth: 1,
        },
    ],
};

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orders Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
                <div className="h-[300px]">
                    <Bar data={ordersBarData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Inventory Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
                <div className="h-[300px]">
                    <Pie data={inventoryPieData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>

            </div>

            {/* Users Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
                <div className="h-[300px]">
                    <Bar data={usersBarData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
