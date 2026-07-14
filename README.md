# StudyWith AI 📚✨

![Lavender Mist Theme](https://img.shields.io/badge/Theme-Lavender%20Mist-B9AEE0?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square&logo=google)

**StudyWith AI** is an intelligent, full-stack web application designed to help students and professionals generate high-yield, exam-oriented notes in seconds. Powered by Google's Gemini AI, it creates structured notes, diagrams, and charts based on any topic, class level, and exam type.

## ✨ Features

- **🤖 AI-Powered Note Generation:** Generate comprehensive notes using Google Gemini AI tailored to specific class levels (High School, College, etc.) and exam types (AP, SAT, University Finals, etc.).
- **📊 Auto-Generated Visuals:** Automatically creates data representations (Recharts) and structural diagrams (Mermaid.js) to enhance understanding.
- **⚡ Revision Mode:** Quickly toggle "Revision Mode" to get summarized, high-yield bullet points perfect for last-minute cramming.
- **🔐 Secure Authentication:** Seamless Google OAuth sign-in powered by Firebase.
- **💎 Credit System:** Users start with 100 free credits. Each generation costs 10 credits.
- **📂 History & Note Management:** Automatically saves all generated notes to your personal dashboard so you never lose your study materials.
- **📥 PDF Export:** Download any of your generated notes instantly as a clean, printable PDF (Generated via PDFKit).
- **🎨 Beautiful UI:** Features a custom, accessible, and responsive "Lavender Mist" pastel theme built with Tailwind CSS and Framer Motion micro-animations.

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Animations:** Framer Motion
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **Data Visualization:** Recharts (Graphs) & Mermaid (Diagrams)
- **Markdown Rendering:** React-Markdown
- **Authentication:** Firebase Auth (Google Provider)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **AI Integration:** Google Gemini API
- **Authentication:** JWT (JSON Web Tokens) & HTTP-only Cookies
- **PDF Generation:** PDFKit

## 📂 Project Structure

This is a monorepo containing both the client and server.

```
StudywithAI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # Images and static assets
│   │   ├── components/     # Reusable UI components (Sidebar, Navbar, etc.)
│   │   ├── pages/          # Route pages (Home, Auth, Notes, History, Pricing)
│   │   ├── redux/          # Redux slices and store
│   │   ├── services/       # API call functions (Axios)
│   │   └── utils/          # Firebase config
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── controllers/        # Route logic (auth, generate, notes, pdf)
│   ├── middleware/         # Custom middleware (isAuth)
│   ├── models/             # Mongoose schemas (User, Notes)
│   ├── routes/             # Express routes
│   ├── services/           # Gemini AI integration services
│   ├── utils/              # DB connection & Prompt building
│   ├── index.js            # Server entry point
│   └── package.json
```

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas cluster (or local MongoDB)
- Google Gemini API Key
- Firebase Project with Google Auth enabled

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/StudywithAI.git
cd StudywithAI
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window/tab:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_SERVER_URL=http://localhost:8000
```

Start the frontend development server:
```bash
npm run dev
```
The app will be running at `http://localhost:5173`.

## 🌐 Deployment (Render)

This project is optimized for deployment on [Render](https://render.com/). 

1. **Backend (Web Service):** Deploy the `server` folder. Add the environment variables above. Leave `CLIENT_URL` blank temporarily.
2. **Frontend (Static Site):** Deploy the `client` folder. Build command: `npm install && npm run build`. Add `VITE_SERVER_URL` pointing to your deployed backend. Add a rewrite rule for `/*` to `/index.html` to support React Router.
3. **Connect them:** Once the frontend is live, copy its URL and paste it into the backend's `CLIENT_URL` environment variable.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is [MIT](LICENSE) licensed.
