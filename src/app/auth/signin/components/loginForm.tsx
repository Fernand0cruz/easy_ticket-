"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    company: z.string().nonempty({
        message: "Campo obrigatório"
    }),
    email: z.string().email({
        message: "Email inválido"
    }).nonempty({
        message: "Campo obrigatório"
    }),
    password: z.string().min(6, {
        message: "A senha precisa conter mais de 6 caracteres"
    }),
});

const LoginForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const login = await signIn("credentials", {
            company: data.company,
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (login?.ok) {
            toast.success("Você entrou com sucesso", {
                position: "bottom-right",
            })
            router.push("/dashboard");
        } else if (login?.error) {
            toast.error(login?.error, {
                position: "bottom-right",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Empresa:<span className="text-red-600">*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Empresa" autoComplete="off" {...field} />
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
                <Button type="submit">Entrar</Button>
            </form>
        </Form>
    );
}

export default LoginForm;