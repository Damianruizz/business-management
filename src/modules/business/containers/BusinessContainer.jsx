/* Core */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { func, bool, shape, arrayOf } from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./BusinessContainer.module.css";
/* Components */
import Table from "../../../components/Table";
import FormModal from "../../../components/FormModal";
import ConfirmModal from "../../../components/ConfirmModal";
/* Utils */
import { availableLng } from "../../../utils/constants";
import { tableHeaders, createInputs } from "../constants";
import { initialValues, createBusinessSchema }  from "../model";

import {
  getBusinesses as rawGetBusinesses,
  createBusinesses as rawCreateBusinesses,
  editBusinesses as rawEditBusinesses,
  deleteBusiness as rawDeleteBusiness,
} from "../actions";

export const BusinessContainer = ({
  getBusinesses,
  createBusinesses,
  editBusinesses,
  deleteBusiness,
  businesses,
  isLoading,
}) => {
  const { t, i18n } = useTranslation();
  const [tableActions, setTableActions] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalDelete, setModalDelete] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  /**
  * @desc get initial businesses
  */
  useEffect(() => {
    getBusinesses();
  }, []);

  /**
  * @desc send edit business request
  * @params {Object}
  */
  const editBussines = values => {
    editBusinesses(values).then(response => setOpenModal(false));
  };

  /**
  * @desc return the base object for modal data
  */
  const modalBase = () => ({
    validationSchema: createBusinessSchema,
    cancelButtonText: "bussines.form.cancelButton",
    inputs: createInputs,
  });

  /**
  * @desc open the modal edit
  * @params {Object}
  */
  const onEdit = business => {
    const { businessId, name } = business;
    const editData = {
      ...modalBase(),
      title: "bussines.form.editTitle",
      onSubmit: editBussines,
      initialValues: { ...initialValues, businessId, name },
      buttonText: "bussines.form.buttonEdit",
    };
    setModalData(editData);
    setOpenModal(true);
  };

  /**
  * @desc send delete business request
  * @params {Object}
  */
  const eraseBusiness = business => {
    deleteBusiness(business.id).then(response => {
      getBusinesses();
      setOpenModalDelete(false);
    });
  };

  /**
  * @desc open the modal delete
  * @params {Object}
  */
  const onDelete = business => {
    const deleteData = {
      name: business.name,
      id: business.businessId,
    };
    setModalDelete(deleteData);
    setOpenModalDelete(true);
  };

  /**
  * @desc send create business request
  * @params {Object}
  */
  const newBussines = values => {
    createBusinesses(values).then(response => {
      getBusinesses();
      setOpenModal(false);
    });
  };

  /**
  * @desc open the modal create
  */
  const onCreate = () => {
    const createData = {
      ...modalBase(),
      title: "bussines.form.title",
      onSubmit: newBussines,
      initialValues: initialValues,
      buttonText: "bussines.form.button",
    };
    setModalData(createData);
    setOpenModal(true);
  };

  /**
  * @desc get actions and data for the table
  */
  const getTableActions = () => {
    return businesses?.map(business => ({
      ...business,
      id: business.businessId,
      actions: [
        {
          name: "bussines.edit",
          action: onEdit,
        },
        {
          name: "bussines.delete",
          action: onDelete,
        }
      ],
    }));
  };

  /**
  * @desc set actions and data for the table
  * @params {Object}
  */
  useEffect(() => {
    setTableActions(getTableActions());
  }, [businesses]);

  return (
    <div className={styles.layout}>
      <div className={styles.language}>
        <div className={styles.flags}>
          {Object.keys(availableLng).map((lng) => (
            <img
              className={styles.flagImage}
              src={availableLng[lng].flagImage}
              onClick={() => i18n.changeLanguage(lng)}
              key={lng}
              alt={lng}
            />
          ))}
        </div>
        <button onClick={onCreate} className={styles.create}>
          {t("bussines.create")}
        </button>
      </div>
      <Table
        headers={tableHeaders}
        data={tableActions}
        className={styles.table}
      />
      <FormModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        title={modalData.title}
        onSubmit={modalData.onSubmit}
        initialValues={modalData.initialValues}
        validationSchema={modalData.validationSchema}
        buttonText={modalData.buttonText}
        cancelButtonText={modalData.cancelButtonText}
        inputs={modalData.inputs}
      />
      <ConfirmModal
        isOpen={openModalDelete}
        setIsOpen={setOpenModalDelete}
        data={modalDelete}
        onConfirm={eraseBusiness}
        title="bussines.confirm.title"
        confirmButton="bussines.confirm.button"
        cancelButton="bussines.confirm.cancelButton"
      />
    </div>
  );
};

BusinessContainer.propTypes = {
  getBusinesses: func.isRequired,
  createBusinesses: func.isRequired,
  editBusinesses: func.isRequired,
  deleteBusiness: func.isRequired,
  businesses: arrayOf(shape({})),
  isLoading: bool,
};

BusinessContainer.defaultProps = {
  businesses: [],
  isLoading: false,
};

const mapStateToProps = ({
  business: {
    businesses,
    isLoading,
  },
}) => ({
  businesses,
  isLoading,
});

const mapDispatchToProps = {
  getBusinesses: rawGetBusinesses,
  createBusinesses: rawCreateBusinesses,
  editBusinesses: rawEditBusinesses,
  deleteBusiness: rawDeleteBusiness,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessContainer);
