import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/lib/prismadb";
import { Role } from "@/config/enum";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const { name, email, company, password } = body;

        if(!name || !email || !company || !password ){
            return NextResponse.json({ message: "Missing data" }, { status: 400 });
        }

        const userAlreadyExists = await client.user.findFirst({
            where: { email }
        });

        const companyAlreadyExists = await client.company.findFirst({
            where: { name: company }
        });

        if(userAlreadyExists?.id){
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        if(companyAlreadyExists?.id){
            return NextResponse.json({ message: "Company already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userCount = await client.user.count();

        const role = userCount === 0 ? Role.ADMIN : Role.USER;

        const newUser = await client.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
                role: role as Role,
                company: {
                    create: {
                        name: company
                    }
                }
            }
        });

        return NextResponse.json(newUser, {status: 201});

    } catch (err: any) {
        console.error("REGISTER_ERR: " + err);
        return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 });
    }
}