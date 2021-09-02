import React from "react";
import { bool, string, func, shape } from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./ConfirmModal.module.css";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  data,
  title,
  confirmButton,
  cancelButton,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
    >
      <h2>{t(title, { name: data.name || "" })}</h2>
      <div className={styles.buttons}>
        <button
          className={styles.submit}
          onClick={() => onConfirm(data)}
        >
          {t(confirmButton)}
        </button>
        <button className={styles.cancel} onClick={() => setIsOpen(false)}>
          {t(cancelButton)}
        </button>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: bool,
  setIsOpen: func,
  title: string,
  confirmButton: string,
  cancelButton: string,
  data: shape({}),
};

ConfirmModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  title: "",
  confirmButton: "",
  cancelButton: "",
  data: {},
};

export default ConfirmModal;
