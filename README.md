# Capstone
# Agile Track System

## Overview
Agile Track System is a project management tool designed to streamline Agile workflows by enabling users and administrators to manage tasks, track team progress, and collaborate efficiently.

## Features
### 1️⃣ Home Page
- Navigation Bar (Dashboard, Login, Reports, Profile)
- Welcome message: "Streamline Your Agile Workflow"
- Buttons:
  - 🚀 Dashboard → Displays Scrum Teams
  - 🔑 Login → Redirects to login page

### 2️⃣ Authentication Pages
#### ✅ Login Page
- Fields: Email, Password
- Validation Checks:
  - Missing "@"
  - Incorrect credentials
- Buttons:
  - Login → Redirects to User/Admin Dashboard
  - Sign Up → For new users

#### ✅ Sign Up Page
- Fields: Name, Email, Password
- Validation: All fields required
- Button:
  - Sign Up → Redirects to User Dashboard

### 3️⃣ User Dashboard
- Title: "Scrum Teams"
- Sections:
  - 📌 My Assigned Tasks (Title, Description, Status)
  - 👥 Team Details (Name, Members, Progress)
- Buttons:
  - 🔍 Get Details → View task & team details
  - 🔄 Update Task Status (To Do, In Progress, Done)
  - 🔗 Profiles → View personal task history
  - 🚪 Logout → Redirect to login

### 4️⃣ Admin Dashboard
- Title: "Scrum Teams & Admin Controls"
- Features:
  - 👤 Manage Users (Add, Remove, Update Roles)
  - ✅ Assign Tasks to users
  - 📈 Track Team Performance
- Buttons:
  - ➕ Add Scrum Team
  - ✏ Edit Task Status
  - 📜 Get Task History
  - 🚪 Logout

### 5️⃣ Profiles & History
- User Profile: Lists tasks they are working on
- Admin Profile: View and manage team assignments
- Get History Button: Fetch user’s past work

### 6️⃣ Features & Validations
- ✅ Single Page App (SPA) with React
- ✅ Role-based Login (User/Admin)
- ✅ Task Management (CRUD operations)
- ✅ Team Collaboration
- ✅ Validation for input fields
- ✅ Navigation flow (Login → Dashboard → Profile/Tasks)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/agile-track-system.git
   ```
2. Navigate to the project directory:
   ```sh
   cd agile-track-system
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB (if backend is included)
- CSS/Tailwind
- React Router
- Axios

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

