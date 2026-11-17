import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authService";

const inputClassName =
  "mt-2 w-full rounded-xl border border-[#8b68442e] bg-[#fffaf0b8] px-4 py-3 text-[#5f2d26] outline-none transition placeholder:text-[#927e69] focus:border-[#9b4635] focus:ring-2 focus:ring-[#9b463526]";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...data,
        isAdmin: Boolean(data.isAdmin),
      };

      await registerUser(payload);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Join the collection"
      title="Make space for what matters."
      description="Create an account to save the prayers you cherish and return to them whenever you need."
      footer={
        <>
          Already a member?{" "}
          <Link
            className="font-bold !text-[#813f32] underline-offset-4 hover:!text-[#5f2d26] hover:underline"
            to="/login"
          >
            Sign in
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="text-sm font-semibold text-[#5f2d26]">
              First name
            </label>
            <input
              id="first_name"
              type="text"
              autoComplete="given-name"
              className={inputClassName}
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="text-sm font-semibold text-[#5f2d26]">
              Last name
            </label>
            <input
              id="last_name"
              type="text"
              autoComplete="family-name"
              className={inputClassName}
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="username" className="text-sm font-semibold text-[#5f2d26]">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            className={inputClassName}
            name="username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-[#5f2d26]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClassName}
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-[#5f2d26]">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className={inputClassName}
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <p className="mt-2 text-xs text-[#766253]">Use at least 8 characters.</p>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#783b30] px-6 py-3.5 font-semibold text-[#fff7ea] shadow-[0_7px_18px_rgba(74,31,25,0.18)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#bd795e] disabled:cursor-not-allowed disabled:opacity-65 motion-reduce:transition-none motion-reduce:hover:transform-none"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
