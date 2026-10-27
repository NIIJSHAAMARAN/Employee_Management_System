export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-responsive card shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th className="text-end">Salary</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td><span className="badge text-bg-secondary">{emp.department}</span></td>
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
