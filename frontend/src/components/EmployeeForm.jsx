// import { useState, useEffect } from 'react';

// const empty = { name: '', email: '', department: '', salary: '' };

// function validate(v) {
//   const errors = {};
//   if (!v.name.trim()) errors.name = 'Name is required';
//   if (!v.email.trim()) errors.email = 'Email is required';
//   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'Enter a valid email';
//   if (!v.department.trim()) errors.department = 'Department is required';
//   if (v.salary === '' || Number(v.salary) <= 0) errors.salary = 'Salary must be greater than zero';
//   return errors;
// }

// export default function EmployeeForm({ editing, onSubmit, onCancel, saving, serverError }) {
//   const [values, setValues] = useState(empty);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setValues(editing ? { ...editing } : empty);
//     setErrors({});
//   }, [editing]);

//   const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errs = validate(values);
//     setErrors(errs);
//     if (Object.keys(errs).length) return;
//     onSubmit({
//       name: values.name,
//       email: values.email,
//       department: values.department,
//       salary: Number(values.salary),
//     });
//   };

//   const fields = [
//     ['name', 'Name', 'text'],
//     ['email', 'Email', 'email'],
//     ['department', 'Department', 'text'],
//     ['salary', 'Salary', 'number'],
//   ];

//   return (
//     <>
//       <div className="modal d-block" tabIndex="-1" role="dialog">
//         <div className="modal-dialog modal-dialog-centered">
//           <form className="modal-content" onSubmit={handleSubmit} noValidate>
//             <div className="modal-header">
//               <h5 className="modal-title">{editing ? 'Edit employee' : 'Add employee'}</h5>
//               <button type="button" className="btn-close" aria-label="Close" onClick={onCancel} />
//             </div>
//             <div className="modal-body">
//               {serverError && <div className="alert alert-danger py-2">{serverError}</div>}
//               {fields.map(([name, label, type]) => (
//                 <div className="mb-3" key={name}>
//                   <label className="form-label">{label}</label>
//                   <input
//                     className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
//                     name={name}
//                     type={type}
//                     min={name === 'salary' ? 1 : undefined}
//                     value={values[name]}
//                     onChange={handleChange}
//                   />
//                   {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
//                 </div>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
//               <button type="submit" className="btn btn-primary" disabled={saving}>
//                 {saving ? 'Saving…' : editing ? 'Save changes' : 'Add employee'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="modal-backdrop show" />
//     </>
//   );
// }
export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-responsive card">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th className="d-none d-md-table-cell">Email</th>
            <th>Department</th>
            <th className="text-end">Salary</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>
                <div className="emp-cell">
                  <span className="avatar">{emp.name.trim().charAt(0).toUpperCase()}</span>
                  <span className="emp-name">{emp.name}</span>
                </div>
              </td>
              <td className="d-none d-md-table-cell">{emp.email}</td>
              <td><span className="dept-badge">{emp.department}</span></td>
              <td className="text-end">{Number(emp.salary).toLocaleString('en-IN')}</td>
              <td className="text-end text-nowrap">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}