import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default async function ProtectedRouter({
    children
}: ProtectedRouteProps) {

    const session = await getServerSession(authOptions)

    if(!session?.user?.email){
        redirect('/auth/signin')
    }

    return (
        <>
            ProtectedRouteProps
            {children}
        </>
    )
}