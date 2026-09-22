import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({
  open,
  title = 'Are you sure?',
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Delete',
  danger = true,
}) => (
  <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
    {description && <p className="mb-6 text-sm text-charcoal-800">{description}</p>}
    <div className="flex justify-end gap-3">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onConfirm} className={danger ? '!bg-red-600 hover:!bg-red-700' : ''}>
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
