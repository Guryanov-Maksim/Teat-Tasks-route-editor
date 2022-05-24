import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const createToastApi = () => {
  const toastId = React.useRef({});
  const { t } = useTranslation();

  const notify = (id) => {
    toastId.current[id] = toast(t('toast.addressSearch'), { autoClose: false });
  };

  const dismiss = (id) => toast.dismiss(toastId.current[id]);

  const update = (id) => toast.update(toastId.current[id], {
    theme: 'colored',
    render: t('toast.searchError'),
    type: toast.TYPE.ERROR,
    autoClose: 5000,
  });

  return {
    notify,
    dismiss,
    update,
  };
};

const Toast = () => <ToastContainer position="bottom-right" />;

export { Toast, createToastApi };
