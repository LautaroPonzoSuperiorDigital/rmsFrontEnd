/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import ActiveComplainTickets from "./ActiveComplainTickets";
import ActiveRepairTickets from "./ActiveRepairTickets";
import CloseComplainTickets from "./CloseComplainTickets";
import CloseRepairTickets from "./CloseRepairTickets";
import Files from "./Files";
import { api } from "../../../../services/api";

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
  flex: 1,
};

const TicketsInfomartion = ({ chatRoomId, chatRooms }) => {
  const [activeTickets, setActiveTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await api.get(`tenants/ticket-repair/${chatRoomId}`);
        const tickets2 = await api.get(`tenants/ticket-complain/${chatRoomId}`);
        const ticketsData = [...tickets.data, ...tickets2.data];
        const filterActiveTickets = ticketsData.filter(
          (ticket) => ticket.status === "OPEN"
        );
        const filterClosedTickets = ticketsData.filter(
          (ticket) => ticket.status === "CLOSED"
        );
        setActiveTickets(filterActiveTickets);
        setClosedTickets(filterClosedTickets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTickets();
    // const matchedChatRoom = chatRooms.find(
    //   (chatRoom) => chatRoom.id === chatRoomId
    // );
    // const repairTickets = matchedChatRoom?.Listing.RepairTicket || [];
    // const ticketComplaints = matchedChatRoom?.Listing.TicketComplaint || [];

    // const AllTickets = [...repairTickets, ...ticketComplaints];
    // const filterActiveTickets = AllTickets.filter(
    //   (ticket) => ticket.status === "OPEN"
    // );
    // const filterClosedTickets = AllTickets.filter(
    //   (ticket) => ticket.status === "CLOSED"
    // );
    // setActiveTickets(filterActiveTickets);
    // setClosedTickets(filterClosedTickets);
  }, [chatRoomId, tickets]);

  return (
    <div className="d-flex flex-column gap-3 " style={ticketsContainerStyle}>
      <div className="d-flex flex-column">
        <p style={{ padding: 10, color: "#00000073", fontSize: "16px" }}>
          ACTIVE TICKETS ({activeTickets.length})
        </p>
        {activeTickets.map((ticket) =>
          ticket.cause ? (
            <ActiveComplainTickets
              key={ticket.id}
              ticket={ticket}
              setTickets={setTickets}
              tickets={tickets}
            />
          ) : (
            <ActiveRepairTickets
              key={ticket.id}
              ticket={ticket}
              setTickets={setTickets}
              tickets={tickets}
            />
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
