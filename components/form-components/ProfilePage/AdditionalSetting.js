import Card from "../../ui/Card";
import classes from "./AdditionalSetting.module.css";
import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

function AdditionalSetting(props) {
  let checkBoxValue = props.defaultChecked;

  function handleSubmit() {
    if (checkBoxValue != props.defaultChecked) {
      props.handleSubmit(checkBoxValue);
    }
  }

  return (
    <>
      <Row className={classes.additionalProfileSettings}>
        <Col sm={{ span: 4, offset: 7 }}>
          <h3>{props.label}</h3>
        </Col>
        <Col sm={1}>
          <input
            id="checkBox"
            className={classes.additionalProfileSettingsInput}
            type="checkbox"
            defaultChecked={props.defaultChecked}
            onChange={() => {
              checkBoxValue = !checkBoxValue;
            }}
          />
        </Col>
      </Row>
      <Row className={classes.rowPadding}>
        <Col sm={{ span: 5, offset: 7 }}>
          <button
            className={classes.additionalSettingButton}
            onClick={handleSubmit}
          >
            {props.buttonLabel}
          </button>
        </Col>
      </Row>
    </>
  );
}

export default AdditionalSetting;
