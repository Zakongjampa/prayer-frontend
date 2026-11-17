import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authService";
import { setLocalStorage } from "../utils/storage";

const inputClassName =
  "mt-2 w-full rounded-xl border border-[#8b68442e] bg-[#fffaf0b8] px-4 py-3 text-[#5f2d26] outline-none transition placeholder:text-[#927e69] focus:border-[#9b4635] focus:ring-2 focus:ring-[#9b463526]";

export default function Login({ setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await loginUser({
        username: username,
        password: password,
      });

      setLocalStorage(auth);
      setUserId(auth.user.id);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Return to your quiet place."
      description="Sign in to revisit your saved prayers and continue where reflection left off."
      footer={
        <>
          New to the collection?{" "}
          <Link
            className="font-bold !text-[#813f32] underline-offset-4 hover:!text-[#5f2d26] hover:underline"
            to="/signup"
          >
            Create an account
          </Link>
        </>
      }
    >
      {error && (
        <div
          className="mb-5 rounded-xl border border-[#a8323233] bg-[#a8323210] px-4 py-3 text-sm text-[#8b3029]"
          role="alert"
        >
          {error}
        </div>
      )}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="text-sm font-semibold text-[#5f2d26]">
            Username <span lang="bo">མིང་བྱང་།</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className={inputClassName}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="mt-2 text-xs text-[#766253]">
            Enter the username you chose when you joined.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-semibold text-[#5f2d26]">
            Password <span lang="bo">གསང་ཚིག</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={inputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#783b30] px-6 py-3.5 font-semibold text-[#fff7ea] shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] disabled:cursor-not-allowed disabled:opacity-65 motion-reduce:transition-none motion-reduce:hover:transform-none"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
