import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">ESP</a>
        <button className="navbar-button">Home</button>
      </nav>
      <div className="App">
        <h1 className="title">Describe Your Product</h1>
        <div className="form-row">
          <div>
            <label htmlFor="categories">Choose a category:</label>
            <select id="categories" name="categories">
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description Of Product: </label>
            <input type="text" id="description" name="description" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;