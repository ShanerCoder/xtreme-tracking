import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./RegisterForm.module.css";
import Form from "react-bootstrap/Form";

function RegisterForm() {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    router.push("/");
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Username</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Password</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Email</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Forename</label>
          <input type="text" required id="title" ref={titleInputRef} />
          <label htmlFor="title">Surname</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className="center">
          <p>Client or Personal Trainer?</p>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Client"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Personal Trainer"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
          <div>
            <p>This can be changed later</p>
          </div>
        </div>
        <div className={classes.actions}>
          <button>JOIN US</button>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;
