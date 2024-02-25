# Expense Tracker

## Overview

This is a simple expense tracker application built using Vite, React, TypeScript, and Firebase. The application allows users to manage their expenses and income effectively.

## Features

- **Sign In/Sign Out**: Users can securely sign in and sign out using their Google account or registering with email/password
- **Balance View**: Users can view their current balance, which is updated in real-time as transactions are added.
- **Transaction Management**: Users can add new transactions, categorizing them as either expenses or income. Each transaction also includes a short description for easy reference.
- **Transaction History**: Users can view their past transactions, providing a clear overview of their financial activity.
- **Responsive Design**: The application is responsive and can be used on various devices with different screen sizes.

## Getting Started

1. Clone the repository
2. Install the dependencies using `npm install`
3. Create a project on the [Firebase console](https://console.firebase.google.com/) and put the necessary files into your .env file (structure below)
4. Start the development server using `npm run dev`
5. Visit `http://localhost:5173` in your browser

## env file structure

VITE_FIREBASE_API_KEY=[your-api-key]

VITE_FIREBASE_AUTH_DOMAIN=[your-auth-domain]

VITE_FIREBASE_PROJECT_ID=[your-project-id]

VITE_FIREBASE_STORAGE_BUCKET=[your-storage-bucket]

VITE_FIREBASE_MESSAGING_SENDER_ID=[your-messaging-sender-id]

VITE_FIREBASE_APP_ID=[your-app-id]

All of the above data can be found under "project settings" (the second icon from the top in the sidebar) after you create your project

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
