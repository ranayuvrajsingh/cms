import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal';
import './ConfirmationModal.scss';

const ConfirmationModal = (props) => {
  const {
    className,
    children,
    type,
    width,
    onConfirm,
    onCancel,
    visible,
    title,
  } = props;
  return (
    <Modal
      visible={visible}
      keyboard={false}
      width={width}
      className={`ub-confirmation-modal ${className}`}
      title={<p className="size-26 weight-700">{title}</p>}
    >
      <div>{children}</div>
      <div className="flex">
        <Button onClick={onCancel} block type="link">
          Cancel
        </Button>
        <Button onClick={onConfirm} block type={type}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

Modal.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

Modal.defaultProps = {
  type: 'danger',
  width: '576px',
  className: '',
};

export default ConfirmationModal;
