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
import { useParams } from 'next/navigation';
import {checkoutSchema, checkoutSchemaType} from "@/schema/checkout.schema"
import onlinePayment from '@/checkoutActions/OnlineCheckout.action';
import CashCheckout from '@/checkoutActions/cash.action';

export default function Checkout() {
  const {id}: {id: string} = useParams();
  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handlecheckout(values: checkoutSchemaType){
    const res = await onlinePayment(id , "" , values);
    if(res.status === "success"){
      window.location.href = res.session.url
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className='text-3xl font-bold text-center text-emerald-600 mb-6'>Checkout Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlecheckout)} className="space-y-6">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Details</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder="Street, Apartment, etc." className="border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-3"/>
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
                    <Input {...field} type='tel' placeholder="+20 1XXXXXXXXX" className="border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-3"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder="Your city" className="border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-3"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
                type="submit" 
                className='flex-1 w-[100%] bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold'
              >
                Pay Online
              </Button>
            {/* خليت الزرين جنب بعض */}
            <div className="">
                <CashCheckout/>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
