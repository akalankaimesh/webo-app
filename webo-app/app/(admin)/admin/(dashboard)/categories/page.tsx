import CategoriesManager from "../categories-manager";

type AdminSubcategory = {
  _id: string;
  name: string;
  description?: string;
};

type AdminCategory = {
  _id: string;
  name: string;
  description?: string;
  subcategories: AdminSubcategory[];
};

async function getInitialCategories(): Promise<AdminCategory[]> {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  try {
    const res = await fetch(`${backendBaseUrl}/api/admin/categories`, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as { categories?: AdminCategory[] };
    return data.categories || [];
  } catch {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const initialCategories = await getInitialCategories();

  return <CategoriesManager initialCategories={initialCategories} />;
}
