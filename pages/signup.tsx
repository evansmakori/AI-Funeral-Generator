import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getFirebaseAuth } from "../lib/firebase/client";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    // Validate name
    if (!name.trim()) {
      setError({ message: "Name is required", field: "name" });
      return false;
    }
    if (name.trim().length < 2) {
      setError({ message: "Name must be at least 2 characters", field: "name" });
      return false;
    }

    // Validate email
    if (!email.trim()) {
      setError({ message: "Email is required", field: "email" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError({ message: "Please enter a valid email address", field: "email" });
      return false;
    }

    // Validate password
    if (!password) {
      setError({ message: "Password is required", field: "password" });
      return false;
    }
    if (password.length < 8) {
      setError({ 
        message: "Password must be at least 8 characters", 
        field: "password" 
      });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError({ 
        message: "Password must contain at least one uppercase letter", 
        field: "password" 
      });
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError({ 
        message: "Password must contain at least one number", 
        field: "password" 
      });
      return false;
    }

    // Validate password confirmation
    if (!confirmPassword) {
      setError({ message: "Please confirm your password", field: "confirmPassword" });
      return false;
    }
    if (password !== confirmPassword) {
      setError({ 
        message: "Passwords do not match", 
        field: "confirmPassword" 
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const auth = getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      if (name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
      }
      const idToken = await credential.user.getIdToken();

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Signup failed");
      }

      // Success - redirect to login or dashboard
      router.push("/app");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="min-h-screen bg-slate-50">
        <Container className="py-16">
          <Card className="max-w-md mx-auto p-8">
            <h1 className="font-serif text-3xl text-slate-800">Create Account</h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign up to access the program generator.
            </p>

            {error && (
              <div
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
                role="alert"
              >
                {error.message}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="label">
                  Full Name
                </label>
                <input
                  id="name"
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  disabled={loading}
                  aria-invalid={error?.field === "name"}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={loading}
                  aria-invalid={error?.field === "email"}
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="input pr-10"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    aria-invalid={error?.field === "password"}
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Must contain: 8+ characters, 1 uppercase letter, 1 number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  disabled={loading}
                  aria-invalid={error?.field === "confirmPassword"}
                  placeholder="Re-enter your password"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>

            <p className="mt-4 text-xs text-slate-500 text-center">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              {" "}and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </Card>
        </Container>
      </main>
    </>
  );
}
