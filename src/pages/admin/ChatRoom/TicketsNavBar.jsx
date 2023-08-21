import React from "react";

const nameStyle = {
  fontSize: "25px",
  color: "#272727",
  margin: "0px",
  fontWeight: 100,
};
const listingStyle = {
  fontSize: "20px",
  color: "#272727",
  margin: "0px",
  fontWeight: 100,
};

const TicketsNavBar = ({ targetChatRoomId, chatRooms }) => {
  const selectedListing = chatRooms.find(
    (chatRoom) => chatRoom.listingId === targetChatRoomId
  );
  console.log(selectedListing);

  return (
    <div className="d-flex gap-3 p-1">
      <div style={{ height: "50px", width: "45px" }}>
        <img
          src={selectedListing.Listing.key}
          style={{ height: "50px", width: "45" }}
        />
      </div>
      <div>
        <p style={nameStyle} className="d-flex align-items-center">
          {selectedListing.Tenant.User.name}
        </p>
      </div>
      <div>
        <p style={listingStyle} className="d-flex align-items-center">
          {" "}
          LISTING {selectedListing.listingId}
        </p>
      </div>
    </div>
  );
};

export default TicketsNavBar;
