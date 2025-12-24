# CodeLeap Engineering Test

A simple social network application that performs basic CRUD operations for posts, with additional features like comments, likes, and user authentication.

**Live Demo:** [https://code-leap.netlify.app/](https://code-leap.netlify.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Firebase Configuration](#-firebase-configuration)
- [Available Scripts](#-available-scripts)

## ✨ Features

### Core Features

- ✅ Login Page
- ✅ Feed Page
- ✅ Create Post
- ✅ Edit Post Modal
- ✅ Delete Post Modal

### Bonus Features

- ✅ Likes functionality
- ✅ Comments system
- ✅ Third-party authentication (Firebase)
- ✅ Filter posts by username
- ✅ Responsive design for mobile devices
- ✅ Persistent login/logout solution
- ✅ Infinite scroll
- ✅ Smooth animations, transitions and hover effects

> **Note:** Features that are not implemented in the API are working using localStorage as a fallback.

## 🛠 Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Firebase** - Authentication (optional)
- **CSS Modules** - Styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd CodeLeapEngineeringTest
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔥 Firebase Configuration

By default, this application works without Firebase, using only username-based login. To enable Firebase authentication, follow these steps:

### Step 1: Create Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 2: Set Up Firebase Project

1. **Create a Firebase Project**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project" and follow the setup wizard
   - Enter the project you created

2. **Access Project Settings**

   - In the upper left corner, click on ⚙️ (Settings)
   - Select "Project settings"

3. **Create a Web App**

   - Scroll down to the "Your apps" section
   - Click on the `</>` Web icon
   - Give your app a name (e.g., `codeleap-network`)
   - **Don't** check "Firebase Hosting" (not needed)
   - Click "Create app"

4. **Copy Configuration**

   - Copy the configuration values from Firebase
   - Update the `.env` file with your Firebase credentials

### Step 3: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Save the changes

## 📜 Available Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start development server       |
| `npm run build`  | Build for production           |
| `npm run preview`| Preview production build       |
| `npm run lint`   | Run ESLint                     |
