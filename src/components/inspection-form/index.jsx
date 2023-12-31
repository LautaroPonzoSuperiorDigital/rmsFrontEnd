import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Input } from "../input";

import { AddInspectionContainer, Form } from "./styles";
import { DateTime } from "luxon";

function InspectionFormWithRef({ inspection }, ref) {
  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const typeRef = useRef(null);

  const defaultDateValue =
    inspection &&
    DateTime.fromISO(inspection.date, { zone: "utc" }).toFormat("MM/dd/yyyy");

  const handleDateChange = () => {
    let date = dateRef.current.value;

    if (date.length > 10) {
      date = date.slice(0, 10);
    } else {
      date = date
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2");
    }

    dateRef.current.value = date;
  };

  const getData = () => {
    const name = nameRef.current?.value;
    const date = dateRef.current?.value;
    const type = typeRef.current?.value;

    return { name, date, type };
  };

  useEffect(() => {
    const name = nameRef.current;
    const date = dateRef.current;
    const type = typeRef.current;

    return () => {
      name.value = "";
      date.value = "";
      type.value = "";
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <AddInspectionContainer>
      {inspection ? <h1>Edit Inspection</h1> : <h1>Add Inspection</h1>}

      <Form>
        <Input
          ref={nameRef}
          type="text"
          label="NAME"
          defaultValue={inspection?.name}
        />

        <Input
          ref={dateRef}
          type="text"
          label="DATE"
          onChange={handleDateChange}
          defaultValue={defaultDateValue}
        />

        <Input
          ref={typeRef}
          type="text"
          label="TYPE"
          defaultValue={inspection?.type}
        />
      </Form>
    </AddInspectionContainer>
  );
}

InspectionFormWithRef.propTypes = {
  inspection: PropTypes.object.isRequired,
};

export const InspectionForm = forwardRef(InspectionFormWithRef);
