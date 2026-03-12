import { authClient } from "../lib/auth-client";
import { Navigate, useNavigate } from "react-router";

export default function SignUp() {
  const { data, isPending, error } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 text-slate-700">
        <span className="text-sm text-slate-500">Checking your session…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 text-red-500">
        <p className="text-sm">Something went wrong: {error.message}</p>
      </div>
    );
  }

  if (data?.session) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authClient.signUp.email(
        { name: name, email: email, password: password },
        {
          onSuccess: () => {
            navigate("/app");
          },
          onError: (ctx) => {
            alert("error");
            console.log(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="border" placeholder="name" />
        <input
          type="email"
          name="email"
          className="border"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          className="border"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
