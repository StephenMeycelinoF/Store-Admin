"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Minimal 3 karakter"),
});

export default function StoreModal() {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();

  // Add Validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Function Submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Toko berhasil dibuat");
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Gagal membuat toko");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Toko"
      description="Tambahkan Toko terlebih dahulu untuk membuat produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={() => storeModal.onClose()}
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Toko Kamu Apa?"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => storeModal.onClose()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
