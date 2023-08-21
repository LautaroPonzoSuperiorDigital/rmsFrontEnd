/* eslint-disable react/prop-types */

import ActiveComplainTickets from "./ActiveComplainTickets";
import ActiveRepairTickets from "./ActiveRepairTickets";
import CloseComplainTickets from "./CloseComplainTickets";
import CloseRepairTickets from "./CloseRepairTickets";
import Files from "./Files";

const mockFiles = [
  {
    name: "T5 Credit Report Form",
    date: "jul 19, 2022",
    id: 1,
  },
  {
    name: "12 Rt Form",
    date: "jun 09, 2022",
    id: 2,
  },
  {
    name: "Lincense",
    date: "may 25, 2022",
    id: 2,
  },
];
const ticketsContainerStyle = {
  maxHeight: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
};

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
    <div className="d-flex flex-column gap-3 " style={ticketsContainerStyle}>
      <div>
        <p style={{ padding: 10, color: "#00000073", fontSize: "16px" }}>
          ACTIVE TICKETS ({activeTickets.length})
        </p>
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
          TICKETS ARCHIVE ({closedTickets.length})
        </p>
        {closedTickets.map((ticket) =>
          ticket.cause ? (
            <CloseComplainTickets key={ticket.id} ticket={ticket} />
          ) : (
            <CloseRepairTickets key={ticket.id} ticket={ticket} />
          )
        )}
      </div>
      <div>
        <p style={{ padding: 10, color: "#00000073", fontSize: "16px" }}>
          FILES
        </p>
        {mockFiles.map((file) => (
          <Files key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default TicketsInfomartion;
