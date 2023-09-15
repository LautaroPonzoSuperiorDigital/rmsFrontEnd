/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { DeleteButton } from "../../../components/buttonApplicants";
import Delete from "../../../assets/img/delete.svg";
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg";
import TableSelect from "./TableSelect";
import ButtonTenant from "./ButtonTenant";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const tBodyStyle = {
  height: "50px",
};

const Table = ({
  applicants,
  setNewTanant,
  setApplicants,
  setTableApplicants,
  setDeleteTenant,
}) => {
  const [moveToTenant, setMoveToTenant] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const { user } = useAuth();
  const HandleDelete = async (id) => {
    try {
      const res = await api.delete(`tenant/${id}`);
      setDeleteTenant(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(applicants);
    // want the applicants that has applicant.User.ApplicationScreening with something in it
    const filteredApplicants = applicants.filter((applicant) => {
      return applicant.User.ApplicationScreening.length !== 0;
    });

    const fetchAdminListing = async () => {
      try {
        const { data: adminData } = await api.get(`/admin/user/${user.id}`);
        const res = await api.get(`/listing?adminId=${adminData.Admin.id}`);
        const adminListing = res.data;
        console.log(adminListing);

        const myFilter = filteredApplicants.map((applicant) => ({
          applicant: applicant,
          filteredApplications: applicant.User.ApplicationScreening.filter(
            (application) =>
              adminListing.some(
                (listing) => listing.id === application.listingId
              )
          ),
        }));

        setApplicant(myFilter);
        console.log(myFilter);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdminListing();
  }, [applicants]);

  return (
    <table className="table table-responsive-lg">
      <thead className="tables">
        <td className=" NAME1">
          <p className="mb-2 g" style={{ width: "150px", margin: 0 }}>
            NAME
          </p>
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
      {/* {applicant.map((item) => {
        //i dont want to show nothing if the filteredApplications is empty
        if (item.filteredApplications.length === 0) {
          return null;
        }
        return <p key={item.id}>{item.applicant.User.name}</p>;
      })} */}

      <tbody style={tBodyStyle}>
        {applicant.map((item) =>
          // idont want tho show nothing if the filteredApplications is empty
          item.filteredApplications.length === 0 ? null : (
            <tr className="tr-hover" key={item.id}>
              <td className="bor1">
                <div
                  className="mt-3   Person"
                  style={{ width: "150px", margin: 0 }}
                >
                  <p>{item.applicant.User.name}</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-2" style={{ width: "250px" }}>
                  {item.filteredApplications.map((item) => (
                    <p key={item.id}>{item.Listing.location}</p>
                  ))}
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-5">
                  {item.applicant.approvalStatus && (
                    <TableSelect
                      approbalStatus={item.applicant.approvalStatus}
                      key={item.id}
                      tenantId={item.applicant.id}
                      setMoveToTenant={setMoveToTenant}
                      setApplicants={setTableApplicants}
                    />
                  )}
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3" style={{ width: "100px" }}>
                  <p>{item.applicant.User.email}</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-1">
                  <p>{item.applicant.phoneNumber}</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mtt">
                  {item.applicant.approvalStatus ===
                    "LEASE_AGREEMENT_SIGNED" && (
                    <ButtonTenant
                      key={item.id}
                      applicantionScreening={
                        item.applicant.User.ApplicationScreening
                      }
                      tenantId={item.applicant.id}
                      approvalStatus={item.approvalStatus}
                      setNewTanant={setNewTanant}
                    />
                  )}
                </div>
              </td>
              <td className="bor1">
                <div className="deleteBtn1">
                  <DeleteButton
                    info={"Tenant"}
                    onClick={() => HandleDelete(item.applicant.id)}
                    defaultImage={<img src={Delete} alt="Delete" />}
                    hoverImage={
                      <img src={DeleteIconHover} alt="DeleteIconHover" />
                    }
                  />
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
