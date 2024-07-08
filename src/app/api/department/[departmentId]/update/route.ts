import client from "@/lib/prismadb";  
import { NextResponse } from "next/server";  

export async function PUT(req: Request, { params: { departmentId } }: { params: { departmentId: string } }) {
    try {
        // Verifica se departmentId está presente nos parâmetros da requisição
        if (!departmentId) {
            return new NextResponse(JSON.stringify({ message: "ID do Departamento ausente" }), { status: 400 });
        }

        // Verifica se o corpo da requisição contém dados
        const body = await req.json();
        if (!body) {
            return new NextResponse(JSON.stringify({ message: "Dados não encontrado" }), { status: 400 });
        }

        // Atualiza o departamento no banco de dados
        const updatedDepartment = await client.department.update({
            where: {
                id: departmentId,
            },
            data: body,
        });

        // Retorna uma resposta JSON com o departamento atualizado e status 200
        return new NextResponse(JSON.stringify(updatedDepartment), { status: 200 });
    } catch (error: any) {
        // Captura e loga erros internos no console
        console.error('Error updating department:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to update department' }), { status: 500 });
    }
}
