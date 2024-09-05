import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar";
import Navbar from "./Navbar";
import { Blocks } from "react-loader-spinner";
import Footer from "./Footer";
import { Pie } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { getAllPerson, getUser } from '../Redux/actions';
import GaugeChart from 'react-gauge-chart';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

export default function Accueil() {
    const persons = useSelector(state => state.peopleReducer.persons);
    const { user, clearUser } = useUserContext(); // Access context
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 0-based index

    useEffect(() => {
        if (!user) {
            navigate('/'); // Redirect if not logged in
            return;
        }

        const fetchData = async () => {
            try {
                const personResponse = await fetch('https://mayedo.onrender.com/persons');
                const userResponse = await fetch(`https://mayedo.onrender.com/users/${user?.id}`);

                const personData = await personResponse.json();
                const userData = await userResponse.json();

                dispatch(getAllPerson(personData));
                dispatch(getUser(userData));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, dispatch, navigate]);

    // Filter persons to include only those belonging to the logged-in user
    const userPersons = persons.filter(person => person.user_id === user?.id);

    // Prepare data for the Pie Chart
    const rentalData = {}; // This will hold the rental counts for each tenant

    userPersons.forEach(person => {
        person.rentals.forEach(rental => {
            const month = rental.month;
            const monthYear = month.split('-');
            const rentalYear = parseInt(monthYear[0]);
            const rentalMonth = parseInt(monthYear[1]);

            if (rentalYear === selectedYear && rentalMonth === selectedMonth) {
                rentalData[person.name] = (rentalData[person.name] || 0) + 1; // Count rentals per tenant
            }
        });
    });

    // Prepare data for Pie Chart
    const pieData = {
        labels: Object.keys(rentalData), // Tenant names
        datasets: [{
            data: Object.values(rentalData), // Rental counts
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
        }],
    };

    // Gauge Chart Value
    const totalRentals = Object.values(rentalData).reduce((a, b) => a + b, 0);
    const gaugeValue = totalRentals > 0 ? totalRentals / userPersons.length : 0; // Normalized value for gauge

    // Generate a list of years and months for selection
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    const months = Array.from({ length: 12 }, (_, index) => {
        return { name: new Date(0, index).toLocaleString('default', { month: 'long' }), value: index + 1 };
    });

    return (
        <div>
            <Navbar />
            <div className="containers">
                <div className="dashboard">
                    <div className="left">
                        <Sidebar />
                    </div>
                    {loading ? (
                        <Blocks
                            visible={true}
                            height="80"
                            width="100%"
                            ariaLabel="blocks-loading"
                            wrapperClass="blocks-wrapper"
                        />
                    ) : (
                        <div className="right">
                            <div className="firstly">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <i className="fa-solid fa-house"></i> Tableau de bord
                                        </li>
                                    </ol>
                                </nav>

                                <div className="container--block--document">
                                    <div className="cards">
                                        <div className="cards--header">
                                            <h4>Locataires</h4>
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <h5>{userPersons.length}</h5> {/* Display the number of tenants for the logged-in user */}
                                    </div>
                                    <div className="cards">
                                        <div className="cards--header">
                                            <h4>Locations</h4>
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <h5>{totalRentals}</h5> {/* Display total rentals */}
                                    </div>
                                    <div className="cards">
                                        <div className="cards--header">
                                            <h4>Loyers</h4>
                                            <i className="fa-solid fa-address-book"></i>
                                        </div>
                                        <h5>{userPersons.reduce((sum, person) => sum + person.rentals.reduce((rSum, rent) => rSum + rent.price, 0), 0)} FCFA</h5>
                                    </div>
                                </div>
                                 {/* <div>
                                    <iframe src="https://charts.mongodb.com/charts-dash--mayedo-fcask/embed/dashboards?id=6536fd1a-20dc-47f9-8caa-16eb09af50e6&theme=light&autoRefresh=true&maxDataAge=300&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
                                    </div> */}

                                {/* Year and Month Filters */}
                                <div className="filters--year--month">
                                    <select className="selectedDate" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                    <select className="selectedDate" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                                        {months.map(month => (
                                            <option key={month.value} value={month.value}>{month.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Pie Chart */}
                                <div className="chart-container">
                                    <div className="chart-container-left">
                                        <h4>Répartition des locations par locataire (Pie Chart)</h4>
                                        <div className="container__piechart">
                                            {Object.keys(rentalData).length > 0 ? (
                                                <Pie data={pieData} />
                                            ) : (
                                                <p>Aucune location disponible pour ce mois/année.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="chart-container-right">
                                        <h4>Graphe de jauge des locations</h4>
                                        <GaugeChart id="gauge-chart" 
                                            nrOfLevels={20} 
                                            percent={gaugeValue} 
                                            colors={['#FF5F6D', '#FFC371']} 
                                            arcWidth={0.3} 
                                            needleColor="#345243" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}