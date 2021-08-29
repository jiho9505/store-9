import { useState } from 'react';
import { showErrorMsgTime } from '@/static/constants';

type AlertInfo = {
  mode?: 'caution' | 'fail' | 'success';
  msg?: string;
};

const useAlert = () => {
  const [isShow, setShow] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    mode: 'caution',
    msg: '',
  });

  const showAlert = (info) => {
    if (Object.keys(info).length !== 0) {
      setAlertInfo(info);
    }
    setShow(true);
  };

  const unShowAlert = () => {
    setShow(false);
  };

  const showAndUnShowAlert = (info: AlertInfo = {}) => {
    showAlert(info);
    setTimeout(() => {
      unShowAlert();
    }, showErrorMsgTime);
  };

  return { isShow, alertInfo, showAndUnShowAlert };
};

export default useAlert;
