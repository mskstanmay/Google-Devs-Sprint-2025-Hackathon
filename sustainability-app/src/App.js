import './App.css';
import { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function convertMarkdownToHtml(markdown) {
  if (!markdown) return '';
  return markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

function MainContent() {
  const [formData, setFormData] = useState({
    category: 'default',
    description: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/analyze-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult({
        analysis: data.analysis,
        scores: {
          supplyChain: data.scores[0],
          manufacturing: data.scores[1]
        },
        loading: false
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        analysis: 'Error analyzing product. Please try again.',
        scores: { supplyChain: 0, manufacturing: 0 },
        loading: false
      });
    }
  };

  const resetPage = () => {
    setFormData({
      category: 'default',
      description: ''
    });
    setResult(null);
  };

  const getAverageScore = () => {
    if (!result) return 0;
    return (Math.round(Number(result.scores.supplyChain) + Number(result.scores.manufacturing)) / 2);
  };

  const navigate = useNavigate();

  return (
    <div style={{ overflow: 'hidden' }}>
      <nav className="navbar" style={{ padding: '0 20px' }}>
        <Link to="/" className="navbar-brand">ESP</Link>
        <div>
          <button className="navbar-button" onClick={resetPage}>Home</button>
          <button className="navbar-button" onClick={() => navigate('/contactus')}>Contact us</button>
        </div>
      </nav>
      <div className="App" style={{ marginTop: '10px', width: '100%' }}>
        <h1 className="title" style={{ marginBottom: '20px' }}>Wanna find out how harmful your product is?</h1>
        {!result && (
          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
  <option value="stationery">Stationery & Office Supplies</option>
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
                  backgroundColor: '#FF8C00',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  height: 'fit-content',
                  cursor: 'pointer'
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
                    datasets: [{
                      data: [getAverageScore(), 100 - getAverageScore()],
                      backgroundColor: ['#FF8C00', '#FFE5B4'],
                      circumference: 180,
                      rotation: 270,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false }
                    },
                    cutout: '75%'
                  }}
                />
                <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <h3>{getAverageScore()}%</h3>
                  <p>Overall Environmental Impact</p>
                </div>
              </div>
              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    datasets: [{
                      data: [result.scores.supplyChain, 100 - result.scores.supplyChain],
                      backgroundColor: ['#FF8C00', '#FFE5B4'],
                      circumference: 180,
                      rotation: 270,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false }
                    },
                    cutout: '75%'
                  }}
                />
                <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}>
                  <h3>{Math.round(result.scores.supplyChain)}%</h3>
                  <p>Environmental impact by supply chain score</p>
                </div>
              </div>
              
              <div className="chart-wrapper">
                <Doughnut
                  data={{
                    datasets: [{
                      data: [result.scores.manufacturing, 100 - result.scores.manufacturing],
                      backgroundColor: ['#FF8C00', '#FFE5B4'],
                      circumference: 180,
                      rotation: 270,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: false }
                    },
                    cutout: '75%'
                  }}
                />
                <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}>
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
                  __html: convertMarkdownToHtml(result.analysis) 
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
  
  return (
    <div style={{ overflow: 'hidden' }}>
      <nav className="navbar" style={{ padding: '0 20px' }}>
        <Link to="/" className="navbar-brand">ESP</Link>
        <div>
          <button className="navbar-button" onClick={() => navigate('/')}>Home</button>
          <button className="navbar-button" onClick={() => navigate('/contactus')}>Contact us</button>
        </div>
      </nav>
      <div className="App" style={{ marginTop: '10px', width: '100%' }}>
        <h1 className="title">Contact Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <i className="fas fa-leaf text-green-500 text-2xl"></i>
          <span>EcoAnalytics</span>
        </div>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
          <a href="#">My Impact</a>
        </nav>
        <div className="header-actions">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;