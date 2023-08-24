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
  height: "100px",
  display: "flex",
  alignItems: "center",
  paddingBottom: "33px",
  paddingTop: "33px",
  paddingRigth: "30px",
  paddingLeft: "30px",
  gap: "20px",
};

const TicketsNavBar = ({ targetChatRoomId, chatRooms }) => {
  const selectedListing = chatRooms.find(
    (chatRoom) => chatRoom.listingId === targetChatRoomId
  );
  const encodedKey = selectedListing.Listing.key.replace(/\\/g, "%5C");
  const imageUrl = `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`;

  return (
    <div style={ticketContainerStyle}>
      <div style={{ height: "50px", width: "45px", border: "1px solid black" }}>
        <img src={imageUrl} style={{ height: "50px", width: "45" }} />
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
