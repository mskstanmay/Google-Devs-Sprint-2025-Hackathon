import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    category: 'electronics',
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

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">ESP</a>
        <button className="navbar-button">Home</button>
      </nav>
      <div className="App">
        <h1 className="title">Describe Your Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
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
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            Find Environmental Impact
          </button>
        </form>
        {result && (
          <div className="result" style={{ marginTop: '20px' }}>
            <h2>Environmental Assessment</h2>
            <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '600px', margin: '0 auto' }}>
              {result.analysis}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;