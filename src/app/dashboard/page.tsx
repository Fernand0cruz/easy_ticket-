import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import LogoutBtn from "@/components/ui/logoutBtn";

const PageDashboard = async () => {
    const session = await getServerSession(authOptions)
    return ( 
        <div>
            page dashboard
            <h1>Hello: {session?.user.name}</h1>
            <h1>Email: {session?.user.email}</h1>
            <h1>Company: {session?.user.company}</h1>
            <h1>Role: {session?.user.role}</h1>
            <LogoutBtn/>
        </div>
    );
}
 
export default PageDashboard;