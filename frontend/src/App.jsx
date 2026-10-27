import { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import ConfirmModal from './components/ConfirmModal';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  errMsg,
} from './api/http';

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export default function App() {
  const [user, setUser] = useState(loadUser);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadEmployees = useCallback(async (term) => {
    setLoading(true);
    setError('');
    try {
      setEmployees(await getEmployees(term));
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search (only when logged in)
  useEffect(() => {
    if (!user) return;
    const t = setTimeout(() => loadEmployees(search), 300);
    return () => clearTimeout(t);
  }, [search, user, loadEmployees]);

  const handleLogin = (u) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const openForm = (emp = null) => {
    setEditing(emp);
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormError('');
  };

  const handleSubmit = async (data) => {
    setSaving(true);
    setFormError('');
    try {
      if (editing) await updateEmployee(editing._id, data);
      else await createEmployee(data);
      closeForm();
      loadEmployees(search);
    } catch (err) {
      setFormError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteEmployee(toDelete._id);
      setToDelete(null);
      loadEmployees(search);
    } catch (err) {
      setError(errMsg(err));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <>
      <nav className="navbar app-nav">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Employee Management</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">{user.name}</span>
            <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Sign out</button>
          </div>
        </div>
      </nav>

      <main className="container py-4">
         <div className="page-head">
    <h1>Employees</h1>
    <p>{employees.length} found</p>
  </div>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md">
            <input
              className="form-control"
              type="search"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-auto">
            <button className="btn btn-primary w-100" onClick={() => openForm()}>Add employee</button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <span>{error}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => loadEmployees(search)}>Try again</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
            <p className="text-muted mt-2">Loading employees…</p>
          </div>
        ) : employees.length === 0 && !error ? (
          <p className="text-center text-muted py-5">
            {search ? `No employees match “${search}”.` : 'No employees yet. Add your first one.'}
          </p>
        ) : (
          <EmployeeTable employees={employees} onEdit={openForm} onDelete={setToDelete} />
        )}
      </main>

      {showForm && (
        <EmployeeForm
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          saving={saving}
          serverError={formError}
        />
      )}
      {toDelete && (
        <ConfirmModal
          employee={toDelete}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
