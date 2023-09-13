import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../services/api";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  height: 550px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 35px;
  color: #000000;
  font-weight: 600;
`;
const Input = styled.input`
  width: 100%;
  height: 24px;
  border: none;
  border-bottom: 1px solid #00000026;
  &:focus {
    outline: none;
    border-bottom: 1px solid #00000026;
  }
`;

const Btn = styled.button`
  width: 100%;
  max-width: 250px;
  height: 40px;
  background-color: ${(props) => (props.cancelled ? "gray" : "#197572")};
  color: white;
  border: none;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  border-top: 1px solid #00000026;
  margin-top: auto;
  height: 100px;
  align-items: center;
`;

const ModalUpdateSub = ({ isOpen, onClose, setUpdate, id }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await api.patch(`/sub-admin/${id}`, formData);
      console.log(response);
      setUpdate(true);
      setFormData({});
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FormContainer>
          <Title> Update Sub Admin</Title>

          <Form>
            <Input
              placeholder="FULL NAME"
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              placeholder="EMAIL"
              name="email"
              onChange={handleChange}
              required
            />

            {error}
          </Form>

          <BtnContainer>
            <Btn onClick={handleSubmit}>Save</Btn>
            <Btn cancelled={"cancelled"} onClick={onClose}>
              Cancel
            </Btn>
          </BtnContainer>
        </FormContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ModalUpdateSub;
