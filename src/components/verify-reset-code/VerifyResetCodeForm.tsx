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

type VerifyResetCodeForm = {
  resetCode: string;
};

export default function VerifyResetCodeForm() {
  const router = useRouter();
  const form = useForm<VerifyResetCodeForm>({
    defaultValues: {
      resetCode: ""
    }
  });

  async function handleVerifyCode(values: VerifyResetCodeForm) {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      { resetCode: values.resetCode }
    );

    toast.success(res.data.message || "Code verified successfully", {
      position: "top-center",
      duration: 2000
    });

    setTimeout(() => router.push("/reset-password"), 2000);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      toast.error(
        err.response?.data?.message || "حدث خطأ أثناء التحقق من الكود",
        { position: "top-center", duration: 2000 }
      );
    } else {
      toast.error("حدث خطأ غير متوقع", { position: "top-center", duration: 2000 });
    }
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6 text-emerald-600">
          Verify Reset Code
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-4">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter code you received"
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
              Verify Code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
