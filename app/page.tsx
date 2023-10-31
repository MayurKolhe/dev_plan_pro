import Login from '@/components/login/LoginPage'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import NavBar from '@/components/navbar/NavBar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main>
      <Login />
    </main>
  );
}
