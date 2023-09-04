import { createListingImage } from "../../../services/listing";

const nameStyle = {
  fontSize: "25px",
  color: "#272727",
  margin: "0px",
  fontWeight: 100,
  lineHeight: "25px",
  textTransform: "uppercase",
};
const listingStyle = {
  fontSize: "20px",
  color: "#272727",
  margin: "0px",
  fontWeight: 100,
};
const ticketContainerStyle = {
  borderBottom: "1px solid #00000026",
  width: "100%",
  height: "100px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: "33px",
  paddingTop: "33px",
};

const TicketsNavBar = ({ targetChatRoomId, chatRooms }) => {
  const selectedListing = chatRooms.find(
    (chatRoom) => chatRoom.listingId === targetChatRoomId
  );

  return (
    <div style={ticketContainerStyle}>
      <div>
        <img
          src={createListingImage(selectedListing.Listing)}
          style={{ height: "50px", width: "45" }}
        />
      </div>
      <div>
        <p style={nameStyle}>{selectedListing.Tenant.User.name}</p>
      </div>
      <div>
        <p style={listingStyle}> LISTING {selectedListing.listingId}</p>
      </div>
    </div>
  );
};

export default TicketsNavBar;
