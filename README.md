ClubSphere – Membership & Event Management for Local Clubs
📌 Project Overview
ClubSphere is a full-stack MERN web application designed to help users discover, join, and manage local clubs and events.
It supports three roles (Admin, Club Manager, Member) with role-based dashboards, secure authentication, and Stripe-powered payments.
This platform is ideal for managing photography clubs, tech communities, sports groups, book clubs, and other local organizations.

🎯 Project Purpose
The goal of ClubSphere is to:
Digitize local club management
Simplify membership & event registration
Provide transparent payment tracking
Offer role-based control for Admins, Managers, and Members

🌐 Live Website

🔗 Live URL:
👉 https://clubsphere-a54db.web.app

🚀 Key Features
🔐 Authentication & Security
Firebase Authentication (Email/Password & Google)
JWT-based secure API access
Firebase token verification on backend
Role-based route protection (Admin / Manager / Member)

👥 User Roles & Dashboards
👑 Admin
View platform statistics
Manage users & roles
Approve / reject clubs
Monitor payments & transactions
View all clubs, events, and memberships

🏢 Club Manager
Create & manage clubs
Set free or paid membership
Create, update & delete events
View club members & event registrations
Track payments received

🙋 Member
Browse clubs & events
Join clubs (free or paid)
Register for events
View memberships & registrations
Track payment history

🏠 Public Pages
Home (Dynamic sections with animation)
All Clubs Listing
Club Details
All Events
Event Details
Login / Register
404 Error Page

💳 Payment System
Stripe integration (Test Mode)
Secure membership & event payments
Payment records stored in database
Free clubs & free events supported

🔍 Advanced Features (Challenge Requirements)

Server-side search (club name)
Category-based filtering
Sorting (fee, date, newest/oldest)
TanStack Query for all data fetching
React Hook Form for all forms
Framer Motion animations

🧩 Tech Stack
Frontend:React
React Router
Tailwind CSS
DaisyUI
React Hook Form
TanStack Query
Framer Motion
Axios
Firebase Authentication

Backend
Node.js
Express.js
MongoDB
Firebase Admin SDK
Stripe API
JWT

📦 Important NPM Packages Used
Client
react-router-dom
@tanstack/react-query
react-hook-form
framer-motion
axios
firebase
sweetalert2
react-icons
Server
express
mongodb
cors
dotenv
jsonwebtoken
stripe
firebase-admin

🗂️ Database Collections
users
clubs
memberships
events
eventRegistrations
payments
Each collection maintains proper relationships using references (email / IDs).

🔐 Environment Variables
Client (.env)
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
VITE_IMG_HOST_KEY
VITE_API_URL

Server (.env)
MONGODB_URI
STRIPE_SECRET
CLIENT_DOMAIN
FB_SERVICE_KEY
🧑‍💻 GitHub Repositories

Client Repo:
👉 https:https://github.com/MstMahfuzaAkter/ClubSphere_Client

Server Repo:
👉 https://github.com/MstMahfuzaAkter/ClubSphere_Server

🧪 Deployment Notes

Client deployed on Firebase

Server deployed on Vercel


🎨 UI & Design Highlights
Consistent brand theme
Responsive layout (mobile, tablet, desktop)
Clean card-based UI
Balanced spacing & alignment
Dashboard matches public site theme
Equal card heights & grid layouts

🏁 Conclusion
ClubSphere demonstrates a real-world, production-ready MERN application with authentication, authorization, payment integration, and clean UI design.
It reflects strong understanding of full-stack development, secure systems, and modern React best practices.
