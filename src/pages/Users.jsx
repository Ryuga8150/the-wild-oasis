import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default Users;
