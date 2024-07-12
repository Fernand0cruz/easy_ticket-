"use client"
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

interface userWithDepartment extends User {
    department: {
        name: string
    }
}

const SeeUsers = () => {
    // Estado para armazenar os usuários
    const [users, setUsers] = useState<userWithDepartment[]>([])
    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true);

    // Efeito para buscar os usuários ao montar o componente
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if (!res.ok) {
                    const errorResponse = await res.json()
                    throw new Error(errorResponse.message || "Erro desconhecido");
                }

                const usersData: userWithDepartment[] = await res.json()
                // Atualiza o estado com os dados dos usuarios
                setUsers(usersData)
            } catch (error: any) {
                toast.error(error.message || "Erro ao carregar usuários", {
                    position: "bottom-right",
                });
            } finally {
                // Marca o carregamento como concluído, independentemente de sucesso ou erro
                setLoading(false);
            }
        }

        // Chama a função para buscar os usuários
        fetchUsers()
    }, [])

    return (
        <div>
            {loading ? (
                <p className="mt-2">Carregando usuários...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Departamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Editar</TableHead>
                            <TableHead>Excluir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.department.name}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>
                                    <Button className="flex gap-2">
                                        <PenBox />Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button className="flex gap-2 bg-red-600">
                                        <Trash />Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default SeeUsers;

