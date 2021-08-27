import { useQuery } from "@apollo/client";
import { useAuth } from "../util/auth";
import { ME } from "../util/queries";

const renderDate = (date) =>
  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

export default function ProtectedPageExample() {
  const { user } = useAuth();
  const { data, loading } = useQuery(ME, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });
  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <p>
        Last Login:{" "}
        {loading
          ? "Loading..."
          : data && renderDate(new Date(data.me.lastLogin))}
      </p>
      <hr />
      <p>Your id is {user._id}</p>
      <p>Your email is {user.email}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo cumque
        explicabo ipsum, facilis repellendus omnis amet in accusantium quisquam
        nam qui consectetur sunt distinctio nemo molestiae ratione. Iure,
        aliquam debitis.
      </p>
    </div>
  );
}
