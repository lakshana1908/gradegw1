import React, { useState } from 'react';
import '../styles/StudentComponent.css';

const StudentComponent = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [submarks, setSubmarks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Mocking an authentication check for now
      const response = await fetch(`http://localhost:8085/api/student/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber, password }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        fetchStudentMarks(registerNumber);
      } else {
        setError('Invalid register number or password.');
      }
    } catch (err) {
      console.error('Error authenticating:', err);
      setError('An error occurred while logging in.');
    }
  };

  const fetchStudentMarks = async (registerNumber) => {
    try {
      const response = await fetch(`http://localhost:8085/api/marks/${registerNumber}/submarks`);
      if (response.ok) {
        const data = await response.json();
        setSubmarks(data || []); // Set data directly as submarks
      } else {
        setError('Failed to fetch student marks.');
      }
    } catch (error) {
      console.error('Error fetching student marks:', error);
      setSubmarks([]);
    }
  };


  return (
    <div className="student-page">
      {!isAuthenticated ? (
        <div className="login-container">
          <h2>Student Login</h2>
          <input
            type="text"
            placeholder="Register Number"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleLogin} className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Subject Marks</h2>
          {submarks.length > 0 ? (
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {submarks.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.mark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No marks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentComponent;
