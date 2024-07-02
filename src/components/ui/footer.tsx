import { Card } from "./card"
import Link from "next/link";

const Footer = () => {
    return (
        <Card className="mt-5">
            <div className="max-w-screen-xl m-auto p-5">
                <h1>Copyright (C) 2024 <Link href={"https://github.com/Fernand0cruz"} className="font-bold">Fernand0W</Link></h1>
            </div>
        </Card>
    );
}

export default Footer;