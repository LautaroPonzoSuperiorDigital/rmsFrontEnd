import React, { useEffect, useState } from "react";
import Nav from "../../../components/nav";
import { BtnPlusSub, SubAdminsnav, TableContainer } from "./styles";
import DeleteIconHover from "../../../assets/img/deleteIconHover.svg";
import Delete from "../../../assets/img/delete.svg";
import ModalAddSub from "./ModalAddSub";
import { api } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { DeleteButton } from "../../../components/buttonApplicants";
import Pencil from "./../../../assets/img/pencil.svg";
import ModalUpdateSub from "./ModalUpdateSub";

const tBodyStyle = {
  height: "50px",
};

const SubAdmins = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModal, setUpdatemodal] = useState(false);
  const [subAdmins, setSubAdmins] = useState([]);
  const [update, setUpdate] = useState(false);
  const { user } = useAuth();

  const updateModalOpen = () => {
    setUpdatemodal(true);
  };
  const updateModalClose = () => {
    setUpdatemodal(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/sub-admin/${id}`);
      console.log(res);
      setUpdate(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSubAdmin = async () => {
      try {
        const adminId = await api.get(`/admin/user/${user.id}`);
        const response = await api.get(`/sub-admin/${adminId.data.Admin.id}`);
        setSubAdmins(response.data);
        console.log(response.data);
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubAdmin();
  }, [update]);

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
                      <button className="btn-sm">
                        <img
                          src={Pencil}
                          alt="Pencil"
                          onClick={updateModalOpen}
                        />
                      </button>
                      <ModalUpdateSub
                        isOpen={isUpdateModal}
                        onClose={updateModalClose}
                        setUpdate={setUpdate}
                        id={item.User.id}
                      />
                      <DeleteButton
                        info={"Sub Admin"}
                        onClick={() => handleDelete(item.User.id)}
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
      <ModalAddSub
        isOpen={isModalOpen}
        onClose={closeModal}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default SubAdmins;
