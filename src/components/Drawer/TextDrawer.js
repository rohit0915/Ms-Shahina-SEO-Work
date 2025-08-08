/** @format */

import React from "react";
import { Modal } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { ViewDescription } from "../../Helper/Herlper";

const TextDrawer = ({ open, setOpen, title, desc }) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      className="Checkout_Modal Text_Drawer"
      width={700}
    >
      <div className="close_button">
        {" "}
        <AiOutlineClose onClick={() => setOpen(false)} />
      </div>
      <p className="title"> {title} </p>
      <ViewDescription  description={desc} />
      <p className="desc mt-5"></p>
    </Modal>
  );
};

export default TextDrawer;
