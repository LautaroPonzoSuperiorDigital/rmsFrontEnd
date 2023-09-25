import { useEffect, useState } from "react";
import { createListingImage } from "../../../services/listing";

const nameStyle = {
  fontSize: "25px",
  color: "#272727",
  margin: "0px",
  fontWeight: 100,
  lineHeight: "30px",
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
  alignItems: "center",
  padding: "30px",
  gap: "10px",
};

const TicketsNavBar = ({ targetChatRoomId, chatRooms }) => {
  const [imgSrc, setImageSrc] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const selectedListing = chatRooms.find(
      (chatRoom) => chatRoom.id === targetChatRoomId
    );

    setSelectedListing(selectedListing);

    const fetchImage = async () => {
      try {
        const src = await createListingImage(selectedListing);
        setImageSrc(src);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [chatRooms, targetChatRoomId]);
  return (
    <div style={ticketContainerStyle}>
      <div>
        <img src={imgSrc} style={{ height: "50px", width: "45" }} />
      </div>
      <div>
        <p style={nameStyle}>{selectedListing?.Tenant.User.name}</p>
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <p style={{ marginBottom: "3px" }}>•</p>
      </div>
      <div>
        <p style={listingStyle}> LISTING {selectedListing?.listingId}</p>
      </div>
    </div>
  );
};

export default TicketsNavBar;
