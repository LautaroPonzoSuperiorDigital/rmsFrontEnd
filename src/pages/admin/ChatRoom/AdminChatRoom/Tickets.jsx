/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ticket from "./../../../../assets/img/ticket.svg";
const Tickets = ({ chatRooms, setTickets }) => {
  const ticketRepair = chatRooms?.Listing.RepairTicket;
  const ticketComplain = chatRooms?.Listing.TicketComplaint;

  return (
    <div className="d-flex flex-column ">
      {ticketRepair?.length > 0 && (
        <div
          className="d-flex w-100 justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <p className=" ml-6" style={{ color: "#197572", fontSize: "18px" }}>
            Repair ticket
          </p>
          <div>
            <img src={ticket} />
          </div>
        </div>
      )}
      {ticketComplain?.length > 0 && (
        <div
          className="d-flex w-100 justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <p className="m-0" style={{ color: "#197572", fontSize: "18px" }}>
            Complain ticket
          </p>
          <div>
            <img src={ticket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
