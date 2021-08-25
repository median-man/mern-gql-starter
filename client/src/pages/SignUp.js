import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { CREATE_USER } from "../util/mutations";

// This signup form is intentionally minimalist to reduce effort required to
// customize it to your app's needs. See the excellent best practices guide for
// sign informs on web.dev https://web.dev/sign-in-form-best-practices/

// TODO: customize styles or import styles with favorite css approach
const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
};

const initialFormState = {
  username: "",
  email: "",
  password: "",
};

export default function SignUp({ auth }) {
  const { isLoggedIn, setToken } = auth;
  const [createUser, { data, loading }] = useMutation(CREATE_USER);
  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      // TODO: add error handling
      alert(error.message);
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    const token = data?.createUser.token;
    if (token) {
      setToken(token);
    }
  }, [data, setToken]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // TODO: implement improved validation.
      if (!formState.email || !formState.password || !formState.username) {
        // TODO: implement improved error message and replace alert
        alert("Provide a valid email, username, and password.");
        return;
      }

      await createUser({ variables: formState });
    } catch (error) {
      setError(error);
    }
  };
  if (isLoggedIn) {
    // redirect to home if user is logged in
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div style={styles.formControl}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            autoFocus
            disabled={loading}
            id="username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={formState.username.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            disabled={loading}
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formState.email.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <label htmlFor="new-password" style={styles.label}>
            Password
          </label>
          <input
            disabled={loading}
            id="new-password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formState.password.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
