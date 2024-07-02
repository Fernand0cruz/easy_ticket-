import Link from 'next/link';
import LoginForm from './components/loginForm';
import { Card } from '@/components/ui/card';

const PageSignin = () => {
    return (
        <Card className='max-w-screen-xl m-auto w-[90%] sm:w-[70%] md:w-[500px] bg-accent p-5 rounded-md'>
            <Link href={"/"}>
                <h1 className="font-bold text-xl text-center">: : : : EASY TICKET : : : :</h1>
            </Link>
            <div className='flex flex-col gap-2 mt-2'>
                <LoginForm />
                <Link href={`/auth/signup`}>Criar Conta</Link>
            </div>
        </Card>
    );
}

export default PageSignin;