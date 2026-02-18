'use client';

import ProtectedRoute from "../utils/ProtectedRoute";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
