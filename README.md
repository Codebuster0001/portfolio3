
## 🚀 Portfolio3

**Portfolio3** is a modern, full-stack portfolio platform built to empower developers, creatives, and professionals. It offers a powerful admin dashboard to manage content and a stunning public-facing portfolio to showcase your work.

🔧 Built with **React**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 📁 Project Structure

This monorepo contains two applications:

- **🛠️ `dashboard/`** – Admin Panel for content management  
- **🌐 `frontend/`** – Public Portfolio to present your profile, skills, and projects

---

## ✨ Why Choose Portfolio3?

Portfolio3 combines flexibility, aesthetics, and control:

- 🔒 **Secure & Authenticated Admin Access**
- 🧠 **Easy Content Management** (Projects, Skills, Timeline, Messages)
- 🎨 **Visually Stunning UI** with interactive animations
- ⚡ **Modern Tech Stack** and scalable architecture
- 🚀 **Live Deployment** with auto-deploy via Vercel

---

## 🛠️ `dashboard/` — Admin Panel

A secure and responsive admin panel for managing your portfolio.

### 🔑 Features
- **Authentication** – Login, logout, route protection
- **Manage Content** – Add/edit/delete:
  - Projects
  - Skills
  - Timeline
  - Hero section
- **Visitor Messages** – Central inbox to read messages
- **Tech Stack** – React, Vite, Tailwind CSS, Redux

### 📁 Folder Structure
```
dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layout/              # Dashboard layout and navigation
│   ├── pages/               # Main pages (Dashboard, Projects, etc.)
│   ├── pages/subcomponents/ # CRUD forms and utilities
│   ├── store/               # Redux slices and configuration
│   └── common/              # Shared styles/constants
```

---

## 🌐 `frontend/` — Public Portfolio

A polished and interactive personal website to showcase your work.

### 🌟 Features
- **Hero, About, Skills, Projects, Contact, Timeline**
- **3D Model Viewer** and rich animations (Framer Motion, Magic UI)
- **Filterable Projects and Skills**
- **Contact Form** – Send messages directly
- **Responsive & SEO-Friendly**
- **Tech Stack** – React, Vite, Tailwind CSS, Redux

### 📁 Folder Structure
```
frontend/
├── src/
│   ├── components/     # UI and animation components
│   ├── section/        # Major content sections
│   ├── pages/          # Routes like Home, Projects, Contact
│   ├── layout/         # Shared layouts (navbar, footer)
│   ├── common/         # Constants, helpers, etc.
│   └── store/          # Redux setup
```

---

## 🌍 Live Demo

- **Frontend URL:** [https://portfoliodeepakkushwaha.vercel.app](https://portfoliodeepakkushwaha.vercel.app)  
- **Platform:** Vercel (auto-deployment enabled)

---

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolio3
```

### 2. Install Dependencies
```bash
cd dashboard && npm install
cd ../frontend && npm install
```

### 3. Run Locally
* **Admin Panel:**
  ```bash
  cd dashboard
  npm run dev
  # Open http://localhost:5173
  ```
* **Frontend Site:**
  ```bash
  cd frontend
  npm run dev
  # Open http://localhost:5173
  ```

---

## 🚀 Deployment

### 🌐 Frontend (on Vercel)
1. Push changes to the `frontend/` folder
2. Vercel auto-builds and deploys
3. Manual Dev Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 🛠️ Admin Dashboard (Local)
1. Navigate to `dashboard/`
   ```bash
   cd dashboard
   npm install
   npm run dev
   ```

---

## 📄 License

This project is intended for **personal portfolio use**.
You're welcome to **customize, reuse, or extend** it for your own portfolio projects. Attribution is appreciated but not required.

