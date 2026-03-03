"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[A-Z]/, "Password requires at least one uppercase letter")
    .matches(/[0-9]/, "Password requires at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password requires at least one symbol"),
});

export default function SignIn() {

  const { login, isAuthenticated, isLoading, error } = useAuth();
  const router = useRouter();
  

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });


  const inputClass = "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] outline-none focus:border-[var(--primary)] transition-colors duration-200";
    const labelClass = "text-sm font-medium text-[var(--text-heading)] mb-1";
    const errorClass = "text-xs text-red-500 mt-1";


  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="rounded-xl min-w-xl mt-5 overflow-hidden bg-(--surface-raised) border border-(--border) p-5">
       <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-(--primary) no-underline"
        >
          Sign in
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="flex flex-col w-full gap-2" >
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              className={inputClass}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <p className={errorClass}>{formik.errors.email}</p>}
     
            <label htmlFor="password" className={labelClass} >Password</label>
            <input
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.password && formik.touched.password && <p className={errorClass}>{formik.errors.password}</p>}
            {error && (
              <p className={`${errorClass} text-center`}>{error}</p>
            )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-3">
          Create new account?{" "}
          <Link
            href="/register"
            className="text-(--primary) no-underline hover:underline"
          >
            Click here
          </Link>
        </div>
      </Card>
    </div>
  );
}
