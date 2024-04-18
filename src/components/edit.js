import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    branch: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://44.204.152.173:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      roll: form.roll,
      branch: form.branch,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://44.204.152.173:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="back-color">
      <h3>Update Record</h3>
      <div className="form-decoration">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roll">Roll No: </label>
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
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary btn-secondary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
