/** @format */

import React from "react";
import { Modal } from "antd";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const CancelModal = ({ open, setOpen, deleteFunc }) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      className="Checkout_Modal Cancel_Modal"
    >
      <ImageLazyLoading
        img={"./Image/download-removebg-preview.png"}
        alt={"Remove Confirm"}
        className={"text-[10px]"}
      />
      <h6>Are you sure ?</h6>
      <p>Do you want to delete previous selected package of this sevice </p>
      <div className="container_but">
        <button className="cancel" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button className="delete" onClick={deleteFunc}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default CancelModal;
