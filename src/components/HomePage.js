import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip'; // Import Radix Tooltip
import studentImage from '../assets/student.jpeg';
import staffImage from '../assets/staff.jpeg';
import '../styles/HomePage.css'; // Ensure this path is correct

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="options">
        <div className="option">
          {/* Radix Tooltip for Student Image */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <img
                  src={studentImage}
                  alt="Student"
                  className="option-image"
                  onClick={() => navigate("/student")}
                  style={{ cursor: 'pointer', width: '200px', height: '200px' }}
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="tooltip-content">
                  <Tooltip.Arrow className="tooltip-arrow" />
                  Go to Student Portal
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <p>Student</p>
        </div>

        <div className="option">
          {/* Radix Tooltip for Staff Image */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <img
                  src={staffImage}
                  alt="Staff"
                  className="option-image"
                  onClick={() => navigate("/staff")}
                  style={{ cursor: 'pointer', width: '200px', height: '200px' }}
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="tooltip-content">
                  <Tooltip.Arrow className="tooltip-arrow" />
                  Go to Staff Upload Portal
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <p>Staff</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
//tatatdaaa