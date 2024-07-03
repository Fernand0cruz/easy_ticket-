import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import NavBar from './components/navBar';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default async function ProtectedRouter({
    children
}: ProtectedRouteProps) {

    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        redirect('/auth/signin')
    }

    return (
        <>
            <NavBar />
            {children}
        </>
    )
}