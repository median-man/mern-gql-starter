import { useAuth } from "../util/auth";

export default function ProtectedPageExample() {
  const { user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {user.username}!</h1>
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
