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
import { registerschema, registerschemaType } from '@/schema/register.schema';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Register() {
  const navi = useRouter();

  const form = useForm<registerschemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    resolver: zodResolver(registerschema)
  });

  async function handleregister(values: registerschemaType) {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
    if (res.data.message === "success") {
      toast.success("You Registered Successfully", {
        position: "top-center",
        duration: 3000,
      });
      navi.push("/login");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message || "Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
    } else {
      toast.error("حدث خطأ غير معروف", {
        position: "top-center",
        duration: 3000,
      });
    }
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-lg animate-fadeIn">
        <h1 className='text-3xl font-bold text-center text-emerald-700 mb-6'>Create Your Account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleregister)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input 
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
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
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
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
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
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
              Register Now
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
