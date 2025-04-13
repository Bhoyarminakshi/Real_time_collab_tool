
# CollabTool - Real-time Collaboration Platform

CollabTool is a powerful platform designed for seamless real-time collaboration on documents. It allows users to work together, share ideas, and communicate effortlessly on projects. Built with React, Node.js, Express, and MongoDB, it offers a user-friendly experience for document creation, editing, and team collaboration.

## Features

- **User Authentication**: Register, log in, and securely manage your account.
- **Real-time Document Collaboration**: Create and edit documents with your team in real-time.
- **Responsive Design**: The app works across all devices and screen sizes.
- **JWT-based Authentication**: Ensures secure user login and data storage.
- **Intuitive UI**: Clean and modern design that makes document collaboration simple.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Bootstrap, custom CSS

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/collabtool.git
   ```

2. Navigate to the project directory:
   ```bash
   cd collabtool
   ```

3. Install the dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Install the dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

5. Set up environment variables:
   - Create a `.env` file in the backend directory and add the following variables:
     ```
     JWT_SECRET=your_jwt_secret_key
     MONGO_URI=your_mongo_database_url
     ```
   - Replace `your_jwt_secret_key` and `your_mongo_database_url` with actual values.

6. Run the backend server:
   ```bash
   cd backend
   npm start
   ```

7. Run the frontend:
   ```bash
   cd frontend
   npm start
   ```

The app will be accessible at `http://localhost:3000` on your browser.

## Usage

1. **Sign Up**: Register with your email and password to create an account.
2. **Login**: Log in to access your dashboard.
3. **Create Documents**: Start creating documents, invite collaborators, and edit them together in real-time.

## Improvements

- **User Roles**: Implement roles such as admin, editor, and viewer for more fine-grained control.
- **Real-time Notifications**: Notify users of document updates and new collaborator invitations.
- **Version Control**: Keep track of document versions and allow users to revert changes.
