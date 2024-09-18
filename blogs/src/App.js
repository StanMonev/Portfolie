// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import BlogPost from './components/BlogPost';
import LoginPage from './components/LoginPage';
import UserPanelPage from './components/UserPanelPage';
import BlogEditor from './components/BlogEditorPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); // Default to 'light'

  // Set the theme based on local storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme === 'dark' ? 'dark-theme' : 'light-theme';
    } else {
      // If no theme is stored, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.body.className = initialTheme === 'dark' ? 'dark-theme' : 'light-theme';
    }
  }, []);

  // Toggle theme and save preference to local storage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', newTheme); // Save preference
  };

  return (
    <Router>
      <div className={theme}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-panel" element={<UserPanelPage />} />
          <Route path="/blog-editor" element={<BlogEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
