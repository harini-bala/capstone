# Agile Tracker Data Flow Diagram (DFD)

The code represents an "Agile Tracking System" built with React, focusing on user and admin functionalities. The Agile Track System consists of a Home Page with navigation, Authentication (Login/Signup with validation), User Dashboard (tasks, teams, profiles), Admin Dashboard (user management, task assignment, performance tracking), Profiles & History (user tasks, admin controls), and core features like task management, team collaboration and seamless navigation.


## Key Features

* **User Management:**
    * User registration and login (using local storage for credentials).
    * User dashboard displaying assigned tasks, team details, and personal task history.
    * Task status updates by users.
* **Admin Management:**
    * Admin dashboard for project management, team member management, and task assignment.
    * Project creation and modification.
    * Team member addition, deletion, and editing.
    * Task assignment and editing.
    * Task history retrieval and team performance tracking.
* **Project and Task Tracking:**
    * Project status tracking and display.
    * Task assignment, status tracking, and history.


## Level 0 (Context Diagram)

The Level 0 DFD represents the Agile Tracker system as a single process interacting with external entities.

**Entities & Data Flow in Level 0:**

* **External Entities:**
    * User (Views tasks, updates status, views team, logs in/out)
    * Admin (Manages projects, tasks, team members, views performance, logs in/out)
* **Main System:**
    * Agile Tracker System
* **Data Flow:**
    * User → Login/Signup → Agile Tracker System
    * User → View/Update Tasks → Agile Tracker System
    * User → View Team → Agile Tracker System
    * Admin → Login/Signup → Agile Tracker System
    * Admin → Manage Project/Tasks/Team → Agile Tracker System
    * Agile Tracker System → Store/Retrieve Data → Local Storage (Simulated/Replace with Database)

**DFD Structure (Level 0):**



+-----------------+      Login/Signup, Task Updates, Details      +-----------------------+
|     User        |---------------------------------------------->| Agile Tracking System |
+-----------------+                                               +-----------------------+
                                                                             ^
                                                                             | Project/Task Management, User Data
+-----------------+      Admin Actions, Project/Task Data         +-----------------------+
|     Admin       |---------------------------------------------->| Agile Tracking System |
+-----------------+                                               +-----------------------+

+-----------------+      User/Admin Data Storage           +-----------------------+
| Local Storage   |<------------------------------------->| Agile Tracking System |
+-----------------+                                        +-----------------------+

#### **Explanation:**
- **User:** Interacts with the system for login, signup, viewing tasks, updating task status, and viewing project/team details.
- **Admin:** Manages projects, team members, tasks, and retrieves task history/team performance.
- **Agile Tracking System:** The core application handling all interactions.
- **Local Storage:** Stores user credentials and possibly some application state.

------------------------------------

## Level 1 (Detailed DFD)

At Level 1, we break down the Agile Tracker System into its major sub-processes.

**Processes & Data Flow in Level 1:**

1.  **User Authentication:**
    * User signs up, and credentials are stored in local storage.
    * User logs in using registered credentials.
    * If credentials are invalid, an error message is displayed.
    * Upon successful login, the user is redirected to the User Dashboard.


2.  **Admin Authentication & Management:**
    * Admin signs up, and credentials are stored in local storage.
    * Admin logs in using registered credentials.
    * Admin accesses the Admin Dashboard to:
        * Manage Project Name/End Date
        * Manage Team Members
        * Manage Tasks
        * View Task History
        * Track Team Performance
    * Data is stored in local storage.
3.  **User Dashboard Interaction:**
    * User views assigned tasks.
    * User updates task status.
    * User views team members.
    * User views task details and team details.
    * User views personal task history.
4.  **Admin Dashboard Interaction:**
    * Admin manages project information.
    * Admin manages team members.
    * Admin assigns and updates tasks.
    * Admin views task history.
    * Admin tracks team performance.

**DFD Structure (Level 1):**

 +-----------------+
                                                                                                      ^ | User/Admin Data
                                                                                                       | v
+-----------------+      User Credentials, Signup Data    +-----------------------+
|     User        |-------------------------------------->| 1.1 User Management   |
+-----------------+                                       +-----------------------+
                                                                  ^ | User Data, Login Status
                                                                  | v
+-----------------+      Task Updates, Details Request    +-----------------------+
|     User        |-------------------------------------->| 1.2 User Dashboard    |
+-----------------+                                       +-----------------------+
                                                                  ^ | Task/Team Data, Details
                                                                  | v
+-----------------+      Admin Actions, Project/Task Data +-----------------------+
|     Admin       |-------------------------------------->| 1.3 Admin Management  |
+-----------------+                                       +-----------------------+
                                                                  ^ | Project/Task Data, Reports
                                                                  | v
+-----------------+      Project/Task Details Request     +-----------------------+
|     Admin       |-------------------------------------->| 1.4 Project/Task View |
+-----------------+                                       +-----------------------+

## **Explanation of System Components**

### **1.1 User Management**  
- Handles **user registration and login**.  
- Stores and retrieves **user credentials** from **local storage** for authentication.  

### **1.2 User Dashboard**  
- Provides a **task overview** for the user.  
- Displays **assigned tasks**, **team details**, and **task history**.  
- Allows users to **update task status**.  

### **1.3 Admin Management**  
- Provides **admin functionalities** to manage:  
  - **Projects** (creation, modification, status tracking).  
  - **Teams** (adding, editing, deleting members).  
  - **Tasks** (assigning, updating, retrieving task history).  
- Monitors **team performance**.  

### **1.4 Project/Task View**  
- Displays **detailed information** about:  
  - **Projects** (status, progress tracking).  
  - **Tasks** (assigned team members, updates, history).  
- Helps the admin **analyze workload distribution**.  

### **1.5 Local Storage**  
- Stores **user credentials** for authentication.  
- Maintains **project, task, and team data** for quick access.  
- Acts as a **lightweight data store** to persist application state.  

## Use Case Diagrams

### Admin Dashboard Use Cases

* Login
* Manage Project
* Manage Team Members
* Manage Tasks
* View Task History
* Track Team Performance

+-----------------+
|      Admin      |
+-----------------+
|
+---------------------------------------------------------------------------------------+
| Login | Manage Project | Manage Team | Manage Tasks | View History | Track Performance |
+---------------------------------------------------------------------------------------+


### User Authentication Use Cases

* Signup
* Login
* Redirect to User Dashboard

+-----------------+
|      User       |
+-----------------+
|
+------------------------------------------+
| Signup | Login | Redirect to Dashboard |
+------------------------------------------+


### User Dashboard Interaction Use Cases

* View Assigned Tasks
* Update Task Status
* View Team Members
* View Task Details
* View Team Details
* View Personal Task History

+-----------------+
|      User       |
+-----------------+
|
+---------------------------------------------------------------------------+
| View Tasks | Update Status | View Team | View Task Details | View Team Details | View History |
+---------------------------------------------------------------------------+


### Admin Task Management Use Cases

* Assign Task
* Edit Task
* Delete Task

+-----------------+
|      Admin      |
+-----------------+
|
+-----------------------------------+
| Assign Task | Edit Task | Delete Task |
+-----------------------------------+

### 1. User Use Case Diagram:

+-------+
| User  |
+-------+
    |
    |
+-----------------+   +-----------------+   +-----------------+   +-----------------+
| [Signup]        |   | [Login]         |   | [View Tasks]    |   | [Update Task]   |
+-----------------+   +-----------------+   +-----------------+   +-----------------+
    |                                           |
    |                                           |
    +-------------------------------------------+
                     |
                     v
             +-----------------+
             | [View Details]  |
             +-----------------+

### 2. Admin Use Case Diagram:

+-------+
| Admin |
+-------+
    |
    |
+-----------------+   +-----------------+   +-----------------+   +-----------------+   +-----------------+
| [Manage Project]|   | [Manage Team]   |   | [Assign Task]   |   | [View History]  |   | [View Performance] |
+-----------------+   +-----------------+   +-----------------+   +-----------------+   +-----------------+
    |
    |
    +-------------------------------------------+
                     |
                     v
             +-----------------+
             | [View Details]  |
             +-----------------+


## Conclusion

This document provides a comprehensive overview of the data flow and use cases for the Agile Tracker application. It should serve as a helpful guide for understanding the system's architecture an