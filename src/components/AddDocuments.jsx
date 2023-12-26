import PropTypes from "prop-types";

const AddDocuments = ({ onClick }) => {
  return (
    <button className="add-listing mt-4 ms-4 mr-5" onClick={onClick}>
      <span>+</span> Add Documents
    </button>
  );
};

AddDocuments.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddDocuments;
