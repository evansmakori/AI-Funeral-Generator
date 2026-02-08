import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const createLoginError = (message, field) => ({ message, field });

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!email.trim()) {
      setError(createLoginError("Email is required", "email"));
      return false;
    }
    if (!email.includes("@")) {
      setError(createLoginError("Please enter a valid email", "email"));
      return false;
    }
    if (!password) {
      setError(createLoginError("Password is required", "password"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      // Success - redirect to app
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
        <title>Login</title>
      </Head>
      <main className="min-h-screen bg-slate-50">
        <Container className="py-16">
          <Card className="max-w-md mx-auto p-8">
            <h1 className="font-serif text-3xl text-slate-800">Login</h1>
            <p className="mt-2 text-sm text-slate-600">
              Login to access the program generator.
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
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  aria-invalid={error?.field === "password"}
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Continue"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </Card>
        </Container>
      </main>
    </>
  );
}
