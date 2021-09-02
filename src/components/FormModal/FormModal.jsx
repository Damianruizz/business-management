import React from "react";
import { bool, shape, arrayOf, string, func } from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./FormModal.module.css";
import Modal from "react-modal";
import Input from "../Input";
import { Formik, Form, Field } from "formik";

Modal.setAppElement(document.getElementById("root"));

const FormModal = ({
  isOpen,
  setIsOpen,
  title,
  onSubmit,
  initialValues,
  validationSchema,
  buttonText,
  cancelButtonText,
  inputs,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
    >
      <h2>{t(title)}</h2>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        render={({ isValid, values }) => (
          <Form className={styles.form}>
            {inputs?.map(input => (
              <div key={input.name}>
                <label>{t(input.label)}</label>
                <Field component={Input} name={input.name} />
              </div>
            ))}
            <div className={styles.buttons}>
              <button
                type="submit"
                disabled={!isValid}
                className={styles.submit}
              >
                {t(buttonText)}
              </button>
              <button className={styles.cancel} onClick={() => setIsOpen(false)}>
                {t(cancelButtonText)}
              </button>
            </div>
          </Form>
        )}
      />
    </Modal>
  );
};

FormModal.propTypes = {
  isOpen: bool,
  title: string,
  onSubmit: func,
  setIsOpen: func,
  initialValues: shape({}),
  validationSchema: shape({}),
  buttonText: string,
  cancelButtonText: string,
  inputs: arrayOf(shape({})),
};

FormModal.defaultProps = {
  isOpen: false,
  title: "",
  onSubmit: () => {},
  setIsOpen: () => {},
  initialValues: {},
  validationSchema: {},
  buttonText: "",
  cancelButtonText: "",
  inputs: [],
};

export default FormModal;
