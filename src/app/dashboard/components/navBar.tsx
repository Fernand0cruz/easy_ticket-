import {
    Menubar,
} from "@/components/ui/menubar"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Archive, Bolt, ClipboardPenLine, ClipboardPlus, Home, Menu, Ticket, TicketCheckIcon, TicketPlus, TicketSlash, UserRoundIcon, UserRoundPlus } from "lucide-react";
import { Card } from "@/components/ui/card";

const NavBar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <Menubar className="flex justify-between items-center px-5 py-2">
            <Sheet>
                <SheetTrigger><Menu /></SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <ul className="flex flex-col">
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><Home />Página Inicial</Link>
                                </SheetClose>
                            </li>
                            {
                                session?.user.role === "ADMIN" ? (
                                    <>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href="dashboard/admin" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><Bolt />Admin Configs</Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href="/dashboard/users" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><UserRoundPlus />Usuários</Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href="/dashboard/departments" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><ClipboardPlus />Departamentos</Link>
                                            </SheetClose>
                                        </li>
                                        <li>
                                            <SheetClose asChild>
                                                <Link href="/dashboard/alltickets" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><TicketCheckIcon />Todos os chamados</Link>
                                            </SheetClose>
                                        </li>
                                    </>
                                ) : (
                                    null
                                )
                            }
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard/tickets" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><Ticket />Chamados</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard/mytickets" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><TicketSlash />Meus Chamados</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard/ticketsforadmin" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><TicketPlus />Abrir Chamado Para ADMIN</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard/filebase" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><Archive />Base de Arquivos</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link href="/dashboard/support" className="flex gap-2 items-center justify-start p-2 hover:bg-accent"><ClipboardPenLine />Suporte EASYTICKET</Link>
                                </SheetClose>
                            </li>

                        </ul>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Sheet>
                <Card className="p-2">
                    <SheetTrigger className="flex justify-center items-center gap-2">
                        <span>Perfil</span>
                        <Avatar className="w-[25px] h-[25px]">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </SheetTrigger>
                    <SheetContent side={"right"}>
                        <SheetHeader>
                            Olá, {session?.user.name}!
                        </SheetHeader>
                    </SheetContent>
                </Card>
            </Sheet>
        </Menubar >
    );
}

export default NavBar;