"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./ApiAlert";

interface ApiListProps {
  namaIndikator: string;
  idIndikator: string;
}

export default function ApiList({ namaIndikator, idIndikator }: ApiListProps) {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <div>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${idIndikator}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${idIndikator}/{${idIndikator}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${idIndikator}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${idIndikator}/{${idIndikator}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${idIndikator}/{${idIndikator}}`}
        variant="admin"
      />
    </div>
  );
}
