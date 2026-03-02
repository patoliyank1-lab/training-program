'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
            gender: 'male',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
        validationSchema,
        onSubmit: (values) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...submitValues } = values;
            
            register(submitValues)
        },
    });


    const inputClass = "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] outline-none focus:border-[var(--primary)] transition-colors duration-200";
    const labelClass = "text-sm font-medium text-[var(--text-heading)] mb-1";
    const errorClass = "text-xs text-red-500 mt-1";

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <div className="rounded-xl min-w-xl mt-5 overflow-hidden bg-(--surface-raised) border border-(--border) p-5">
                <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-(--primary) no-underline"
                >
                    <span>Create Account</span>
                </h1>

                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    className='flex flex-col w-full gap-2'>
                        <label className={labelClass} htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            required
                            className={inputClass}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && <p className={errorClass}>{formik.errors.name}</p>}

                    <div className="flex w-full gap-4">
                      <div className='flex-col flex-1'>
                            <label className={labelClass} htmlFor="age">Age</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="25"
                                required
                                className={inputClass}
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min={10}
                                max={100}
                            />
                            {formik.touched.age && formik.errors.age && <p className={errorClass}>{formik.errors.age}</p>}
                            </div>
                            
                            <div className='flex flex-col flex-1'>
                            <label className={labelClass} htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                required
                                className={inputClass}
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && <p className={errorClass}>{formik.errors.gender}</p>}
                            </div>
                    </div>

                        <label className={labelClass} htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            required
                            className={inputClass}

                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <p className={errorClass}>{formik.errors.email}</p>}
               

                 
                        <label className={labelClass} htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            className={inputClass}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <p className={errorClass}>{formik.errors.password}</p>}
        

                        <label className={labelClass} htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        className={inputClass}
                            
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className={errorClass}>{formik.errors.confirmPassword}</p>}
                   

                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>

                    <div className='mt-3'>
                        Already have an account?{' '}
                        <Link href="/login" className="text-(--primary) no-underline hover:underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
