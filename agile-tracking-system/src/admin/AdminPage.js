import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  // Sample project data with statuses
  const [projects, setProjects] = useState([
    { id: 1, name: "Inventory Management Upgrade", endDate: "TBD", status: "In Progress", review: "" },
    { id: 2, name: "Customer Feedback Analysis", endDate: "2025-02-15", status: "Completed", review: "Successfully analyzed feedback trends, leading to improved customer experience." },
    { id: 3, name: "Website Redesign", endDate: "2025-01-10", status: "Completed", review: "Revamped UI/UX, increasing user engagement by 30%." },
  ]);

  const [newProject, setNewProject] = useState("");
  const [selectedProject, setSelectedProject] = useState(null); // Store selected project details

  // Add a new project (added to "Completed" by default for demo)
  const addProject = () => {
    if (newProject.trim() !== "") {
      setProjects([...projects, { id: projects.length + 1, name: newProject, endDate: "TBD", status: "Completed", review: "Newly added project with no review yet." }]);
      setNewProject("");
    }
  };

  // Show project details if completed or navigate to in progress project
  const showProjectDetails = (project) => {
    if (project.status === "Completed") {
      setSelectedProject(project);
    } else if (project.status === "In Progress") {
      navigate('/test-dashboard'); // Navigate to test dashboard
    }
  };

  // Filter projects: Get the first In Progress project separately
  const inProgressProject = projects.find(project => project.status === "In Progress");
  const completedProjects = projects.filter(project => project.status === "Completed");

  return (
    <div style={{ padding: "20px", backgroundColor: "#F7F5FF", minHeight: "100vh" }}>
      <h2 style={{ color: "#333", marginBottom: "30px", textAlign: "center" }}>Admin Projects</h2>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        
        {/* To Be Completed Section (Single In Progress Project) */}
        {inProgressProject && (
          <>
            <h3 style={{ color: "#444", marginBottom: "20px" }}>To Be Completed</h3>
            <button 
              onClick={() => showProjectDetails(inProgressProject)} 
              style={{ 
                display: "block", width: "100%", padding: "12px", 
                backgroundColor: "#FFA500", color: "white", border: "none", 
                borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s" 
              }}
            >
              {inProgressProject.name} (In Progress)
            </button>
            <hr style={{ margin: "20px 0", border: "0.5px solid #ddd" }} />
          </>
        )}

        {/* Completed Projects Section */}
        <h3 style={{ color: "#444", marginBottom: "20px" }}>Completed Projects</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {completedProjects.map(project => (
            <li key={project.id} style={{ marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button 
                onClick={() => showProjectDetails(project)} 
                style={{ 
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s"
                }}
              >
                {project.name}
              </button>
              <span style={{ color: "#666" }}>({project.endDate})</span>
            </li>
          ))}
        </ul>

        {/* Add New Project */}
        <h3 style={{ color: "#444", marginTop: "30px", marginBottom: "20px" }}>Add New Project</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="Enter project name" 
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              flex: 1
            }}
          />
          <button 
            onClick={addProject}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          >
            Add Project
          </button>
        </div>

        {/* Logout Button */}
        <button 
          onClick={() => { localStorage.removeItem("adminLoggedIn"); navigate('/'); }} 
          style={{ 
            display: "block",
            width: "100%",
            padding: "12px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginTop: "30px"
          }}
        >
          Logout
        </button>
      </div>

      {/* Project Details Modal for Completed Projects */}
      {selectedProject && (
        <div style={{
          position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "white", padding: "20px", borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", maxWidth: "500px"
          }}>
            <h2 style={{ color: "#333" }}>{selectedProject.name} - Details</h2>
            <p><strong>End Date:</strong> {selectedProject.endDate}</p>
            <p><strong>Review:</strong> {selectedProject.review}</p>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{ 
                marginTop: "10px", padding: "10px 15px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;