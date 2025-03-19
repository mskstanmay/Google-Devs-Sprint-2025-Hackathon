import "./App.css";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function convertMarkdownToHtml(markdown) {
  if (!markdown) return "";
  return markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

function MainContent() {
  const [formData, setFormData] = useState({
    category: "default",
    description: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult({
        analysis: data.analysis,
        scores: {
          supplyChain: data.scores[0],
          manufacturing: data.scores[1],
        },
        loading: false,
      });
    } catch (error) {
      console.error("Error:", error);
      setResult({
        analysis: "Error analyzing product. Please try again.",
        scores: { supplyChain: 0, manufacturing: 0 },
        loading: false,
      });
    }
  };

  const resetPage = () => {
    setFormData({
      category: "default",
      description: "",
    });
    setResult(null);
  };

  const getAverageScore = () => {
    if (!result) return 0;
    return (
      Math.round(
        Number(result.scores.supplyChain) + Number(result.scores.manufacturing)
      ) / 2
    );
  };

  const navigate = useNavigate();

  return (
    <div style={{ overflow: "hidden" }}>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <i className="fas fa-leaf text-green-500 text-2xl"></i>
            <span>EcoAnalytics</span>
          </div>
          <nav className="header-nav">
            <a
              className="navbar-button"
              onClick={(e) => {
                e.preventDefault();
                resetPage();
              }}
            >
              Home
            </a>
            <a
              className="navbar-button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contactus");
              }}
            >
              Contact Us
            </a>
          </nav>
          <div className="header-actions">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

    
      <div className="App" style={{ marginTop: "10px", width: "100%" }}>
        <h1 className="title" style={{ marginBottom: "20px" }}>
          Wanna find out how harmful your product is?
        </h1>
        {!result && (
          <form onSubmit={handleSubmit}>
            <div
              className="form-row"
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <div>
                <label htmlFor="category">Choose a category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothes">Clothes</option>
                  <option value="food">Food</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="household">Household Items</option>
                  <option value="automotive">Automotive Products</option>
                  <option value="toys">Toys & Children's Products</option>
                  <option value="medicines">Medicines & Health Products</option>
                  <option value="plastic">Plastic Goods</option>
                  <option value="cleaning">Cleaning & Detergents</option>
                  <option value="packaging">Packaging Materials</option>
                  <option value="stationery">
                    Stationery & Office Supplies
                  </option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
              <div>
                <label htmlFor="description">Description Of Product: </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                style={{
                  backgroundColor: "#FF8C00",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  height: "fit-content",
                  cursor: "pointer",
                }}
              >
                Find Out!
              </button>
            </div>
          </form>
        )}
        {result && (
          <div className="result-container">
            <div className="charts-column">
              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    datasets: [
                      {
                        data: [getAverageScore(), 100 - getAverageScore()],
                        backgroundColor: ["#FF8C00", "#FFE5B4"],
                        circumference: 180,
                        rotation: 270,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                    cutout: "75%",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <h3>{getAverageScore()}%</h3>
                  <p>Overall Environmental Impact</p>
                </div>
              </div>
              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    datasets: [
                      {
                        data: [
                          result.scores.supplyChain,
                          100 - result.scores.supplyChain,
                        ],
                        backgroundColor: ["#FF8C00", "#FFE5B4"],
                        circumference: 180,
                        rotation: 270,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                    cutout: "75%",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <h3>{Math.round(result.scores.supplyChain)}%</h3>
                  <p>Environmental impact by supply chain score</p>
                </div>
              </div>

              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    datasets: [
                      {
                        data: [
                          result.scores.manufacturing,
                          100 - result.scores.manufacturing,
                        ],
                        backgroundColor: ["#FF8C00", "#FFE5B4"],
                        circumference: 180,
                        rotation: 270,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false },
                    },
                    cutout: "75%",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <h3>{Math.round(result.scores.manufacturing)}%</h3>
                  <p>Environmental impact by manufacturing process score</p>
                </div>
              </div>
            </div>
            <div className="analysis-column">
              <h2>Environmental Assessment</h2>
              <div
                className="analysis-content"
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHtml(result.analysis),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactUs() {
  const navigate = useNavigate();
  const resetPage = () => {};

  return (
    <div style={{ overflow: "hidden" }}>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <i className="fas fa-leaf text-green-500 text-2xl"></i>
            <span>EcoAnalytics</span>
          </div>
          <nav className="header-nav">
            <a
              className="navbar-button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </a>
            <a
              className="navbar-button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contactus");
              }}
            >
              Contact Us
            </a>
          </nav>
          <div className="header-actions">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div className="hero-section" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1536147210925-5cb7a7a4f9fe?ixlib=rb-4.0.3")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}></div>
        <div style={{ position: 'relative', padding: '0 20px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Talk to a Human</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            You're not going to hit a ridiculously long phone menu when you call us. 
            Your email isn't going to the inbox abyss, never to be seen or heard from again. 
            At Choice Screening, we provide the exceptional service we'd want to experience ourselves!
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <h2 style={{ color: '#FF8C00', marginBottom: '20px' }}>Contact Information</h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Email:</strong><br />
            support@ecoanalytics.com
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Phone:</strong><br />
            (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong><br />
            123 Eco Street<br />
            Green City, EC 12345
          </p>
        </div>
        <div>
          <h2 style={{ color: '#FF8C00', marginBottom: '20px' }}>Business Hours</h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>Monday - Friday:</strong><br />
            9:00 AM - 6:00 PM EST
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Saturday:</strong><br />
            10:00 AM - 4:00 PM EST
          </p>
          <p>
            <strong>Sunday:</strong><br />
            Closed
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
