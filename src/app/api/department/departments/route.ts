import { NextResponse } from 'next/server';
import client from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const company = session.user.company;

        // Verifica se a empresa existe e obtém seu ID
        const companyData = await client.company.findUnique({
            where: {
                name: company,
            },
            select: {
                id: true,
            },
        });

        if (!companyData) {
            return NextResponse.json({ message: "Empresa não encontrada" }, { status: 404 });
        }

        // Busca todos os departamentos da empresa pelo companyId
        const departments = await client.department.findMany({
            where: {
                companyId: companyData.id,
            },
        });

        // Retorna a resposta JSON com a lista de departamentos
        return NextResponse.json(departments);
    } catch (error: any) {
        // Captura e loga erros internos
        console.error('Error fetching departments:', error);
        return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
    }
}

