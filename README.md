# Datanet Global Limited

Elite IT & Security Infrastructure Solutions. Professional infrastructure, networking, and advanced security systems for modern organizations in the UK.

![Datanet Admin](public/images/logo.jpeg)

## 🚀 Overview

Datanet Global is a high-performance web application built for a UK-based IT infrastructure provider. It features a modern, responsive design with a dedicated administrative portal for managing customer inquiries and testimonial reviews.

The application has been migrated to a **Serverless Architecture** using Firebase, allowing for high scalability, zero-cost hosting on the free tier, and seamless deployment on Vercel.

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + Framer Motion (Animations)
- **Database**: Google Cloud Firestore (Serverless)
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Hosting**: Optimized for Vercel

## ✨ Key Features

- **Dynamic Landing Page**: Features smooth animations, glassmorphism UI, and custom-engineered components.
- **Admin Portal**: A password-protected dashboard for managing:
  - **Consultation Leads**: View and manage service requests and quote inquiries.
  - **Testimonial Moderation**: Approve or reject customer reviews before they appear on the homepage.
- **Mobile Responsive**: Fully adaptive layout for mobile, tablet, and desktop views.
- **SEO Optimized**: Pre-configured meta tags, Open Graph data, and structured JSON-LD for search engine ranking.

## ⚙️ Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/datanet-global.git
   cd datanet-global
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run locally**:
   ```bash
   npm run dev
   ```

## 🚢 Deployment (Vercel)

The project includes a `vercel.json` file for SPA routing support.

1. Connect your GitHub repository to Vercel.
2. The framework will be automatically detected as **Vite**.
3. Add the environment variables from your `.env` file to the Vercel Project Settings.
4. Deploy!

## 📄 License

© 2026 Datanet Global Limited. All rights reserved. Registered in England & Wales.
