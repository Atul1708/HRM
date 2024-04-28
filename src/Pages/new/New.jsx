import { useState, useEffect } from 'react'
import './New.scss'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import PersonAddAlt1SharpIcon from '@mui/icons-material/PersonAddAlt1Sharp';
import Endpoint from '../../api'
import axios from 'axios'

const New = ({ title }) => {

  const [file, setFile] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic input validation
    if (!email || !phone || !name || !jobrole || !joiningDate || !password) {
      setError("All fields are required.");
      return;
    }

    addEmployee(name, email, password, phone, jobrole, joiningDate, image);
  };


  const handleCloseError = () => {
    setError(null);
  };


  const addEmployee = (name, email, password, phone, jobrole, joiningDate) => {
    const url = `${Endpoint}/api/addEmployee/`;
    const payload = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      jobrole: jobrole,
      joiningDate: joiningDate,
    };

    axios
      .post(url, payload)
      .then((res) => {
        setData(res.data);
        setSuccessMessage("Employee added successfully.");
        setEmail("");
        setPhone("");
        setName("");
        setJobRole("");
        setJoiningDate("");
        setPassword("");
        setImage("");
        setError("");
      })
      .catch((err) => {
        setError("An error occurred while adding the employee.");
        console.error("error", err);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const successTimeout = setTimeout(() => {
        setSuccessMessage('');
      }, 4000);

      return () => clearTimeout(successTimeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError('');
      }, 4000);

      return () => clearTimeout(errorTimeout);
    }
  }, [error]);


  const availableJobRoles = ["Frontend", "Backend", "UI/UX"];

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h2>{title} <PersonAddAlt1SharpIcon className='icon'/></h2>
        </div>
        <div className="bottom">
          <div className="left">
            <label></label>
            <img src={file ? URL.createObjectURL(file) : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="formInput">
                <label htmlFor="file">Image: <DriveFolderUploadOutlinedIcon className='icon' /> </label>
                <input type="file" name='uploads' id='file' style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <div className="formInput">
                <label>Phone Number:</label>
                <input type="number" placeholder="+123 456 78" onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Name:</label>
                <input type="text" placeholder="xyz" onChange={e => setName(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Email:</label>
                <input type="email" placeholder="xyz@gmail.com" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Password:</label>
                <input type="text" placeholder="****" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Role:</label> 
                <select value={jobrole} onChange={(e) => setJobRole(e.target.value)}>
                  {availableJobRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select> 
              </div>

              <div className="formInput">
                <label htmlFor='date'>Joining Date:</label>
                <input type="date" placeholder="date" id='date' onChange={e => setJoiningDate(e.target.value)} />
              </div>

              <button type='Submit'>Add Employee</button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
