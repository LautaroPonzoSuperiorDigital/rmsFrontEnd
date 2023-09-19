import React, { useState } from "react";
import CheckBoxLog from "../../../components/checkBox";
import styled from "styled-components";
import SearchIcon from "../../../assets/img/SearchIcon.svg";
import SearchIconHover from "../../../assets/img/SearchIconHover.svg";

const NavContainerStyle = styled.div`
  border-bottom: 1px solid #00000026;
  height: 100px;
  padding-bottom: 33px;
  padding-top: 33px;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 10px;
  @media (max-width: 1374px) {
    padding-left: 0px;
  }
`;

const navTitle = {
  fontSize: "35px",
  margin: "0px",
  lineHeight: "25px",
};

const InputStyle = styled.input`
  width: 100%;
  max-width: 150px;
  border: 1px solid #00000026;
  height: 40px;
  margin-top: 10px;
  &:focus {
    /* Add other styles for focused input if needed */
    outline: none;
  }
`;

const AdminChatRoomNavBar = ({ chatRooms, setTicketActiveRooms }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [input, setInput] = useState("");

  const handleCheckBoxChange = (newCheckedValue) => {
    setIsChecked(newCheckedValue);
    if (newCheckedValue === true) {
      setTicketActiveRooms(
        chatRooms.filter(
          (item) =>
            item.Listing.RepairTickets.length > 0 ||
            item.Listing.ComplaintTickets.length > 0
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
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CheckBoxLog checked={isChecked} onChange={handleCheckBoxChange} />
          <p
            style={{
              marginTop: "10px",
              marginBottom: "0",
              color: "#000000A5",
              fontSize: "18px",
              whiteSpace: "nowrap",
            }}
          >
            Show only active tickets
          </p>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: "150px" }}>
        <InputStyle placeholder="Search By Id" onChange={handleInputChange} />
        <img
          className="SearchIconListings1"
          src={SearchIcon}
          alt="SearchIcon"
        />
      </div>
    </NavContainerStyle>
  );
};

export default AdminChatRoomNavBar;
