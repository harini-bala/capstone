import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './admin-dashboard-styles.css';

const AdminDashboard = ({
  initialProjectName = "Project X",
  tasks = [],
  teamMembers = [],
  updateProjectEndDate = () => {},
  updateProjectName = () => {},
  updateTeamMembers = () => {},
  updateTasks = () => {},
  getTaskHistory = () => {},
  trackTeamPerformance = () => {},
}) => {
  const navigate = useNavigate();

  // Project-related state
  const [projectName, setProjectName] = useState(initialProjectName);
  const [isEditingProjectName, setIsEditingProjectName] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [isEditingEndDate, setIsEditingEndDate] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState(new Date().toISOString().split("T")[0]);

  // Team members state
  const [members, setMembers] = useState(teamMembers);
  const [newMember, setNewMember] = useState("");
  const [editingMemberIndex, setEditingMemberIndex] = useState(null);
  const [editedMemberName, setEditedMemberName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  // Tasks state
  const [assignedTasks, setAssignedTasks] = useState(tasks);
  const [newTask, setNewTask] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [submitByDate, setSubmitByDate] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedAssignee, setEditedAssignee] = useState("");
  const [editedSubmitByDate, setEditedSubmitByDate] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  // Performance and history state
  const [taskHistory, setTaskHistory] = useState([]);
  const [teamPerformance, setTeamPerformance] = useState([]);

  // Project name handlers
  const handleEditProjectName = () => {
    if (newProjectName.trim() !== "") {
      setProjectName(newProjectName);
      updateProjectName(newProjectName);
    }
    setIsEditingProjectName(false);
  };

  // Project end date handlers
  const handleEditEndDate = () => {
    if (newEndDate) {
      setProjectEndDate(newEndDate);
      updateProjectEndDate(newEndDate);
    }
    setIsEditingEndDate(false);
  };

  // Team member handlers
  const handleAddMember = () => {
    if (newMember.trim() === "") {
      alert("Member name cannot be empty!");
      return;
    }
    if (members.includes(newMember)) {
      alert("This member is already in the team.");
      return;
    }
    setMembers([...members, newMember]);
    updateTeamMembers([...members, newMember]);
    setNewMember("");
  };

  const handleDeleteMember = (index) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
      updateTeamMembers(updatedMembers);
    }
  };

  const handleEditMember = (index, memberName) => {
    setEditingMemberIndex(index);
    setEditedMemberName(memberName);
  };

  const handleSaveMember = (index) => {
    if (editedMemberName.trim() !== "") {
      const updatedMembers = [...members];
      updatedMembers[index] = editedMemberName;
      setMembers(updatedMembers);
      updateTeamMembers(updatedMembers);
      setEditingMemberIndex(null);
      setEditedMemberName("");
    }
  };

  const handleCancelEditMember = () => {
    setEditingMemberIndex(null);
    setEditedMemberName("");
  };

  // Task handlers
  const handleAssignTask = () => {
    if (newTask.trim() !== "" && selectedAssignee && submitByDate) {
      const updatedTasks = [
        ...assignedTasks,
        { taskName: newTask, assignedTo: selectedAssignee, submitByDate, status: "Pending" },
      ];
      setAssignedTasks(updatedTasks);
      updateTasks(updatedTasks);
      setNewTask("");
      setSelectedAssignee("");
      setSubmitByDate("");
    }
  };

  const handleEditTask = (index, task) => {
    setEditingTaskIndex(index);
    setEditedTaskName(task.taskName);
    setEditedAssignee(task.assignedTo);
    setEditedSubmitByDate(task.submitByDate);
    setEditedStatus(task.status);
  };

  const handleSaveTask = (index) => {
    if (editedTaskName.trim() !== "" && editedAssignee && editedSubmitByDate && editedStatus) {
      const updatedTasks = [...assignedTasks];
      updatedTasks[index] = {
        taskName: editedTaskName,
        assignedTo: editedAssignee,
        submitByDate: editedSubmitByDate,
        status: editedStatus,
      };
      setAssignedTasks(updatedTasks);
      updateTasks(updatedTasks);
      setEditingTaskIndex(null);
      setEditedTaskName("");
      setEditedAssignee("");
      setEditedSubmitByDate("");
      setEditedStatus("");
    }
  };

  const handleCancelEditTask = () => {
    setEditingTaskIndex(null);
    setEditedTaskName("");
    setEditedAssignee("");
    setEditedSubmitByDate("");
    setEditedStatus("");
  };

  // Performance and history handlers
  const handleGetHistory = () => {
    if (selectedMember) {
      const history = getTaskHistory(selectedMember);
      if (history.length > 0) {
        setTaskHistory(history);
      } else {
        setTaskHistory([{ taskName: "No history found for this member.", status: "", submitByDate: "" }]);
      }
    }
  };

  const handleTrackPerformance = () => {
    const performanceData = trackTeamPerformance() || [];
    if (performanceData.length > 0) {
      setTeamPerformance(performanceData);
    } else {
      setTeamPerformance([{ member: "No performance data available.", tasksAssigned: 0, tasksCompleted: 0, performance: "N/A" }]);
    }
  };

  // Authentication handlers
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <h1>
        Admin Dashboard -{" "}
        {isEditingProjectName ? (
          <>
            <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
            <button onClick={handleEditProjectName}>Save</button>
            <button onClick={() => setIsEditingProjectName(false)}>Cancel</button>
          </>
        ) : (
          <>
            {projectName} <button className="edit-button" onClick={() => setIsEditingProjectName(true)}>Edit</button>
          </>
        )}
      </h1>

      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <h2>Project End Date: {projectEndDate} <button className="edit-button" onClick={() => setIsEditingEndDate(true)}>Edit</button></h2>

      {isEditingEndDate && (
        <div>
          <input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
          <button onClick={handleEditEndDate}>Save</button>
          <button onClick={() => setIsEditingEndDate(false)}>Cancel</button>
        </div>
      )}

      <h2>Team Members</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {editingMemberIndex === index ? (
              <>
                <input type="text" value={editedMemberName} onChange={(e) => setEditedMemberName(e.target.value)} />
                <button onClick={() => handleSaveMember(index)}>Save</button>
                <button onClick={handleCancelEditMember}>Cancel</button>
              </>
            ) : (
              <>
                {member}
                <button className="edit-button" onClick={() => handleEditMember(index, member)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteMember(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)} placeholder="Enter new member name" />
        <button onClick={handleAddMember}>Add Member</button>
      </div>

      <h3>Assigned Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Submit By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTasks.map((task, index) => (
            <tr key={index}>
              {editingTaskIndex === index ? (
                <>
                  <td><input type="text" value={editedTaskName} onChange={(e) => setEditedTaskName(e.target.value)} /></td>
                  <td>
                    <select value={editedAssignee} onChange={(e) => setEditedAssignee(e.target.value)}>
                      <option value="">Select Assignee</option>
                      {members.map((member, memberIndex) => (
                        <option key={memberIndex} value={member}>{member}</option>
                      ))}
                    </select>
                  </td>
                  <td><input type="date" value={editedSubmitByDate} onChange={(e) => setEditedSubmitByDate(e.target.value)} /></td>
                  <td>
                    <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSaveTask(index)}>Save</button>
                    <button onClick={handleCancelEditTask}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.taskName}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.submitByDate}</td>
                  <td>{task.status}</td>
                  <td><button className="edit-button" onClick={() => handleEditTask(index, task)}>Edit</button></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      

      <h2>Assign Tasks</h2>
      <div className="assign-tasks-form">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter task name" />
        <select value={selectedAssignee} onChange={(e) => setSelectedAssignee(e.target.value)}>
          <option value="">Select Assignee</option>
          {members.map((member, index) => (
            <option key={index} value={member}>{member}</option>
          ))}
        </select>
        <input type="date" value={submitByDate} onChange={(e) => setSubmitByDate(e.target.value)} />
        <button onClick={handleAssignTask}>Assign Task</button>
      </div>

      <h2>Get Task History</h2>
      <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
        <option value="">Select Member</option>
        {members.map((member, index) => (
          <option key={index} value={member}>{member}</option>
        ))}
      </select>
      <button onClick={handleGetHistory}>Get History</button>

      <ul>
        {taskHistory.map((task, index) => (
          <li key={index}>
            {task.taskName} {task.status && `- ${task.status}`} {task.submitByDate && `(Due: ${task.submitByDate})`}
          </li>
        ))}
      </ul>

      <h2>Track Team Performance</h2>
      <button onClick={handleTrackPerformance}>View Performance</button>

      <ul>
        {teamPerformance.map((performance, index) => (
          <li key={index}>
            {performance.member}: {performance.tasksAssigned} tasks assigned, {performance.tasksCompleted} completed - {performance.performance}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;