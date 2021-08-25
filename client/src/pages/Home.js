import { useAuth } from "../util/auth";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? "User" : "Guest"}!</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo cumque
        explicabo ipsum, facilis repellendus omnis amet in accusantium quisquam
        nam qui consectetur sunt distinctio nemo molestiae ratione. Iure,
        aliquam debitis.
      </p>
    </div>
  );
}
