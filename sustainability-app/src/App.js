import './App.css';
import { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

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

function App() {
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
        loading: false
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        analysis: 'Error analyzing product. Please try again.',
        loading: false
      });
    }
  };

  const parseScores = (analysis) => {
    const scores = analysis.split(',').slice(0, 2);
    return {
      supplyChain: parseInt(scores[0], 10),
      manufacturing: parseInt(scores[1], 10)
    };
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <nav className="navbar" style={{ padding: '0 20px' }}>
        <a href="/" className="navbar-brand">ESP</a>
        <div>
          <button className="navbar-button">Home</button>
          <button className="navbar-button">Contact us</button>
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
                  <option value="default" disabled>Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothes">Clothes</option>
                  <option value="food">Food</option>
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
                <PieChart
                  data={[
                    {
                      value: parseScores(result.analysis).supplyChain,
                      color: '#FF8C00'
                    },
                    {
                      value: 100 - parseScores(result.analysis).supplyChain,
                      color: '#FFE5B4'
                    }
                  ]}
                  label={({ dataEntry }) => dataEntry.value + '%'}
                  labelStyle={{ fontSize: '5px' }}
                />
                <p>Environmental impact by supply chain score</p>
              </div>
              <div className="chart-wrapper">
                <PieChart
                  data={[
                    {
                      value: parseScores(result.analysis).manufacturing,
                      color: '#FF8C00'
                    },
                    {
                      value: 100 - parseScores(result.analysis).manufacturing,
                      color: '#FFE5B4'
                    }
                  ]}
                  label={({ dataEntry }) => dataEntry.value + '%'}
                  labelStyle={{ fontSize: '5px' }}
                />
                <p>Environmental impact by manufacturing process score</p>
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

export default App;