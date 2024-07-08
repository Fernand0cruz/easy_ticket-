"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatPhone } from "@/lib/formatPhone";

const formSchema = z.object({
    name: z.string().nonempty({
        message: "Campo obrigatório"
    }),
    email: z.string().email({
        message: "Email inválido"
    }).nonempty({
        message: "Campo obrigatório"
    }),
    company: z.string().nonempty({
        message: "Campo obrigatório"
    }),
    phone: z.string().nonempty({
        message: "Campo obrigatório",
    }),
    password: z.string().min(6, {
        message: "A senha precisa conter mais de 6 caracteres"
    }).nonempty({
        message: "Campo obrigatório"
    }),
});

const RegisterForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch('/api/register', {
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

            toast.success("Conta ADMIN criada com sucesso!", {
                position: "bottom-right",
            });

            router.push("/auth/signin");
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
                                <Input type="email" placeholder="Email" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da empresa:<span className="text-red-600">*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nome da empresa" autoComplete="off" {...field} />
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
                <Button type="submit">Criar conta</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
