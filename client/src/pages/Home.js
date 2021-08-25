export default function Home({ auth }) {
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {auth.isLoggedIn ? "User" : "Guest"}!</h1>
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
