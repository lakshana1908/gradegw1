import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import * as Dialog from '@radix-ui/react-dialog'; // Import Radix Dialog
import '../styles/StaffComponent.css'; // Ensure the CSS file exists

const StaffComponent = () => {
  const [file, setFile] = useState(null);
  const [dataToSend, setDataToSend] = useState([]);
  const [subjectCode, setSubjectCode] = useState('');
  const [duplicateAlertOpen, setDuplicateAlertOpen] = useState(false); // State for duplicate alert
  const [subjectCodeAlertOpen, setSubjectCodeAlertOpen] = useState(false); // State for subject code alert

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      extractRelevantData(data);
    };

    reader.readAsBinaryString(file);
  };

  //To handle missing values
  const extractRelevantData = (data) => {
    const extractedData = data.map((row) => ({
      registerNumber: row.REGISTER_NUMBER,
      totalMark: row.TOTAL_MARKS,
      subjectCode: subjectCode,
    }));

    const extractRelevantData = (data) => {
      const missingEntries = [];
      const extractedData = [];
    
      data.forEach((row, index) => {
        const registerNumber = row.REGISTER_NUMBER;
        const totalMarks = row.TOTAL_MARKS;
    
        if (!registerNumber || !totalMarks) {
          missingEntries.push({ index: index + 1, registerNumber, totalMarks });
        } else {
          extractedData.push({
            registerNumber: row.REGISTER_NUMBER,
            totalMark: row.TOTAL_MARKS,
            subjectCode: subjectCode,
          });
        }
      });
    
      if (missingEntries.length > 0) {
        alertMissingValues(missingEntries);  // Alert for missing data
      }
    
      setDataToSend(extractedData);
    };
    
    // Function to handle missing value alert using Radix UI
    const alertMissingValues = (missingEntries) => {
      const message = missingEntries
        .map((entry) =>
          `Row ${entry.index}: Missing ${!entry.registerNumber ? 'REGISTER_NUMBER' : ''} ${!entry.totalMarks ? 'TOTAL_MARKS' : ''}`
        )
        .join('\n');
    
      // Show the alert using Radix Dialog or any other preferred method
      alert(`Missing values found in the following rows:\n${message}`);
    };
    

    // Check for duplicates
    const registerNumbers = extractedData.map(item => item.registerNumber);
    const hasDuplicates = registerNumbers.length !== new Set(registerNumbers).size;

    if (hasDuplicates) {
      setDuplicateAlertOpen(true); // Open the duplicate alert
    } else {
      setDataToSend(extractedData); // Set the data if no duplicates
    }
  };

  const checkSubjectCodeExists = async () => {
    const response = await fetch(`http://localhost:8080/api/marks/subjectcode/${subjectCode}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const exists = await response.json();
    return exists; // Assuming the API returns true/false
  };

  const handleReset = () => {
    setFile(null);
    setDataToSend([]);
    setSubjectCode('');
  };

  const handleSubmit = async () => {
    if (dataToSend.length === 0) {
      alert("No data to send. Please upload an Excel file.");
      return;
    }

    // Check if the subject code exists
    try {
      const subjectExists = await checkSubjectCodeExists();
      if (subjectExists) {
        setSubjectCodeAlertOpen(true); // Open the subject code alert
        return;
      }
    } catch (error) {
      alert('Error checking subject code: ' + error.message);
      return;
    }

    // Proceed to submit the data if no issues
    fetch('http://localhost:8080/api/marks/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectCode: subjectCode, data: dataToSend }),
    })
      .then(response => response.text())
      .then(data => alert('Data sent successfully: ' + data))
      .catch((error) => alert('Error sending data: ' + error.message));
  };

  return (
    <div className="upload-container">
      <div className="center-frame">
        <h2>Upload Subject Marks</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Enter Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
        />

        <input
          type="file"
          id="file-input"
          className="file-input"
          accept=".xls, .xlsx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Choose an Excel File'}
        </label>

        <div>
          <button className="button reset-button" onClick={handleReset}>Reset</button>

          {/* Radix Dialog for Submission Confirmation */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="button">Submit</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Dialog.Title>Confirm Submission</Dialog.Title>
                <Dialog.Description>Are you sure you want to submit the data?</Dialog.Description>
                <button onClick={handleSubmit} className="button">Yes, Submit</button>
                <Dialog.Close asChild>
                  <button className="button">Cancel</button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {dataToSend.length > 0 && (
          <div>
            <h3>Extracted Register Numbers and Total Marks</h3>
            <ul>
              {dataToSend.map((item, index) => (
                <li key={index}>{item.registerNumber} - {item.totalMark}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Radix Dialog for Duplicate Alert */}
        <Dialog.Root open={duplicateAlertOpen} onOpenChange={setDuplicateAlertOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title>Duplicate Register Numbers</Dialog.Title>
              <Dialog.Description>Duplicate register numbers are not allowed. Please check your Excel file.</Dialog.Description>
              <Dialog.Close asChild>
                <button className="button">Close</button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Radix Dialog for Subject Code Alert */}
        <Dialog.Root open={subjectCodeAlertOpen} onOpenChange={setSubjectCodeAlertOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title>Subject Code Exists</Dialog.Title>
              <Dialog.Description>The subject code already exists in the database. Please enter a different code.</Dialog.Description>
              <Dialog.Close asChild>
                <button className="button">Close</button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default StaffComponent;
