'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password requires at least one lowercase letter')
        .matches(/[A-Z]/, 'Password requires at least one uppercase letter')
        .matches(/[0-9]/, 'Password requires at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password requires at least one symbol')
});

export default function SignIn() {
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values)
        },
    });

    return (
        <div className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col items-center justify-center w-full max-w-md p-5 gap-2 m-auto'>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign in
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Create new account?{' '}
                    <Link href="/register" className="text-(--primary) no-underline hover:underline">
                        Click here
                    </Link>
                </Typography>
            </div>
        </div>
    );
}
