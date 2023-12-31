"use client";

import React from "react";

import {
  Input,
  
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import Link from "next/link"


export default function Logincard() {
  const router = useRouter();
  const [code, action] = useFormState(authenticate, undefined);
  
  

  return (
  
      <div
        className="flex flex-row w-full items-center justify-center"
        style={{ height: "calc(100vh - 65px)" }}
      >
        {/* <div style={{ height: "200px" }}></div> Fix magasság */}
        <Card className="max-w-full w-[340px]">
          <CardBody className="overflow-hidden">
            <h1 className="text-center mx-auto text-2xl">Login</h1>
            <form action={action} className="flex flex-col gap-4 mt-5">
          
              <Input
                id="email"
                name="email"
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                isRequired
                name="password"
                id="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="flex items-end space-x-1">
                {code === "CredentialSignin" && (
                  <>
                    <p aria-live="polite" className="text-sm text-red-500 pl-1">
                      Hibás felhasználónév vagy jelszó
                    </p>
                  </>
                )}
              </div>
              <p className="text-center text-small">
                Need to create an account?{" "}
                <Link  href="/signup" className="text-blue-500 font-bold">
                  Sign up
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button color="default" fullWidth onClick={() => router.back()}>
                  Cancel
                </Button>
                <LoginButton />
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" fullWidth aria-disabled={pending}>
      Log in
    </Button>
  );
}
