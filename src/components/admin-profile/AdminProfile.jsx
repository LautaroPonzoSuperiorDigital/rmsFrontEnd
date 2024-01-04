import "./admin-profile.css";
import { useAuth } from "../../hooks/useAuth";
import Nav from "../nav";
import { useState } from "react";
import { api } from "../../services/api";

const AdminProfile = () => {
  const { user } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) return;

    try {
      if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match.");
        return;
      }

      api
        .patch(`/user/${user.id}`, { password: newPassword })
        .then((result) => {
          console.log({ result });
          return alert("Password updated successfully");
        })
        .catch((error) => console.error({ error }));

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error({ error });
      return alert("Could not update password");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Nav />
      <div className="reset-password default-page">
        <div className="reset-password box">
          <p>{"Change password"}</p>
          <div className="reset-password input">
            <label className="reset-password">{"Old password"}</label>
            <input
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
            />
          </div>
          <div className="reset-password input">
            <label className="reset-password">{"New password"}</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="reset-password input">
            <label className="reset-password">{"Confirm new password"}</label>
            <input
              className="reset-password"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              required
            />
          </div>
          <button className="reset-password" onClick={handleSubmit}>
            {"Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
