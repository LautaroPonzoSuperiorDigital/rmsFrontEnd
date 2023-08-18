/* eslint-disable react/prop-types */

import ActiveComplainTickets from "./ActiveComplainTickets";
import ActiveRepairTickets from "./ActiveRepairTickets";
import CloseComplainTickets from "./CloseComplainTickets";
import CloseRepairTickets from "./CloseRepairTickets";

const TicketsInfomartion = ({ chatRoomId, chatRooms }) => {
  const matchedChatRoom = chatRooms.find(
    (chatRoom) => chatRoom.id === chatRoomId
  );
  const repairTickets = matchedChatRoom?.Listing.RepairTicket || [];
  const ticketComplaints = matchedChatRoom?.Listing.TicketComplaint || [];
  console.log(ticketComplaints);
  const allTickets = [...repairTickets, ...ticketComplaints];
  const activeTickets = allTickets.filter((ticket) => ticket.status === "OPEN");
  const closedTickets = allTickets.filter(
    (ticket) => ticket.status === "CLOSED"
  );

  return (
    <div className="d-flex flex-column gap-5">
      <div>
        {activeTickets.map((ticket) =>
          ticket.cause ? (
            <ActiveComplainTickets key={ticket.id} ticket={ticket} />
          ) : (
            <ActiveRepairTickets key={ticket.id} ticket={ticket} />
          )
        )}
      </div>
      <div>
        <p style={{ padding: 10, color: "#00000073", fontSize: "16px" }}>
          TICKETS ARCHIVE
        </p>
        {closedTickets.map((ticket) =>
          ticket.cause ? (
            <CloseComplainTickets key={ticket.id} ticket={ticket} />
          ) : (
            <CloseRepairTickets key={ticket.id} ticket={ticket} />
          )
        )}
      </div>
    </div>
  );
};

export default TicketsInfomartion;
