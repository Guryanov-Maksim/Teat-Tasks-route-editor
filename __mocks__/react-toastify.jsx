import React from 'react';

const toast = jest.fn();
toast.dismiss = jest.fn();
toast.update = jest.fn();
toast.TYPE = {
  ERROR: 'error',
};

const ToastContainer = () => <div className="ToastContainer" />;

export { toast, ToastContainer };
