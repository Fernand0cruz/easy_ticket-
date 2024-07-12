import { Card } from "@/components/ui/card";
import FormCreateUser from "./components/formCreateUser";
import SeeUsers from "./components/seeUsers";

const Users = () => {
    return (
        <div className="p-5 flex flex-col gap-5 max-w-screen-xl mx-auto w-full">
            <Card className="p-5">
                Criar Usuários
                <FormCreateUser />
            </Card>
            <Card className="p-5">
                Usuários
                <SeeUsers />
            </Card>
        </div>
    );
}

export default Users;