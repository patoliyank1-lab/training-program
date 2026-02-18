'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AVATAR_OPTIONS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
];

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
    const [avatarPreview, setAvatarPreview] = useState<string>(AVATAR_OPTIONS[0]);

    const { register } = useAuth()

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
        validationSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...submitValues } = values;
           register(submitValues)
        },
    });

    const handleAvatarSelect = (url: string) => {
        formik.setFieldValue('avatar', url);
        setAvatarPreview(url);
    };

    return (
        <div className="h-full flex items-center">
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
                    {/* <FormControl error={formik.touched.avatar && Boolean(formik.errors.avatar)}>
                        <FormLabel>Choose Avatar</FormLabel>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                            {AVATAR_OPTIONS.map((url) => (
                                <IconButton
                                    key={url}
                                    onClick={() => handleAvatarSelect(url)}
                                    sx={{
                                        p: 0.5,
                                        border: formik.values.avatar === url
                                            ? '2px solid'
                                            : '2px solid transparent',
                                        borderColor: formik.values.avatar === url
                                            ? 'primary.main'
                                            : 'transparent',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <Avatar
                                        src={url}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </IconButton>
                            ))}
                        </Box>
                        {formik.touched.avatar && formik.errors.avatar && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                {formik.errors.avatar}
                            </Typography>
                        )}
                    </FormControl> */}

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

                    <Grid container spacing={2}>
                        <div>
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
                        </div>
                        <div>
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
                    </Grid>

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
                        <Link href="/login" variant="body2">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </div>
        </div>
    );
}
