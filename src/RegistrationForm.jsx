import React, { useState } from "react";
import "./App.css";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email format is invalid.";
    if (!age) newErrors.age = "Age is required.";
    else if (isNaN(age) || age < 18)
      newErrors.age = "You must be 18 or older to register.";
    if (!course) newErrors.course = "Please select a course.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
      // Clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");
      setCourse("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Course Registration</h2>

      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Age:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      {errors.age && <p className="error">{errors.age}</p>}

      <label>Select Course:</label>
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        <option value="">-- Select a Course --</option>
        <option value="web">Web Development</option>
        <option value="data">Data Science</option>
        <option value="cyber">Cybersecurity</option>
      </select>
      {errors.course && <p className="error">{errors.course}</p>}

      <button type="submit">Register</button>

      {isSubmitted && (
        <p className="success">Registration successful! 🎉</p>
      )}
    </form>
  );
}

export default RegistrationForm;
