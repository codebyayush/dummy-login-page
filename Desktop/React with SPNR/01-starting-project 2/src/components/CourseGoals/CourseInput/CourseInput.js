import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isvalid, setIsvalid] = useState(true);
  const [isvalidforbutton, setIsvalidforbutton] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsvalid(true);
    }
    if(event.target.value.trim().length === 1){
      setIsvalidforbutton(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsvalid(false);
      return;
    }
    if (enteredValue.trim().length === 1){
      setIsvalidforbutton(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isvalid ? "invalid" : ""}`}>
        <label>Course Goal</label>
        <input
          type="text"
          style={{
            borderColor: !isvalid ? "red" : "black",
            background: !isvalid ? "salmon" : "transparent",
          }}
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit" className = {`button ${!isvalid ? "invalid" : !isvalidforbutton ? 'invalid-one' : ""}`}>Add Goal</Button>
    </form>
  );
};

export default CourseInput;