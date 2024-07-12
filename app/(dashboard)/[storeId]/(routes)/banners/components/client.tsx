"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { BannerColumn, columns } from "./columns";
import ApiList from "@/components/ApiList";

interface BannerClientProps {
  data: BannerColumn[];
}

export default function BannerClient({ data }: BannerClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Banner (${data.length})`}
          description="Atur banner untuk toko"
        />
        <Button onClick={() => router.push(`/${params.storeId}/banners/new}`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
      <Heading 
        title="API"
        description="API untuk Banners"
      />
      <Separator />
      <ApiList 
        idIndikator="bannerId"
        namaIndikator="banners"
      />
    </>
  );
}
