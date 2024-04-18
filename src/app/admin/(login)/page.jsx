import React from "react";
import LoginForm from "@/components/client/login/LoginForm";
import { RedirectLayer } from "@/helpers/redirectLayer";

export default function Login() {

  return (
      <main className="h-screen w-screen flex justify-center items-center ">
        <LoginForm />
      </main>
  );
}
