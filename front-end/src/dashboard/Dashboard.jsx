import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Authentication check
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // UI state
  const [activeTab, setActiveTab] = useState("feed");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Core data states
  const [userProfile, setUserProfile] = useState(null);
  const [tasksFeed, setTasksFeed] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Form states for creating a task
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskLoc, setTaskLoc] = useState("");
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");
  const [taskPic, setTaskPic] = useState("");

  // Settings form states
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  // Common config for axios requests
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (token) {
      loadProfile();
      loadFeed();
      loadMyTasks();
      loadReceivedRequests();
      loadSentRequests();
      loadNotifications();
    }
  }, [token]);

  // Loaders
  async function loadProfile() {
    try {
      const response = await axios.get("http://localhost:8080/auth/profile", axiosConfig);
      setUserProfile(response.data);
      setEditFirstName(response.data.firstName || "");
      setEditLastName(response.data.lastName || "");
      setEditPhone(response.data.phoneNumber || "");
      setEditAvatar(response.data.profilePicture || "");
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  }

  async function loadFeed() {
    try {
      const response = await axios.get("http://localhost:8080/tasks", axiosConfig);
      setTasksFeed(response.data);
    } catch (error) {
      console.error("Failed to load task feed", error);
    }
  }

  async function loadMyTasks() {
    try {
      const response = await axios.get("http://localhost:8080/tasks/my", axiosConfig);
      setMyTasks(response.data);
    } catch (error) {
      console.error("Failed to load my tasks", error);
    }
  }

  async function loadReceivedRequests() {
    try {
      const response = await axios.get("http://localhost:8080/requests/received", axiosConfig);
      setReceivedRequests(response.data);
    } catch (error) {
      console.error("Failed to load received requests", error);
    }
  }

  async function loadSentRequests() {
    try {
      const response = await axios.get("http://localhost:8080/requests/sent", axiosConfig);
      setSentRequests(response.data);
    } catch (error) {
      console.error("Failed to load sent requests", error);
    }
  }

  async function loadNotifications() {
    try {
      const response = await axios.get("http://localhost:8080/notifications", axiosConfig);
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  }

  // Task posting
  async function handleCreateTask(e) {
    e.preventDefault();
    if (!taskTitle || !taskDesc || !taskLoc || !taskStart) {
      alert("Please fill in required task details");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/tasks",
        {
          title: taskTitle,
          description: taskDesc,
          location: taskLoc,
          startTime: taskStart,
          endTime: taskEnd,
          picture: taskPic
        },
        axiosConfig
      );

      alert("Task Posted Successfully!");
      setShowAddTaskModal(false);
      // Reset form
      setTaskTitle("");
      setTaskDesc("");
      setTaskLoc("");
      setTaskStart("");
      setTaskEnd("");
      setTaskPic("");

      // Reload
      loadMyTasks();
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task");
    }
  }

  // Requesting to help on a task
  async function handleRequestHelp(taskId) {
    try {
      await axios.post(
        "http://localhost:8080/requests",
        { taskId },
        axiosConfig
      );
      alert("Help request sent successfully!");
      loadFeed();
      loadSentRequests();
    } catch (error) {
      console.error("Failed to request help", error);
      alert(error.response?.data?.message || "Failed to send help request");
    }
  }

  // Accepting or Rejecting request
  async function handleUpdateRequestStatus(requestId, status) {
    try {
      await axios.put(
        `http://localhost:8080/requests/${requestId}/status?status=${status}`,
        {},
        axiosConfig
      );
      alert(`Request ${status.toLowerCase()} successfully!`);
      loadReceivedRequests();
      loadFeed();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update request status");
    }
  }

  // Mark notification as read
  async function handleMarkNotificationRead(id) {
    try {
      await axios.put(`http://localhost:8080/notifications/${id}/read`, {}, axiosConfig);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  }

  // Update Profile / Settings
  async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8080/auth/profile",
        {
          firstName: editFirstName,
          lastName: editLastName,
          phoneNumber: editPhone,
          profilePicture: editAvatar
        },
        axiosConfig
      );
      alert("Profile updated successfully!");
      loadProfile();
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile details");
    }
  }

  // Check if task is already requested
  function isTaskRequested(taskId) {
    return sentRequests.some(r => r.task.id === taskId);
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <div className="sidebar-header">
            {userProfile && (
              <div className="sidebar-profile">
                <img
                  src={userProfile.profilePicture || "https://i.pravatar.cc/150?img=33"}
                  alt="avatar"
                  className="sidebar-avatar"
                />
                <div className="sidebar-user-info">
                  <h4>{userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : userProfile.username}</h4>
                  <p>{userProfile.email}</p>
                </div>
              </div>
            )}
            <button className="toggle-sidebar-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          <nav className="sidebar-nav">
            <button className={`nav-item ${activeTab === "feed" ? "active" : ""}`} onClick={() => setActiveTab("feed")}>
              <span className="icon">📋</span> {isSidebarOpen && "Find Tasks"}
            </button>
            <button className={`nav-item ${activeTab === "my-tasks" ? "active" : ""}`} onClick={() => setActiveTab("my-tasks")}>
              <span className="icon">🛠️</span> {isSidebarOpen && "My Tasks"}
            </button>
            <button className={`nav-item ${activeTab === "received-requests" ? "active" : ""}`} onClick={() => setActiveTab("received-requests")}>
              <span className="icon">📥</span> {isSidebarOpen && "Received Requests"}
              {receivedRequests.filter(r => r.status === "PENDING").length > 0 && isSidebarOpen && (
                <span className="badge-count">{receivedRequests.filter(r => r.status === "PENDING").length}</span>
              )}
            </button>
            <button className={`nav-item ${activeTab === "sent-requests" ? "active" : ""}`} onClick={() => setActiveTab("sent-requests")}>
              <span className="icon">📤</span> {isSidebarOpen && "My Requests"}
            </button>
            <button className={`nav-item ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>
              <span className="icon">🔔</span> {isSidebarOpen && "Notifications"}
              {notifications.filter(n => !n.read).length > 0 && isSidebarOpen && (
                <span className="badge-count alert">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>
            <button className={`nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
              <span className="icon">⚙️</span> {isSidebarOpen && "Settings"}
            </button>
          </nav>
        </aside>

        {/* CONTENT PANEL */}
        <main className="dashboard-content">
          {/* Active Panel View */}
          {activeTab === "feed" && (
            <div className="content-section">
              <div className="section-header">
                <h2>Browse Available Tasks</h2>
                <p>Help others in your community and earn rewards</p>
              </div>

              <div className="tasks-grid">
                {tasksFeed.length === 0 ? (
                  <p className="no-data">No tasks available in your area right now.</p>
                ) : (
                  tasksFeed.map(task => (
                    <div className="task-card" key={task.id}>
                      {task.picture && <img src={task.picture} alt={task.title} className="task-card-img" />}
                      <div className="task-card-body">
                        <h3>{task.title}</h3>
                        <p className="task-desc">{task.description}</p>
                        <div className="task-meta">
                          <span>📍 {task.location}</span>
                          <span>⏰ {task.startTime}</span>
                        </div>
                        <div className="task-author">
                          <img src={task.creator.profilePicture || "https://i.pravatar.cc/150?img=12"} alt="creator" />
                          <span>Posted by {task.creator.username}</span>
                        </div>
                        
                        {isTaskRequested(task.id) ? (
                          <button className="btn-requested" disabled>Requested</button>
                        ) : (
                          <button className="btn-request" onClick={() => handleRequestHelp(task.id)}>
                            Request to Help
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "my-tasks" && (
            <div className="content-section">
              <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2>My Created Tasks</h2>
                  <p>Manage and track tasks you have posted</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddTaskModal(true)}>
                  + Post New Task
                </button>
              </div>

              <div className="my-tasks-list">
                {myTasks.length === 0 ? (
                  <p className="no-data">You have not created any tasks yet.</p>
                ) : (
                  myTasks.map(task => (
                    <div className="my-task-item" key={task.id}>
                      <div className="my-task-details">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <small>📍 {task.location} | ⏰ {task.startTime}</small>
                      </div>
                      <div className="my-task-status">
                        <span className={`status-badge ${task.status?.toLowerCase() || "pending"}`}>
                          {task.status || "PENDING"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "received-requests" && (
            <div className="content-section">
              <div className="section-header">
                <h2>Incoming Helper Requests</h2>
                <p>Accept or reject offers from other users to complete your tasks</p>
              </div>

              <div className="requests-list">
                {receivedRequests.length === 0 ? (
                  <p className="no-data">No help requests received yet.</p>
                ) : (
                  receivedRequests.map(req => (
                    <div className="request-item-card" key={req.id}>
                      <div className="request-info">
                        <div className="requester-profile">
                          <img src={req.requester.profilePicture || "https://i.pravatar.cc/150?img=5"} alt="requester" />
                          <div>
                            <h4>{req.requester.firstName ? `${req.requester.firstName} ${req.requester.lastName}` : req.requester.username}</h4>
                            <p>📞 {req.requester.phoneNumber || "No phone added"}</p>
                            <p>✉️ {req.requester.email}</p>
                          </div>
                        </div>
                        <div className="request-target-task">
                          <p>Wants to help with task: <strong>{req.task.title}</strong></p>
                          <small>Location: {req.task.location}</small>
                        </div>
                      </div>

                      <div className="request-actions-status">
                        {req.status === "PENDING" ? (
                          <div className="action-buttons">
                            <button className="btn-accept" onClick={() => handleUpdateRequestStatus(req.id, "ACCEPTED")}>Accept</button>
                            <button className="btn-reject" onClick={() => handleUpdateRequestStatus(req.id, "REJECTED")}>Reject</button>
                          </div>
                        ) : (
                          <span className={`status-badge ${req.status.toLowerCase()}`}>
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "sent-requests" && (
            <div className="content-section">
              <div className="section-header">
                <h2>My Help Requests</h2>
                <p>Track status of offers you made to help others</p>
              </div>

              <div className="my-tasks-list">
                {sentRequests.length === 0 ? (
                  <p className="no-data">You haven't requested to help on any tasks yet.</p>
                ) : (
                  sentRequests.map(req => (
                    <div className="my-task-item" key={req.id}>
                      <div className="my-task-details">
                        <h4>{req.task.title}</h4>
                        <p>Posted by: {req.task.creator.username}</p>
                        <small>📍 {req.task.location} | ⏰ {req.task.startTime}</small>
                      </div>
                      <div className="my-task-status">
                        <span className={`status-badge ${req.status.toLowerCase()}`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="content-section">
              <div className="section-header">
                <h2>Notifications Panel</h2>
                <p>Updates on task helper requests and allocations</p>
              </div>

              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <p className="no-data">No notifications yet.</p>
                ) : (
                  notifications.map(notif => (
                    <div className={`notification-item ${notif.read ? "read" : "unread"}`} key={notif.id}>
                      <p>{notif.body}</p>
                      <div className="notif-actions">
                        <span className="notif-time">⏰ {new Date(notif.createdAt).toLocaleDateString()}</span>
                        {!notif.read && (
                          <button className="btn-read-mark" onClick={() => handleMarkNotificationRead(notif.id)}>
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="content-section">
              <div className="section-header">
                <h2>Profile Settings</h2>
                <p>Update your personal information and profile photo</p>
              </div>

              <form className="settings-form-layout" onSubmit={handleUpdateProfile}>
                <div className="form-group-row">
                  <div className="form-input-box">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-input-box">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-input-box">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>

                <div className="form-input-box">
                  <label>Profile Picture URL</label>
                  <input
                    type="text"
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "15px" }}>
                  Save Profile Details
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ADD TASK MODAL OVERLAY */}
      {showAddTaskModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Post a New Task</h3>
              <button className="btn-close-modal" onClick={() => setShowAddTaskModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreateTask} className="modal-form">
              <label>Task Title *</label>
              <input
                type="text"
                placeholder="e.g. Lawn mowing or Furniture assembly"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />

              <label>Description *</label>
              <textarea
                placeholder="Describe what needs to be done..."
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                required
              />

              <label>Location *</label>
              <input
                type="text"
                placeholder="e.g. 123 Main St, Springfield"
                value={taskLoc}
                onChange={(e) => setTaskLoc(e.target.value)}
                required
              />

              <div className="form-row">
                <div>
                  <label>Start Date/Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow 10:00 AM"
                    value={taskStart}
                    onChange={(e) => setTaskStart(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>End Date/Time (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow 2:00 PM"
                    value={taskEnd}
                    onChange={(e) => setTaskEnd(e.target.value)}
                  />
                </div>
              </div>

              <label>Optional Task Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/... or leave blank"
                value={taskPic}
                onChange={(e) => setTaskPic(e.target.value)}
              />

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;