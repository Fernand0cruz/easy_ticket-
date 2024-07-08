import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/lib/prismadb"; 
import { Role } from "@/config/enum"; 

interface RequestBody {
    name: string;
    email: string;
    company: string;
    phone: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json(); 
        // Extrai name, email, company, phone e password do corpo da requisição
        const { name, email, company, phone, password } = body; 

        // Verifica se todos os campos obrigatórios estão presentes
        if (!name || !email || !company || !phone || !password) {
            const missingField = !name ? "name" : !email ? "email" : !company ? "company" : !phone ? "phone" : "password";
            return NextResponse.json({ message: `Campo ${missingField} é obrigatório` }, { status: 400 });
        }

        // Verifica se o usuário já existe no banco de dados
        const userAlreadyExists = await client.user.findFirst({
            where: { email }
        });

        if (userAlreadyExists) {
            return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });
        }

        // Verifica se a empresa já existe no banco de dados
        const companyAlreadyExists = await client.company.findFirst({
            where: { name: company }
        });

        if (companyAlreadyExists) {
            return NextResponse.json({ message: "Empresa já existe" }, { status: 400 });
        }

        // Faz o hash da senha com o bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Define o papel do usuário como ADMIN
        const role = Role.ADMIN;

        // Cria uma nova empresa ou conecta com uma existente
        const newCompany = companyAlreadyExists || await client.company.create({
            data: {
                name: company
            }
        });

        // Cria um novo usuário no banco de dados e um departamento para o ADMIN
        const newUser = await client.user.create({
            data: {
                name,
                email,
                phone,
                hashedPassword,
                role,
                company: {
                    connect: {
                        id: newCompany.id
                    }
                },
                department: {
                    create: {
                        name: "Gestão do Sistema",
                        phone,
                        email,
                        company: {
                            connect: {
                                id: newCompany.id
                            }
                        }
                    }
                }
            }
        });

        // Retorna a resposta JSON com o novo usuário e status 201
        return NextResponse.json(newUser, { status: 201 });

    } catch (err: any) {
        console.error("REGISTER_ERR:", err);
        // Retorna uma resposta JSON com status 500 em caso de erro
        return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 }); 
    }
}
