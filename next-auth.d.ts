import "next-auth";
import { Role } from "@/config/enum";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: Role;
        company: string
    }

    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string
        role: Role;
        company: string
    }
}

