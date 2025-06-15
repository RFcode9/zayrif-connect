# 💻 Zayrif Connect

## 🚀 Project Overview

**CloudPC Dashboard** is a web-based platform that allows users to create and manage virtual PCs with different hardware configurations (low-end and high-end) directly from their browser. The app offers real-time deployment controls such as **Start**, **Pause**, **Stop**, and **Connect**, simulating how modern cloud computing platforms operate.

This project is built with modern web technologies and demonstrates a prototype for a **cloud gaming / cloud computing** service similar to platforms like AWS EC2 or Hack The Box — showcasing both frontend interface and simulated SSH/GUI connections.

---

## ✨ Features

- 🔐 **Authentication System** (Login / Signup)
- 📂 **Dashboard with System Instances**
  - Displays all your deployed PCs
  - Shows system specs like RAM, Storage, GPU
- ⚙️ **PC Configuration Tool**
  - Build your own virtual machine with preferred hardware
- 🎮 **Connect to PC**
  - Simulated via AnyDesk demo or future SSH integration
- 🖥️ **PC Controls**
  - Start / Pause / Stop / Remove PC from Dashboard
- 📈 **Live Usage Stats**
  - Tracks total hours used and total spend
- 🌗 **Dark Tech-Themed UI**
  - Inspired by gaming dashboards, with a modern UI/UX

---

## 🏗️ Tech Stack

| Tech          | Usage                     |
|---------------|---------------------------|
| **React.js**  | UI Framework              |
| **TypeScript**| Strongly typed JS         |
| **Tailwind CSS** | UI styling             |
| **ShadCN UI** | Component Library         |
| **Vite**      | Lightning-fast build tool |
| **Context API** | State management        |
| **Mock APIs** | Simulate backend behavior |

---

## 📁 Folder Structure
/src
/components → Reusable UI Components
/pages → Dashboard, Login, Signup, Customize
/services → Mock API Logic (Instance creation, etc.)
/context → State and PC management
/assets → Icons and images



## 🧪 Demonstrated Functionalities

- ✅ Low & High Config PC Management
- ✅ Live PC instance simulation with stats
- ✅ Secure login with profile viewing
- ✅ Simulated SSH GUI using AnyDesk modal
- ✅ Dark mode and responsive design

---

## 🔧 Setup Instructions

### Prerequisites:
- Node.js & npm installed  
  (Install via [nvm](https://github.com/nvm-sh/nvm))

---

### 🛠️ Local Development Setup:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cloudpc-dashboard.git

# 2. Navigate into the project folder
cd cloudpc-dashboard

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev


---

🌐 Future Scope
🔐 Real SSH instance deployment (via cloud VMs)

🧠 Role-based access control (Admin/User)

💳 Stripe payment integration for plans

📊 Detailed usage analytics & billing dashboard

📦 Cloud provider API (AWS/GCP integration)

🌍 Global infrastructure support


