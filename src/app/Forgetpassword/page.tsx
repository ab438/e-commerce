"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: ""
    }
  });

  async function handleForgotPassword(values: ForgotPasswordForm) {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      { email: values.email }
    );

    toast.success(res.data.message || "تم إرسال كود التحقق إلى بريدك", {
      position: "top-center",
      duration: 2000
    });

    setTimeout(() => router.push("/verify"), 2000);
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message || "حدث خطأ أثناء إرسال الكود", {
        position: "top-center",
        duration: 2000
      });
    } else {
      toast.error("حدث خطأ غير معروف", { position: "top-center", duration: 2000 });
    }
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6 text-emerald-600">Forget Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                      className="border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
            >
              Send Reset Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
