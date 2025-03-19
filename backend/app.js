import React, { useState } from "react";

function App() {
  const [productName, setProductName] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${productName}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>EcoScore - Product Sustainability Checker</h1>
      <input 
        type="text" 
        placeholder="Enter product name..." 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleSearch}>Check Impact</button>
    </div>
  );
}
npm
export default App;
