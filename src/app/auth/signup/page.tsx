import Link from 'next/link';
import RegisterForm from './components/registerForm';

const PageSignUp = () => {
    return (
        <div>
            <h1>Criar conta admin</h1>
            <RegisterForm/>
            <Link href={`signin`}>Logar</Link>
        </div>
    );
}
 
export default PageSignUp;