"use client"

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LogoutBtn = () => {
    const handleLogout = async () => {
        try {
            await signOut();
            toast.success("You have been logged out");
            window.location.href = "/auth/signin";
        } catch (error) {
            console.error("Error during sign out:", error);
            toast.error("Error during sign out. Please try again.");
        }
    };

    return (
        <div onClick={handleLogout}>
            Logout
        </div>
    );
};

export default LogoutBtn;
