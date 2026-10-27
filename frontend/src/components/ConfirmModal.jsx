export default function ConfirmModal({ employee, onConfirm, onCancel, busy }) {
  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="alertdialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete employee</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onCancel} />
            </div>
            <div className="modal-body">
              Delete <strong>{employee.name}</strong>? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
              <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>
                {busy ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
