import React, { useState } from "react";
import CheckBoxLog from "../../../components/checkBox";
import styled from "styled-components";

const NavContainerStyle = styled.div`
  border-bottom: 1px solid #00000026;
  height: 100px;
  padding-bottom: 33px;
  padding-top: 33px;
  /* padding-right: 57px; */
  padding-left: 40px;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1274px) {
    padding-left: 20px;
  }
`;

const navContainer = {
  borderBottom: "1px solid #00000026",
  height: "100px",
  paddingBottom: "33px",
  paddingTop: "33px",
  // paddingRigth: "57px",
  paddingLeft: "40px",
  alignItems: "center",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
};
const navTitle = {
  fontSize: "35px",
  margin: "0px",
  lineHeight: "25px",
};

const InputStyle = styled.input`
  width: 100%;
  max-width: 100px;
`;

const AdminChatRoomNavBar = ({ chatRooms, setTicketActiveRooms }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [input, setInput] = useState("");

  const filteredData = chatRooms.filter(
    (item) =>
      item.Listing.RepairTicket.length > 0 ||
      item.Listing.TicketComplaint.length > 0
  );

  const handleCheckBoxChange = (newCheckedValue) => {
    setIsChecked(newCheckedValue);
    if (newCheckedValue === true) {
      setTicketActiveRooms(
        chatRooms.filter(
          (item) =>
            item.Listing.RepairTicket.length > 0 ||
            item.Listing.TicketComplaint.length > 0
        )
      );
    } else {
      setTicketActiveRooms(chatRooms);
    }
  };

  const handleInputChange = (e) => {
    const id = Number(e.target.value);
    const filteredData = chatRooms.filter((item) => item.listingId === id);
    if (filteredData.length > 0) {
      setTicketActiveRooms(filteredData);
    } else {
      setTicketActiveRooms(chatRooms);
    }
  };

  return (
    <NavContainerStyle>
      <div>
        <p style={navTitle}>Chats</p>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <CheckBoxLog checked={isChecked} onChange={handleCheckBoxChange} />
          <p style={{ marginBottom: "0" }}>Show only active tickets</p>
        </div>
        <InputStyle placeholder="ID" onChange={handleInputChange} />
      </div>
    </NavContainerStyle>
  );
};

export default AdminChatRoomNavBar;
