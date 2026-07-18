# Notely 🚀

**Notely** is an AI-powered EdTech SaaS platform designed to enhance the learning experience. It allows students and professionals to instantly generate high-yield exam notes, project documentation, revision points, and visual data representations (charts & diagrams) in seconds. 

Featuring a modern, distraction-free interface, Notely keeps you focused on what matters most: your learning.

---

## ✨ Features

- 🧠 **AI Note Generation**: Generate structured, exam-oriented notes, revision points, and long/short questions instantly.
- 📊 **Visual Learning**: Automatically generate data-driven charts (Pie, Bar, Line) using `Recharts` and flow diagrams using `Mermaid.js`.
- 📥 **Instant PDF Export**: Download your generated notes as a clean, formatted PDF for offline studying and printing.
- 🔐 **Seamless Authentication**: Secure, one-click login powered by Firebase Google Auth.
- 📚 **History & Organization**: Automatically save your past generated notes to a centralized dashboard for easy retrieval.
- 💳 **Credit System & Pricing**: Built-in tiered pricing system (Starter, Popular, Pro) to manage AI generation credits.
- 🎨 **Premium UI/UX**: A highly responsive, modern SaaS aesthetic built with Tailwind CSS v4, featuring fluid micro-animations, glassmorphism, and a custom brand palette.

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Custom Design Tokens)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Authentication**: Firebase (Google OAuth)
- **Data Visualization**: Recharts, Mermaid.js
- **Animations**: Framer Motion (Motion/React)
- **Markdown Rendering**: React-Markdown

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **PDF Generation**: PDFKit
- **Security**: CORS, Cookie-Parser

---

## 📂 Project Structure

This is a monorepo containing both the client and server.

```
Notely/
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

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. You will also need a Firebase project and a MongoDB cluster.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/notely.git
cd notely

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
