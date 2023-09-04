/* eslint-disable react/prop-types */

import ticket from "./../../../../assets/img/ticket.svg";
const Tickets = ({ chatRooms }) => {
  const ticketRepair = chatRooms?.Listing.RepairTickets;
  const ticketComplain = chatRooms?.Listing.ComplaintTickets;
  const areTicketsOpenRepair = ticketRepair?.some(
    (ticket) => ticket.status === "OPEN"
  );
  const areTicketOpenComplain = ticketComplain?.some(
    (ticket) => ticket.status === "OPEN"
  );

  return (
    <div className="d-flex flex-column ">
      {ticketRepair?.length > 0 && areTicketsOpenRepair && (
        <div
          className="d-flex w-100 justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <p
            className=" ml-2"
            style={{
              color: "#197572",
              fontSize: "18px",
              display: window.innerWidth < 1234 ? "none" : "block",
            }}
          >
            Repair ticket
          </p>
          <div>
            <img src={ticket} alt="Ticket" />
          </div>
        </div>
      )}
      {ticketComplain?.length > 0 && areTicketOpenComplain && (
        <div
          className="d-flex w-100 justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <p
            className="m-0"
            style={{
              color: "#197572",
              fontSize: "18px",
              display: window.innerWidth < 1234 ? "none" : "block",
            }}
          >
            Complain ticket
          </p>
          <div>
            <img src={ticket} alt="Ticket" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
