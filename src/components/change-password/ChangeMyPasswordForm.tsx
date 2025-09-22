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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChangeMyPasswordFormValues = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export default function ChangeMyPasswordForm() {
  const router = useRouter();
  const form = useForm<ChangeMyPasswordFormValues>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" }
  });

  const handleChangePassword = async (values: ChangeMyPasswordFormValues) => {
    if (values.password !== values.rePassword) {
      toast.error("New password and confirm password do not match", { position: "top-center" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not logged in", { position: "top-center" });
        return;
      }

      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          currentPassword: values.currentPassword,
          password: values.password,
          rePassword: values.rePassword
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      toast.success(res.data?.message || "Password changed successfully", { position: "top-center", duration: 2000 });
      setTimeout(() => router.push("/login"), 1500);

    } catch (err) {
      // نحدد النوع كـ AxiosError بدل any
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Failed to change password", { position: "top-center", duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-emerald-600 text-center mb-8">
          Change Password
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChangePassword)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••" className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-lg"/>
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
                  <FormLabel className="font-semibold text-gray-700">New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••" className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-lg"/>
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
                  <FormLabel className="font-semibold text-gray-700">Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••" className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 border-gray-300 rounded-lg"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-md">
              Change Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
