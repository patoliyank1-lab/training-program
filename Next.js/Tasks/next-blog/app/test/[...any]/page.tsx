'use client'
 
import { useSearchParams } from 'next/navigation'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiQuillPenLine } from "react-icons/ri";

const validationSchema = Yup.object({
  email: Yup.string()
});

export default function SignIn() {
    const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
  const { login, isAuthenticated, isLoading } = useAuth();
  const [text, setText] = useState(search)
  let a:{name:string} = {name : search as string}; 
  console.log(a);
  
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setText(values.email)
    },
  });


  const inputClass = "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] outline-none focus:border-[var(--primary)] transition-colors duration-200";
    const labelClass = "text-sm font-medium text-[var(--text-heading)] mb-1";
    const errorClass = "text-xs text-[var(--error)] mt-1";


  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="rounded-xl min-w-xl mt-5 overflow-hidden bg-(--surface-raised) border border-(--border) p-5">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-(--primary) no-underline"
        >
          <RiQuillPenLine size={45} />
          <span>BlogApp</span>
        </h1>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <label htmlFor="password" className={labelClass}>Email</label>
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
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <button
            type="submit"
            className="text-sm px-4 py-1.5 rounded-md border border-(--primary) bg-(--primary) text-(--primary-text) no-underline transition-all duration-200 hover:bg-(--primary-hover)"
          >
            Sign in
          </button>
        </Box>
        <div className="mt-3">
          Create new account?{" "}
          <Link
            href="/register"
            className="text-(--primary) no-underline hover:underline"
          >
            Click here
          </Link>
        </div>

        <div className="flex justify-center items-center p-5 text-3xl text-red-500">
            {text}
        </div>
      </div>
    </div>
  );
}
