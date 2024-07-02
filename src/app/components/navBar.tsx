import { Menubar } from "@/components/ui/menubar";
import Link from "next/link";

const NavBar = () => {
    return (
        <Menubar>
            <div className="flex justify-between w-full max-w-screen-xl m-auto p-5">
                <Link href={"/"}>
                    <h1 className="font-bold text-xl">: : : : EASY TICKET : : : :</h1>
                </Link>
                <div className="flex gap-2">
                    <Link href={`auth/signup`}>Cadastrar</Link>
                    <Link href={`auth/signin`}>Entrar</Link>
                </div>
            </div>
        </Menubar>
    );
}

export default NavBar;
