import client from "@/lib/prismadb";  
import { NextResponse } from "next/server";  

export async function DELETE(req: Request, { params: { departmentId } }: { params: { departmentId: string } }) {
    try {
        // Verifica se departmentId está presente nos parâmetros da requisição
        if (!departmentId) {
            return new NextResponse(JSON.stringify({ message: "ID do departametno ausente" }), { status: 400 });
        }

        // Conta quantos usuários estão vinculados ao departamento especificado
        const usersCount = await client.user.count({
            where: {
                departmentId: departmentId,
            },
        });

        // Se houver usuários vinculados, retorna um erro 400
        if (usersCount > 0) {
            return new NextResponse(
                JSON.stringify({ message: "Existem usuários vinculados a este departamento. Não é possível excluir." }),
                { status: 400 }
            );
        }

        // Realiza a exclusão do departamento no banco de dados
        const department = await client.department.delete({
            where: {
                id: departmentId,
            },
        });

        // Retorna uma resposta JSON com o departamento excluído e status 200
        return new NextResponse(JSON.stringify(department), { status: 200 });
    } catch (error: any) {
        // Captura e loga erros internos no console
        console.error('Error deleting department:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to delete department' }), { status: 500 });
    }
}
