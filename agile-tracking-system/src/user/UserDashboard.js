import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user-dashboard-styles.css';

const UserDashboard = ({ tasks = [], teams = [], updateTaskStatus }) => {
  const username = 'testuser';
  const navigate = useNavigate();

  const userTasks = tasks.filter((task) => task.assignedMember === username);
  const userTeam = teams.find((team) => team.members.includes(username));

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userTaskHistory, setUserTaskHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleGetDetails = () => {
    if (!showDetails) {
      setSelectedTask(userTasks.length > 0 ? userTasks[0] : null);
      setSelectedTeam(userTeam || null);
      setShowDetails(true);
      setShowProfile(false);
    } else {
      setShowDetails(false);
      setSelectedTask(null);
      setSelectedTeam(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    navigate('/user-login');
  };

  const handleProfile = () => {
    if (!showProfile) {
      setUserTaskHistory(userTasks);
      setShowProfile(true);
      setShowDetails(false);
    } else {
      setShowProfile(false);
      setUserTaskHistory([]);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>Welcome, {username}</h1>

      {userTeam && (
        <div className="project-info">
          <h2>Project: {userTeam.projectName}</h2>
          <h3>Team Lead: {userTeam.teamLead}</h3>
        </div>
      )}

      <h2>My Assigned Tasks</h2>
      {userTasks.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Submit By</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.submitDate}</td>
                <td>{task.status}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        tasks.findIndex((t) => t.taskName === task.taskName),
                        e.target.value
                      )
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned.</p>
      )}

      <h2>Team Members</h2>
      {userTeam ? (
        <ul className="team-members">
          {userTeam.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      ) : (
        <p>No team assigned.</p>
      )}

      <div className="user-actions">
        <button onClick={handleGetDetails}>Get Details</button>
        <button onClick={handleProfile}>Profile</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      {showDetails && selectedTask && (
        <div className="details-panel">
          <h3>Task Details</h3>
          <p><strong>Task:</strong> {selectedTask.taskName}</p>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Submit By:</strong> {selectedTask.submitDate}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
        </div>
      )}

      {showDetails && selectedTeam && (
        <div className="details-panel">
          <h3>Team Details</h3>
          <p><strong>Project Name:</strong> {selectedTeam.projectName}</p>
          <p><strong>Team Lead:</strong> {selectedTeam.teamLead}</p>
          <p><strong>Members:</strong> {selectedTeam.members.join(', ')}</p>
          <p><strong>Progress:</strong> {selectedTeam.progress}%</p>
        </div>
      )}

      {showProfile && userTaskHistory.length > 0 && (
        <div className="profile-panel">
          <h3>Personal Task History</h3>
          <ul>
            {userTaskHistory.map((task, index) => (
              <li key={index}>
                <strong>{task.taskName}</strong> - {task.status} (Due: {task.submitDate})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

function ParentComponent() {
  const initialTasks = [
    {
      taskName: 'Task 1',
      description: 'Description 1',
      submitDate: '2023-12-31',
      status: 'To Do',
      assignedMember: 'testuser',
    },
    {
      taskName: 'Task 2',
      description: 'Description 2',
      submitDate: '2024-01-15',
      status: 'In Progress',
      assignedMember: 'testuser',
    },
  ];

  const initialTeams = [
    {
      projectName: 'Project A',
      teamLead: 'Lead A',
      members: ['testuser', 'member2'],
      progress: 50,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [teams, setTeams] = useState(initialTeams);

  const handleUpdateTaskStatus = (taskIndex, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  return <UserDashboard tasks={tasks} teams={teams} updateTaskStatus={handleUpdateTaskStatus} />;
}

export default ParentComponent;