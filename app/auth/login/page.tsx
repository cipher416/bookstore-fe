"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type AuthDto = {
  email: string;
  password: string;
};

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: AuthDto) =>
      await AuthService.logIn(email, password),
    onSuccess: async (data, variables, context) => {
      console.log(data.data.access_token);
      localStorage.setItem("access_token", data.data.access_token);
      router.push("/");
    },
    onError: async (err) =>
      toast({
        title: "An error has occured.",
        description: err.message,
      }),
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: AuthDto) =>
      await AuthService.register(email, password),
    onSuccess: async (data, variables, context) => {
      toast({
        title: "Success!",
      });
    },
    onError: async (err) =>
      toast({
        title: "An error has occured.",
        description: err.message,
      }),
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your email and password to log in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={loginMutation.isPending}
          onClick={() => {
            loginMutation.mutate({ email: email, password: password });
          }}
        >
          Log In
        </Button>
      </CardFooter>
      <CardFooter>
        <Button className="w-full">Register</Button>
      </CardFooter>
    </Card>
  );
}
