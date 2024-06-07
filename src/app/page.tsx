import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      home
      <Link href={`auth/signin`}>Logar</Link>
    </div>
  );
}
