"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginschema, loginschemaType } from '@/schema/login.schema';
import { signIn } from "next-auth/react";
import { toast } from 'sonner';
import Link from 'next/link';

export default function Login() {
  const form = useForm<loginschemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginschema)
  });

  async function handlelogin(values: loginschemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    });

    if(response?.ok){
      toast.success("You Logged in successfully", {position: "top-center", duration: 2000});
      window.location.href = "/";
    } else {
      toast.error(response?.error, {position: "top-center", duration: 2000});
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fadeIn">
        <h1 className='text-3xl font-bold text-center text-emerald-700 mb-6'>Welcome Back</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlelogin)} className="space-y-4">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-105">
                  <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      className="focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-105">
                  <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      className="focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              Login
            </Button>

            <div className="text-center mt-4">
              <Link href="/Forgetpassword" className="text-blue-600 hover:underline transition-colors duration-300">
                Forgot your password?
              </Link>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
