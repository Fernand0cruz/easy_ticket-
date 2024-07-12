"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Department } from "@prisma/client";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().nonempty({
        message: "Campo obrigatório"
    }),
    email: z.string().email({
        message: "Email inválido"
    }).nonempty({
        message: "Campo obrigatório"
    }),
    selectDepartment: z.string().nonempty({
        message: "Campo obrigatório"
    }),
    password: z.string().min(6, {
        message: "A senha precisa conter mais de 6 caracteres"
    }).nonempty({
        message: "Campo obrigatório"
    }),
});

const FormCreateUser = () => {

    const [departments, setDepartments] = useState<Department[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/api/department/departments');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message);
            }

            toast.success("Cadastrado com sucesso!", {
                position: "bottom-right",
            });

            window.location.reload();

        } catch (err: any) {
            toast.error(err.message, {
                position: "bottom-right",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome completo:<span className="text-red-600">*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nome completo" autoComplete="off" {...field} />
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
                                <Input type="email" placeholder="Email" autoComplete="off"{...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="selectDepartment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Departamento:<span className="text-red-600">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o departamento" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {departments.length > 0 ? (
                                        departments.map((department: Department) => (
                                            <SelectItem key={department.name} value={department.name}>{department.name}</SelectItem>
                                        ))
                                    ) : (
                                        <p>No departments available</p>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha:<span className="text-red-600">*</span></FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Criar usuário</Button>
            </form>
        </Form>
    );
};

export default FormCreateUser;
