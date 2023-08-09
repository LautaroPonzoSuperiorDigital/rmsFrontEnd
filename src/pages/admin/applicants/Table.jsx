/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { DeleteButton } from "../../../components/buttonApplicants";
import Delete from "../../../assets/img/delete.svg";
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg";
import TableSelect from "./TableSelect";
import ButtonTenant from "./ButtonTenant";

const Table = ({ applicants, setNewTanant }) => {
  const [moveToTenant, setMoveToTenant] = useState(false);

  return (
    <table className="table table-responsive-lg">
      <thead className="tables">
        <td className=" NAME1">
          <p className="mb-2 g">NAME</p>
        </td>
        <td className="bor LISTING1">
          <p className="mb-2 g">LISTINGS</p>
        </td>
        <td className="bor">
          <p className="mb-2 ms-5 g">APPROVAL STATUS</p>
        </td>
        <td className="bor EMAIL1">
          <p className="mb-2 g">EMAIL</p>
        </td>
        <td className="bor">
          <p className="mb-2 g">PHONE</p>
        </td>
        <td className="bor whiteSpace"></td>
        <td className="bor">
          <p className="deleteText g">DELETE</p>
        </td>
      </thead>
      <tbody>
        {applicants.map((item) => (
          <tr className="tr-hover" key={item.id}>
            <td className="bor1">
              <div className="mt-3   Person">
                <p>{item.User.name}</p>
              </div>
            </td>
            <td className="bor1">
              <div className="mt-3 ms-2">
                {item.User.ApplicationScreening.map((item) => (
                  <p key={item.id}>{item.Listing.location}</p>
                ))}
              </div>
            </td>
            <td className="bor1">
              <div className="mt-3 ms-5">
                <TableSelect
                  approbalStatus={item.approvalStatus}
                  key={item.id}
                  tenantId={item.id}
                  setMoveToTenant={setMoveToTenant}
                />
              </div>
            </td>
            <td className="bor1">
              <div className="mt-3">
                <p>{item.User.email}</p>
              </div>
            </td>
            <td className="bor1">
              <div className="mt-3 ms-1">
                <p>{item.phoneNumber}</p>
              </div>
            </td>
            <td className="bor1">
              <div className="mtt">
                {item.User.ApplicationScreening.map((item) => (
                  <ButtonTenant
                    moveToTenant={moveToTenant}
                    key={item.id}
                    tenantId={item.id}
                    setNewTanant={setNewTanant}
                  />
                ))}
              </div>
            </td>
            <td className="bor1">
              <div className="deleteBtn1">
                <DeleteButton
                  defaultImage={<img src={Delete} alt="Delete" />}
                  hoverImage={
                    <img src={DeleteIconHover} alt="DeleteIconHover" />
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
