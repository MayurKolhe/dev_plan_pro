"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res:any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        if (!email) {
          setError("Invalid Email");
        } else if (!password) {
          setError("Password is Missing");
        } else {
          setError("Invalid Credentials");
        }
        return;
      }
      
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen">
      <div className=" register shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 border-black"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don`t have an account? <span className="underline">Register</span>
          </Link>
        </form>

      </div>
      <Image src="/sign-up-left.svg" className="bottom-left-image" alt="Image 1"           width={500}
          height={500}/>
  <Image src="/sign-up-right.svg" className="bottom-right-image" alt="Image 2"          width={500}
          height={500}/>
    </div>
  );
}
