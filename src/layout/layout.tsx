import {  Navigate, Outlet } from "react-router";
import { authClient } from "../lib/auth-client";

export default function ProtectedLayout() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <div className="">
        <span className=" text-slate-400 text-4xl">Loading your data..</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <p className="text-sm">Something went wrong: {error.message}</p>
      </div>
    );
  }

  if (!data?.session) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}