import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    branch: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.http://server1-env.eba-jz9phdzm.us-east-1.elasticbeanstalk.com/
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://44.204.152.173:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", roll: "", branch: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="back-color">
      <h3>Create New Record</h3>
      <div className="form-decoration">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roll">Roll No</label>
            <input
              type="text"
              className="form-control"
              id="roll"
              value={form.roll}
              onChange={(e) => updateForm({ roll: e.target.value })}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="positionOptions"
                id="positionIntern"
                value="CS"
                checked={form.branch === "CS"}
                onChange={(e) => updateForm({ branch: e.target.value })}
              />
              <label htmlFor="positionIntern" className="form-check-label">
                CS
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="positionOptions"
                id="positionJunior"
                value="IT"
                checked={form.branch === "IT"}
                onChange={(e) => updateForm({ branch: e.target.value })}
              />
              <label htmlFor="positionJunior" className="form-check-label">
                IT
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="positionOptions"
                id="positionSenior"
                value="ECS"
                checked={form.branch === "ECS"}
                onChange={(e) => updateForm({ branch: e.target.value })}
              />
              <label htmlFor="positionSenior" className="form-check-label">
                ECS
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
