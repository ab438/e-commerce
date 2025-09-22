"use client";
import React, { useEffect } from "react";
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
import { useSession } from "next-auth/react";

type UpdateMeFormValues = {
  name?: string;
  email?: string;
  phone?: string;
};

// type for session user
interface SessionUser {
  name?: string;
  email?: string;
  phone?: string;
  token?: string;
}

export default function UpdateMeForm() {
  const { data: session } = useSession();

  const user = session?.user as SessionUser | undefined;

  const form = useForm<UpdateMeFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || ""
    }
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user, form]);

  async function handleUpdate(values: UpdateMeFormValues) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to update your profile");
        return;
      }

      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data?.message || "Profile updated successfully", {
        position: "top-center",
        duration: 2000
      });
    } catch (err) {
      // use AxiosError type instead of any
      const axiosError = err as AxiosError<{ message?: string }>;
      const msg = axiosError.response?.data?.message || "Error updating profile";
      toast.error(msg, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
          Update Profile
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg"
                      placeholder="Enter your name"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg"
                      placeholder="Enter your email"
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg"
                      placeholder="Enter your phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold">
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
