"use client";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";
import { useDepartment } from "@/providers/departmentContetx";

const SeeDepartments = () => {
    // Estado para armazenar os departamentos
    const [departments, setDepartments] = useState<Department[]>([]);
    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true);
    // Utilização do contexto para gerenciar o departamento atual
    const { setCurrentDepartment } = useDepartment();
    
    // Efeito para buscar os departamentos ao montar o componente
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch('/api/department/departments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.message || "Erro desconhecido");
                }

                const departmentsData: Department[] = await res.json();
                // Atualiza o estado com os dados dos departamentos
                setDepartments(departmentsData);
            } catch (error: any) {
                toast.error(error.message || "Erro ao carregar departamentos", {
                    position: "bottom-right",
                });
            } finally {
                // Marca o carregamento como concluído, independentemente de sucesso ou erro
                setLoading(false);
            }
        };

        // Chama a função para buscar os departamentos
        fetchDepartments();
    }, []);

    // Função para lidar com a exclusão de um departamento
    const handleDeleteDepartment = async (departmentId: string) => {
        try {
            const res = await fetch(`/api/department/${departmentId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || "Erro ao excluir departamento");
            }
    
            // Remove o departamento excluído do estado
            setDepartments((prevDepartments) =>
                prevDepartments.filter((department) => department.id !== departmentId.toString())
            );

            toast.success("Departamento excluido com sucesso!", {
                position: "bottom-right",
            });
        } catch (error: any) {
            toast.error(error.message || "Erro ao excluir departamento", {
                position: "bottom-right",
            });
        }
    };

    // Função para lidar com a edição de um departamento
    const handleEditDepartment = (department: Department) => {
        // Define o departamento atual no contexto para edição
        setCurrentDepartment(department);
    };

    return (
        <div>
            {loading ? (
                <p className="mt-2">Carregando departamentos...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Localização</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Editar</TableHead>
                            <TableHead>Excluir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.location}</TableCell>
                                <TableCell>{department.phone}</TableCell>
                                <TableCell>{department.email}</TableCell>
                                <TableCell>{department.status}</TableCell>
                                <TableCell>
                                    <Button className="flex gap-2" onClick={() => handleEditDepartment(department)}>
                                        <PenBox />Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button className="flex gap-2 bg-red-600" onClick={() => handleDeleteDepartment(department.id)}>
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
};

export default SeeDepartments;
