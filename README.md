Personal Finance Tracker

A clean, responsive web application to track daily expenses, monitor income, and visualize financial habits.

📝 Description

Managing personal finances shouldn't be complicated. This Personal Finance Tracker is designed to provide a frictionless experience for logging incomes and expenses. Built with a focus on usability and data visualization, it allows users to authenticate securely via Google, quickly add transactions, and view their financial health at a glance through intuitive charts and data tables.

✨ Features

Secure Google Authentication: Seamless sign-in experience powered by Firebase Auth.

Interactive Dashboard: A comprehensive view of total income, total expenses, and current balance.

Transaction Management: Easily add, edit, and delete transactions. Categorize entries by type (Income/Expense), date, and custom tags.

Data Visualization: Graphical representations of spending habits to help identify where money is going.

Responsive UI: A polished, mobile-friendly interface built with Ant Design components.

Real-time Database: Data is instantly synced and securely stored in Firebase Cloud Firestore.

🏗️ Architecture & Tech Stack

Frontend Framework: React.js

UI Component Library: Ant Design (antd)

Backend / BaaS: Firebase

Authentication: Firebase Authentication (Google OAuth)

Database: Cloud Firestore (NoSQL)

Hosting: Vercel / Firebase Hosting (Recommended)

🚀 Getting Started

Prerequisites

Node.js (v14 or higher)

npm or yarn

A Firebase Project

Installation

Clone the repository:

git clone https://github.com/ranjith1807/Personal-finance-tracker.git
cd Personal-finance-tracker


Install dependencies:

npm install
# or
yarn install


Configure Firebase Environment Variables:
Create a .env file in the root directory and add your Firebase config keys:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


Start the development server:

npm start
# or
yarn start


The application will be available at http://localhost:3000.

📂 Project Structure

src/
├── components/       # Reusable Ant Design UI components (Layout, Modals, Forms)
├── pages/            # Page-level components (Dashboard, Login, Transactions)
├── utils/            # Helper functions and formatter logic
├── firebase.js       # Firebase initialization and configuration
├── App.js            # Main application router and context provider
└── index.js          # React entry point


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check issues page.

Fork the project.

Create your feature branch: git checkout -b feature/MyFeature

Commit your changes: git commit -m 'Add some feature'

Push to the branch: git push origin feature/MyFeature

Open a pull request.

📄 License

This project is open-source and available under the MIT License.
