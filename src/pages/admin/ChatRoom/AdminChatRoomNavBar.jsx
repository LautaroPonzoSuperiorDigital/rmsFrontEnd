import React, { useState } from "react";
import CheckBoxLog from "../../../components/checkBox";

const navContainer = {
  borderBottom: "1px solid #00000026",
  height: "100px",
  paddingBottom: "33px",
  paddingTop: "33px",
  paddingRigth: "57px",
  paddingLeft: "57px",
  // alignItems: "center",
  display: "flex",
  width: "100%",
};
const navTitle = {
  fontSize: "35px",
  margin: "0px",
  lineHeight: "25px",
};

const AdminChatRoomNavBar = ({ chatRooms, setTicketActiveRooms }) => {
  const [isChecked, setIsChecked] = useState(false);

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

  return (
    <div style={navContainer}>
      <div>
        <p style={navTitle}>Chats</p>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <CheckBoxLog checked={isChecked} onChange={handleCheckBoxChange} />
        <p style={{ marginBottom: "0" }}>Show only active tickets</p>
      </div>
    </div>
  );
};

export default AdminChatRoomNavBar;
