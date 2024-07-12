import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface RequestBody {
    name: string;
    email: string;
    selectDepartment: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json();
        const { name, email, selectDepartment, password } = body;

        // Verifica se todos os campos obrigatórios estão presentes
        if (!name || !email || !selectDepartment || !password) {
            const missingField = !name ? "nome" : !email ? "email" : !selectDepartment ? "empresa" : "senha";
            return NextResponse.json({ message: `Campo ${missingField} é obrigatório` }, { status: 400 });
        }

        // Gera o hash da senha usando bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Obtém a sessão do usuário autenticado usando as opções de autenticação
        const session = await getServerSession(authOptions);
        // Extrai o nome da empresa da sessão, se disponível
        const companyName = session?.user.company; 

        if (!companyName) {
            return NextResponse.json({ message: "Sessão da empresa inválida" }, { status: 400 });
        }

        // Busca o ID da empresa associada à sessão
        const company = await client.company.findFirst({
            where: { name: companyName }
        });
        
        if (!company) {
            return NextResponse.json({ message: "Sessão da empresa inválida" }, { status: 400 });
        }

        // Busca o ID do department associada ao user
        const department = await client.department.findFirst({
            where: { name: selectDepartment }
        });

        // Verifica se já existe um usuário com o mesmo email na mesma empresa
        const existingUser = await client.user.findFirst({
            where: {
                email,
                companyId: company.id
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Já existe um usuário com este e-mail nesta empresa" }, { status: 400 });
        }

        // Cria um novo usuário associado à empresa encontrada
        const newUser = await client.user.create({
            data: {
                name,
                email,
                hashedPassword,
                department: {
                    connect: {
                        id: department?.id
                    }
                },
                company: {
                    connect: {
                        id: company.id
                    }
                },
            },
        });

        // Retorna uma resposta de sucesso
        return NextResponse.json({}, { status: 200 });
    } catch (err: any) {
        console.error("REGISTER_ERR:", err); 
        // Retorna uma resposta JSON com status 500 em caso de erro
        return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 }); 
    }
}
