import Link from 'next/link';
import LoginForm from './components/loginForm';

const PageSignin = () => {
    return ( 
        <div>
            <h1>Login</h1>
            <LoginForm />
            <Link href={`/auth/signup`}>Criar Conta</Link>
        </div>
    );
}
 
export default PageSignin;