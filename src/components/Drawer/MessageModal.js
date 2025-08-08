/** @format */

import React from "react";
import { Modal } from "antd";

const MessageModal = ({ open, setOpen, msg }) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      className="Checkout_Modal"
    >
      <div className="close_icon_btn">
        <img src="/Image/x.svg" onClick={() => setOpen(false)} alt="" loading="lazy" />
      </div>
      <p className="description"> {msg} </p>
    </Modal>
  );
};

export default MessageModal;
