import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TestDashboard = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();


  const initialProjectName = "Project Alpha";
  const initialMembers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  const initialTasks = [
    { id: 101, name: "Design UI", assignee: 1, status: "Completed", submitBy: "2023-12-15" },
    { id: 102, name: "Backend API", assignee: 2, status: "In Progress", submitBy: "2023-12-22" },
    { id: 103, name: "Database Setup", assignee: 3, status: "Pending", submitBy: "2023-12-29" },
    { id: 104, name: "Testing", assignee: 1, status: "In Progress", submitBy: "2024-01-05" },
  ];
  const initialEndDate = "2024-01-15";

  // State
  const [projectName, setProjectName] = useState(initialProjectName);
  const [members, setMembers] = useState(initialMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [newMember, setNewMember] = useState("");
  const [newTask, setNewTask] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [submitByDate, setSubmitByDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState(initialEndDate);
  const [taskHistory, setTaskHistory] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#4CAF50'],
    }]
  });

  useEffect(() => {
    updateProjectProgress();
  }, [tasks]);

  const updateProjectProgress = () => {
    const pending = tasks.filter(task => task.status === 'Pending').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const completed = tasks.filter(task => task.status === 'Completed').length;

    setChartData({
      labels: ['Pending', 'In Progress', 'Completed'],
      datasets: [{
        data: [pending, inProgress, completed],
        backgroundColor: ['#FF6384', '#36A2EB', '#4CAF50'],
      }]
    });
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      setMembers([...members, { id: Date.now(), name: newMember }]);
      setNewMember("");
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedAssignee && submitByDate) {
      setTasks([...tasks, { id: Date.now(), name: newTask, assignee: parseInt(selectedAssignee), status: "Pending", submitBy: submitByDate }]);
      setNewTask("");
      setSelectedAssignee("");
      setSubmitByDate("");
    }
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const handleNavigateToTask = (taskId) => {
    navigate(`/test-dashboard/${taskId}`);
  };

  const styles = {
    dashboard: { padding: '20px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' },
    td: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' },
    chartContainer: { width: '300px', height: '300px', margin: 'auto' },
  };

  return (
    <div style={styles.dashboard}>
      <h1>{projectName} Dashboard</h1>

      <h2>Project End Date: {projectEndDate}</h2>

      <div>
        <h2>Team Members</h2>
        <ul>
          {members.map(member => <li key={member.id}>{member.name}</li>)}
        </ul>
        <input type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)} placeholder="New Member Name" />
        <button onClick={handleAddMember}>Add Member</button>
      </div>

      <div>
        <h2>Tasks</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Task</th>
              <th style={styles.th}>Assignee</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Submit By</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={styles.td}>{task.name}</td>
                <td style={styles.td}>{members.find(member => member.id === task.assignee)?.name || "N/A"}</td>
                <td style={styles.td}>{task.status}</td>
                <td style={styles.td}>{task.submitBy}</td>
                <td style={styles.td}>
                  {task.status === "In Progress" && <button onClick={() => handleNavigateToTask(task.id)}>View</button>}
                  <select value={task.status} onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
        <select value={selectedAssignee} onChange={(e) => setSelectedAssignee(e.target.value)}>
          <option value="">Select Assignee</option>
          {members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)}
        </select>
        <input type="date" value={submitByDate} onChange={(e) => setSubmitByDate(e.target.value)} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <h2>Member History</h2>
        {/* Display member history here */}
      </div>

      <div style={styles.chartContainer}>
        <h2>Project Progress</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default TestDashboard;