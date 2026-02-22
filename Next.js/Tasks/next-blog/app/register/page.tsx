'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required'),
    age: Yup.number()
        .typeError('Age must be a number')
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must be at most 120')
        .integer('Age must be a whole number')
        .required('Age is required'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
        .required('Gender is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password requires at least one lowercase letter')
        .matches(/[A-Z]/, 'Password requires at least one uppercase letter')
        .matches(/[0-9]/, 'Password requires at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password requires at least one symbol'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

export default function Register() {
    const { register, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
        validationSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...submitValues } = values;
            register(submitValues)
        },
    });

    return (
        <div className="min-h-[80vh] flex items-center">
            <div className="flex flex-col items-center justify-center w-full max-w-lg p-5 gap-2 m-auto">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Create Account
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
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            required
                            fullWidth
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </FormControl>

                    <div className="flex gap-4">
                        <FormControl fullWidth>
                            <FormLabel htmlFor="age">Age</FormLabel>
                            <TextField
                                id="age"
                                name="age"
                                type="number"
                                placeholder="25"
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.age && Boolean(formik.errors.age)}
                                helperText={formik.touched.age && formik.errors.age}
                                inputProps={{ min: 1, max: 120 }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <TextField
                                id="gender"
                                name="gender"
                                select
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </FormControl>
                    </div>

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
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
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
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

                    <FormControl>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            fullWidth
                            variant="outlined"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1 }}
                    >
                        Create Account
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link href="/login" className="text-[var(--primary)] no-underline hover:underline">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </div>
        </div>
    );
}
