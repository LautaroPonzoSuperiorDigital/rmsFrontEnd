import PropTypes from "prop-types";
import { api } from "../../../../services/api";

const dateStyle = {
  color: "#848484",
  fontSize: "14px",
  fontWeight: 100,
};

const Files = ({ file, tenantId }) => {
  const isoDate = file.dateModified;
  const formattedDate = new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const handleOnClick = () => {
    api
      .get(`/tenant/${tenantId}/document/${file.id}/download`, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);
        link.download = `document_${file.id}.pdf`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      })
      .catch((error) => console.error({ error }));
  };

  return (
    <div
      className="w-100 d-flex mb-2 "
      style={{
        padding: "10px",
        border: "1px solid #00000026",
        cursor: "pointer",
      }}
      onClick={handleOnClick}
    >
      <div style={{ width: "100%", maxWidth: "245px" }}>{file.name}</div>
      <div style={dateStyle}>{formattedDate}</div>
    </div>
  );
};

Files.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }).isRequired,
  tenantId: PropTypes.number.isRequired,
};

export default Files;
