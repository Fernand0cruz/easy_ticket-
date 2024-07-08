"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod"; 
import toast from "react-hot-toast"; 
import { useEffect, useState } from "react"; 
import { formatPhone } from "@/lib/formatPhone"; 
import { useDepartment } from "@/providers/departmentContetx"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

// Definição do esquema de validação para o formulário
const formSchema = z.object({
    name: z.string().nonempty({
        message: "Campo obrigatório",
    }),
    location: z.string().optional(),
    phone: z.string().nonempty({
        message: "Campo obrigatório",
    }).regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
        message: "Número de telefone inválido"
    }),
    email: z.string().email({
        message: "Email inválido"
    }),
    // Deixa o status opcional no esquema de validação
    status: z.string().optional(), 
});

const FormCreateDepartment = () => {
    // Estado para controlar o carregamento
    const [isLoading, setIsLoading] = useState(false); 
    // Hook personalizado para obter o departamento atual
    const { currentDepartment } = useDepartment(); 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    // Efeito para resetar o formulário ao mudar o departamento atual
    useEffect(() => {
        if (currentDepartment) {
            form.reset({
                name: currentDepartment?.name || '',
                phone: currentDepartment?.phone || '',
                email: currentDepartment?.email || '',
                location: currentDepartment?.location || '',
                status: currentDepartment?.status || '',
            });
        }
    }, [currentDepartment, form]);

    // Função de submissão do formulário
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Define o estado de carregamento como verdadeiro
        setIsLoading(true); 
        try {
            const endpoint = currentDepartment ? `/api/department/${currentDepartment.id}/update` : '/api/department/create'; 
            const method = currentDepartment ? 'PUT' : 'POST'; 

            // Faz a requisição HTTP para criar ou atualizar o departamento
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Lança erro se a resposta não for OK
            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || "Erro desconhecido");
            }

            // Exibe mensagem de sucesso usando a biblioteca de notificações
            toast.success(currentDepartment ? "Departamento atualizado com sucesso!" : "Departamento criado com sucesso!", {
                position: "bottom-right",
            });

            // Recarrega a página após a operação ser concluída com sucesso
            window.location.reload();

        } catch (err: any) {
            toast.error(err.message || "Algo deu errado", {
                position: "bottom-right",
            });
        } finally {
            // Define o estado de carregamento como falso ao finalizar
            setIsLoading(false); 
        }
    };

    const formFields = () => (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Departamento:<span className="text-red-600">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nome do Departamento" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Localização:</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Localização" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Telefone:<span className="text-red-600">*</span></FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="(00) 00000-0000"
                                autoComplete="off"
                                value={formatPhone(field.value)}
                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email:<span className="text-red-600">*</span></FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="email@gmail.com" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Campo de status (opcional) */}
            {currentDepartment && (
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status:<span className="text-red-600">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="desactive">Desativar</SelectItem>
                                    <SelectItem value="active">Ativar</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </>
    );

    return (
        <div>
            {currentDepartment ? `Editar Departamento` : 'Criar Departamento'} 
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    {formFields()}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Salvando..." : currentDepartment ? "Editar Departamento" : "Criar Departamento"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FormCreateDepartment;
