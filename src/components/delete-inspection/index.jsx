import PropTypes from "prop-types";
import { DeleteInspectionContainer } from "./styles";

export function DeleteInspection({ inspection }) {
  return (
    <DeleteInspectionContainer>
      <h1>Delete Expense</h1>
      <span>
        Are you sure you want to delete the inspection <b>{inspection?.name}</b>
        ?
      </span>
    </DeleteInspectionContainer>
  );
}

DeleteInspection.propTypes = {
  inspection: PropTypes.object,
};
