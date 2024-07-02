import Link from 'next/link';
import RegisterForm from './components/registerForm';
import { Card } from '@/components/ui/card';

const PageSignUp = () => {
    return (
        <Card className='max-w-screen-xl m-auto w-[90%] sm:w-[70%] md:w-[500px] bg-accent p-5 rounded-md'>
            <Link href={"/"}>
                <h1 className="font-bold text-xl text-center">: : : : EASY TICKET : : : :</h1>
            </Link>
            <div className='flex flex-col gap-2 mt-2'>
                <h1>Registrar conta ADMIN</h1>
                <RegisterForm />
                <Link href={`signin`}>Entrar</Link>
            </div>
        </Card>
    );
}

export default PageSignUp;