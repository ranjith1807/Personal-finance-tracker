# Financly

> A responsive, full-stack personal finance tracker built to help you monitor your balance, visualize spending habits, and manage your budget effortlessly.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Ant Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)](https://ant.design/)

## 📝 Description

Financly is a secure, user-friendly web application for personal wealth management[cite: 4, 6]. It allows users to quickly log incomes and expenses, categorizing them for better financial insight[cite: 3]. Featuring an interactive dashboard with real-time charts and a robust data table, users can easily track where their money is going, filter past transactions, and manage their data via CSV bulk imports and exports[cite: 3, 5, 7].

## ✨ Features

*   **Authentication:** Secure login and registration using Email/Password or Google OAuth via Firebase[cite: 4, 10].
*   **Financial Dashboard:** Instantly view your total income, total expenses, and current balance calculated in real-time[cite: 3].
*   **Interactive Analytics:** Visual insights powered by dynamic line charts (tracking historical balance) and pie charts (breaking down expenses by category)[cite: 5].
*   **Robust Transaction Management:** Search, filter (by income/expense), and sort (by date/amount) your complete transaction history[cite: 7].
*   **Data Portability:** Easily export your transaction data to a CSV file, or bulk import hundreds of records at once using the built-in CSV uploader[cite: 7].
*   **Responsive UI:** A clean, grid-based layout that adapts seamlessly to desktop and mobile screens[cite: 8].

## 🏗️ Tech Stack

*   **Frontend Framework:** React (with React Router)[cite: 9]
*   **UI & Data Visualization:** Ant Design & Ant Design Charts[cite: 3, 5, 7]
*   **Backend & Database:** Firebase Authentication & Cloud Firestore
*   **Utilities:** Papaparse (CSV handling)[cite: 7], React Toastify (Notifications)[cite: 9]

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn
*   A Firebase project configured for Web with Authentication and Firestore enabled.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd financly
Install dependencies:

Bash
npm install
Configure Firebase:
Open src/firebase.jsx (or your environment variables file) and replace the configuration object with your own Firebase project credentials[cite: 10]:

JavaScript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
Start the development server:

Bash
npm start
The application will be available in your browser.

🤝 Contributing
Contributions, issues, and feature requests are welcome!

Fork the project.

Create your feature branch: git checkout -b feature/NewFeature

Commit your changes: git commit -m 'Add NewFeature'

Push to the branch: git push origin feature/NewFeature

Open a pull request.

📄 License
This project is open-source and available under the MIT License.
