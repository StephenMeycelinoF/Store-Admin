import db from "@/lib/db";
import { format } from 'date-fns'
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/client";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      banner: true
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    bannerLabel: category.banner.label,
    createdAt: format(category.createdAt, "MMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
