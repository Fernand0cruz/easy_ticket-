import { authOptions } from "@/lib/authOptions";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Define uma interface para o corpo da requisição
interface RequestBody {
    name: string;
    location: string;
    phone: string;
    email: string;
}

export async function POST(req: Request) { 
    try {
        // Faz o parse do corpo da requisição como JSON
        const body: RequestBody = await req.json(); 
        // Extrai name, location, phone e email do corpo da requisição
        const { name, location, phone, email } = body; 

        // Verifica se todos os campos obrigatórios estão presentes
        if (!name || !phone || !email) {
            const missingField = !name ? "name" : !phone ? "phone" : "email";
            return NextResponse.json({ message: `Campo ${missingField} é obrigatório` }, { status: 400 });
        }

        // Obtém a sessão do usuário autenticado
        const session = await getServerSession(authOptions);
        const company = session?.user.company;

        // Busca o ID da empresa associada à sessão
        const companyId = await client.company.findFirst({
            where: { name: company }
        });

        // Verifica se o ID da empresa foi encontrado
        if (!companyId) {
            return NextResponse.json({ message: "Sessão da empresa inválida" }, { status: 400 });
        }

        // Verifica se o departamento já existe dentro da mesma empresa
        const departmentAlreadyExists = await client.department.findFirst({
            where: {
                name,
                // Filtra pelo ID da empresa
                companyId: companyId.id 
            }
        });

        // Se o departamento já existe, retorna um erro
        if (departmentAlreadyExists?.id) {
            return NextResponse.json({ message: "Departamento já existe" }, { status: 400 });
        }

        // Cria um novo departamento associado à empresa
        const newDepartment = await client.department.create({
            data: {
                name,
                location,
                phone,
                email,
                company: {
                    connect: {
                        id: companyId.id
                    }
                }
            }
        });

        // Retorna uma resposta de sucesso
        return NextResponse.json({}, { status: 200 });
    } catch (err: any) {
        // Captura e loga erros internos
        console.error("REGISTER_ERR:", err);
        return NextResponse.json({ message: "Erro interno do servidor", error: err.message }, { status: 500 });
    }
}
