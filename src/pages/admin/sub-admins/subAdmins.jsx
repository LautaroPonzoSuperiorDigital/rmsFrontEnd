import React, { useEffect, useState } from "react";
import Nav from "../../../components/nav";
import { BtnPlusSub, SubAdminsnav, TableContainer } from "./styles";
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg";
import Delete from "../../../assets/img/delete.svg";
import ModalAddSub from "./ModalAddSub";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { DeleteButton } from "../../../components/buttonApplicants";
import { EditButton } from "../../../components/buttonListings";

const tBodyStyle = {
  height: "50px",
};

const SubAdmins = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [subAdmins, setSubAdmins] = useState([]);
  const { user } = useAuth();
  console.log(user.id);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchSubAdmin = async () => {
      try {
        const adminId = await api.get(`/admin/user/${user.id}`);

        const response = await api.get(`/sub-admin/${adminId.data.Admin.id}`);
        setSubAdmins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubAdmin();
  }, []);

  return (
    <div>
      <Nav />
      <SubAdminsnav>
        <h1>Sub Admins</h1>
        <div className="d-flex ">
          <input></input>
          <BtnPlusSub onClick={openModal}> + add sub admin</BtnPlusSub>
        </div>
      </SubAdminsnav>
      <TableContainer>
        <table className="table table-responsive-lg">
          <thead className="tables">
            <td className=" NAME1">
              <p className="mb-2 g">NAME</p>
            </td>
            <td className="bor LISTING1">
              <p className="mb-2 g">ROLE</p>
            </td>

            <td className="bor EMAIL1">
              <p className="mb-2 g">EMAIL</p>
            </td>

            <td className="">
              <p className="">DELETE</p>
            </td>
          </thead>

          <tbody style={tBodyStyle}>
            {subAdmins.map((item) =>
              // idont want tho show nothing if the filteredApplications is empty
              item === 0 ? null : (
                <tr className="tr-hover" key={item.id}>
                  <td className="bor1">
                    <div className="mt-3 Person" style={{ width: "350px" }}>
                      <p>{item.User.name}</p>
                    </div>
                  </td>

                  <td className="bor1">
                    <div className="mt-3 " style={{ width: "350px" }}>
                      <p>{item.User.role}</p>
                    </div>
                  </td>
                  <td className="bor1">
                    <div className="mt-3" style={{ width: "350px" }}>
                      <p>{item.User.email}</p>
                    </div>
                  </td>
                  <td className="">
                    <div>
                      <EditButton />
                      <DeleteButton
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
      </TableContainer>
      <ModalAddSub isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SubAdmins;
