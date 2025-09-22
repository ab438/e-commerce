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

type ResetPasswordFormValues = {
  email: string;
  newPassword: string;
  resetCode: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      email: "",
      newPassword: "",
      resetCode: ""
    }
  });

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          resetCode: values.resetCode,
          newPassword: values.newPassword
        }
      );

      toast.success(res.data.message || "Password reset successfully", {
        position: "top-center",
        duration: 2000
      });

      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      let message = "حدث خطأ أثناء إعادة تعيين كلمة المرور";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error(message, { position: "top-center", duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6 text-emerald-600">
          Reset Password
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
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

            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter the code you received"
                      className="border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter new password"
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
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
