/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import ActiveComplainTickets from "./ActiveComplainTickets";
import ActiveRepairTickets from "./ActiveRepairTickets";
import CloseComplainTickets from "./CloseComplainTickets";
import CloseRepairTickets from "./CloseRepairTickets";
import Files from "./Files";
import { api } from "../../../../services/api";

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
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const matchedChatRoom = chatRooms.find(
      (chatRoom) => chatRoom.id === chatRoomId
    );
    const fetchTickets = async () => {
      try {
        const tickets = await api.get(
          `tenants/ticket-repair/${matchedChatRoom.listingId}`
        );
        const tickets2 = await api.get(
          `tenants/ticket-complain/${matchedChatRoom.listingId}`
        );
        const filesData = await api.get(
          `tenant/${matchedChatRoom.tenantId}/document`
        );
        setFiles(filesData.data);

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
  }, [chatRoomId, tickets]);

  return (
    <div className="d-flex flex-column gap-3 " style={ticketsContainerStyle}>
      <div
        className="d-flex flex-column"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
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
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
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
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <p style={{ padding: 10, color: "#00000073", fontSize: "16px" }}>
          FILES
        </p>
        {files.map((file) => (
          <Files key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default TicketsInfomartion;
