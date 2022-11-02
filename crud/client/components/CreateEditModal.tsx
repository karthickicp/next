import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { users } from "../types/users";

const CreateEditModal = ({
  open,
  type,
  user,
}: {
  open: boolean;
  type: string;
  user: users | null;
}) => {
  console.log(open, type, "crediovne");
  const [modalOpen, setModalOpen] = useState<boolean>(open);
  console.log(modalOpen, "modal open");
  const handleClose = () => {
    setModalOpen(false);
  };
  //   useEffect(() => {
  //     console.log("useEffect called");
  //     setModalOpen(open);
  //   }, [open]);
  return (
    <Modal show={modalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "create" ? "Create User" : "Edit User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEditModal;
