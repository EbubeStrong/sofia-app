"use client";

import { Modal, ModalProps } from "antd";

type TSofiaModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  width?: number;
  centered?: boolean;
  maskClosable?: boolean;
  content: React.ReactNode;
  title?: string | React.ReactNode;
  closeIcon?: ModalProps["closeIcon"];
};

const SofiaModal: React.FC<TSofiaModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  width,
  centered,
  maskClosable,
  content,
  title,
  closeIcon,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="sofia-modal-container"
      footer={null}
      centered={centered}
      width={width}
      maskClosable={maskClosable}
      closeIcon={closeIcon}
    >
      {content}
    </Modal>
  );
};

export default SofiaModal;
