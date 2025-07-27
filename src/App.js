import React, { useState } from 'react';
import { Menu, X, User, Mail, Lock, Check, AlertCircle } from 'lucide-react';
import './App.css'; // Import the new CSS file

// Task 3: UserCard Component
const UserCard = ({ name, email }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-card-avatar">
          <User />
        </div>
        <div className="user-card-info">
          <h3>{name}</h3>
          <p>
            <Mail />
            {email}
          </p>
        </div>
      </div>
      <div className="user-card-footer">
        <Check />
        Active User
      </div>
    </div>
  );
};

// Task 2: Navigation Bar Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-logo">Sign-form</div>
        <div className="nav-links-desktop">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="md-hidden">
          <button onClick={toggleMenu} className="mobile-menu-button">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="nav-links-mobile">
          <div style={{ padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// Task 1: Sign-Up Form Component
const SignUpForm = ({ onSignUp }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onSignUp(formData);
      setIsSubmitting(false);
      setFormData({ fullName: '', email: '', password: '' });
    }, 1000);
  };

  return (
    <div className="signup-form-container">
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Join us today and get started!</p>
      </div>
      <form onSubmit={handleSubmit} className="form-fields">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`form-input ${errors.fullName ? 'error' : ''}`} placeholder="Enter your full name" />
          </div>
          {errors.fullName && <div className="error-message"><AlertCircle />{errors.fullName}</div>}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <Mail className="input-icon" />
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="Enter your email" />
          </div>
          {errors.email && <div className="error-message"><AlertCircle />{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`form-input ${errors.password ? 'error' : ''}`} placeholder="Create a password" />
          </div>
          {errors.password && <div className="error-message"><AlertCircle />{errors.password}</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? (
            <div className="submit-button-content">
              <div className="spinner"></div>
              Creating Account...
            </div>
          ) : 'Sign Up'}
        </button>
      </form>
      <p className="form-footer-text">
        Already have an account? <a href="#login">Sign in</a>
      </p>
    </div>
  );
};

// Main App Component
const App = () => {
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState('signup');

  const handleSignUp = (userData) => {
    setUsers(prev => [...prev, userData]);
    setCurrentView('users');
  };

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="view-toggle-container">
          <div className="view-toggle">
            <button onClick={() => setCurrentView('signup')} className={`view-toggle-button ${currentView === 'signup' ? 'active' : ''}`}>
              Sign Up
            </button>
            <button onClick={() => setCurrentView('users')} className={`view-toggle-button ${currentView === 'users' ? 'active' : ''}`}>
              Users ({users.length})
            </button>
          </div>
        </div>
        {currentView === 'signup' ? (
          <SignUpForm onSignUp={handleSignUp} />
        ) : (
          <div>
            <h2 className="page-title">Registered Users</h2>
            {users.length === 0 ? (
              <div className="empty-state">
                <User />
                <p>No users registered yet</p>
                <button onClick={() => setCurrentView('signup')} className="empty-state-button">
                  Create your first account →
                </button>
              </div>
            ) : (
              <div className="users-grid">
                {users.map((user, index) => (
                  <UserCard key={index} name={user.fullName} email={user.email} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy;  All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
