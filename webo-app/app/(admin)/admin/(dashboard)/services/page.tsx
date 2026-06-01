import ServicesManager from "../services-manager";

type AdminSubcategory = {
  _id: string;
  name: string;
};

type AdminCategory = {
  _id: string;
  name: string;
  subcategories: AdminSubcategory[];
};

type AdminService = {
  _id: string;
  name: string;
  description?: string;
  image: string;
  priceFrom: number;
  durationMinutes: number;
  categoryName: string;
  subcategoryName: string;
  status: string;
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

async function getInitialServices(): Promise<AdminService[]> {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  try {
    const res = await fetch(`${backendBaseUrl}/api/admin/services`, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as { services?: AdminService[] };
    return data.services || [];
  } catch {
    return [];
  }
}

export default async function AdminServicesPage() {
  const [initialCategories, initialServices] = await Promise.all([getInitialCategories(), getInitialServices()]);

  return <ServicesManager initialCategories={initialCategories} initialServices={initialServices} />;
}
