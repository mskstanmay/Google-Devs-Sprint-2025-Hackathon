# Environmental Sustainability Product Analyzer (ESP)

A sophisticated web application that analyzes products' environmental impact using AI-powered assessments and provides detailed sustainability metrics.

## 🌟 Features

- Real-time product sustainability analysis
- Interactive visualization dashboards
- Supply chain impact assessment
- Manufacturing process evaluation
- AI-powered recommendations
- Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Google-Devs-Sprint-2025-Hackathon
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../sustainability-app
npm install
```

### Environment Setup

Create a `.env` file in the backend directory:
```env
PORT=5000
GOOGLE_API_KEY=your_api_key_here
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend application:
```bash
cd sustainability-app
npm start
```

## 📚 Technology Stack

### Frontend
| Technology | Version | Purpose | Documentation |
|------------|---------|----------|---------------|
| React | ^19.0.0 | UI Framework | [Docs](https://reactjs.org/) |
| Chart.js | ^4.4.8 | Data Visualization | [Docs](https://www.chartjs.org/) |
| React Chart.js 2 | ^5.3.0 | Chart.js React Integration | [Docs](https://react-chartjs-2.js.org/) |
| React Minimal Pie Chart | ^9.1.0 | Pie Charts | [Docs](https://www.npmjs.com/package/react-minimal-pie-chart) |

### Backend
| Technology | Version | Purpose | Documentation |
|------------|---------|----------|---------------|
| Express | ^4.21.2 | Web Framework | [Docs](https://expressjs.com/) |
| @google/generative-ai | ^0.24.0 | AI Integration | [Docs](https://ai.google.dev/) |
| cors | ^2.8.5 | CORS Middleware | [Docs](https://www.npmjs.com/package/cors) |
| body-parser | ^1.20.3 | Request Parsing | [Docs](https://www.npmjs.com/package/body-parser) |
| dotenv | ^16.4.7 | Environment Variables | [Docs](https://www.npmjs.com/package/dotenv) |
| nodemon | ^3.1.9 | Development Server | [Docs](https://nodemon.io/) |

## 🏗 Project Structure

```
sustainability-project/
├── backend/
│   ├── server.js
│   └── package.json
├── sustainability-app/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|---------|------------|
| `/api/analyze-product` | POST | Analyzes product sustainability |
| `/` | GET | API health check |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Project Lead: Msks Tanmay 
- Frontend Developer: Msks Tanmay
- Backend Developer: Sameer Wahab
- UI/UX Designer: Himaja Muppalla

## 🌐 Links

- [Production Deployment](https://your-deployment-url.com)
- [API Documentation](https://your-api-docs.com)
- [Design Documentation](https://your-design-docs.com)

---
Made with ❤️ for Google Devs Sprint 2025 Hackathon
