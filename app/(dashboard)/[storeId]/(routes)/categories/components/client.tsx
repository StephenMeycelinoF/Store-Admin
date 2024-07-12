"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { CategoryColumn, columns } from "./columns";
import ApiList from "@/components/ApiList";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data.length})`}
          description="Atur kategori untuk toko"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new}`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API untuk Categories" />
      <Separator />
      <ApiList idIndikator="categoryId" namaIndikator="categories" />
    </>
  );
}
