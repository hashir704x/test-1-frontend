import { Link, Outlet } from "react-router";
import { authClient } from "../lib/auth-client";
export default function SimpleLayout() {
  const { data, isPending, error } = authClient.useSession();
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <nav className="flex gap-10 border p-2">
        <Link to="/">Home</Link>
        {!data ? (
          <div className="flex gap-10">
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign up</Link>
         
          </div>
        ) : (
          <div>
            <Link to="/app">Books</Link>
            <button className="border border-red-500" onClick={() => authClient.signOut()}>Logout</button>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
}
