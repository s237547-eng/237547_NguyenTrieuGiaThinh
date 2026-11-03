import React, { useState, useEffect } from 'react';

// Chuyển sang import.meta.env cho Vite
const API_URL = 'https://api-237547.onrender.com/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ employeeId: '', fullName: '', email: '', department: '', status: 'Active' });

  const fetchEmployees = async (searchQuery = '') => {
    try {
      const res = await fetch(`${API_URL}/employees?search=${searchQuery}`);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchEmployees(e.target.value);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      alert('Thêm thành công!');
      fetchEmployees();
    } catch (error) {
      alert('Lỗi thêm nhân viên');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý nhân sự</h1>
      
      <input type="text" placeholder="Tìm kiếm mã hoặc tên..." value={search} onChange={handleSearch} />
      
      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <input name="employeeId" placeholder="Mã NV" onChange={handleChange} required />
        <input name="fullName" placeholder="Họ Tên" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="department" placeholder="Phòng ban" onChange={handleChange} />
        <button type="submit">Thêm Nhân Viên</button>
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Phòng ban</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => handleDelete(emp._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;