"use client";

import { FormEvent, useMemo, useState } from "react";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

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

type CategoriesResponse = {
  categories?: AdminCategory[];
  category?: AdminCategory;
  error?: string;
  message?: string;
};

export default function CategoriesManager({ initialCategories }: { initialCategories: AdminCategory[] }) {
  const [categories, setCategories] = useState<AdminCategory[]>(initialCategories);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categorySaving, setCategorySaving] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryDescription, setSubcategoryDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategories[0]?._id || "");
  const [subcategorySaving, setSubcategorySaving] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");

  const selectedCategory = useMemo(
    () => categories.find((category) => category._id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  async function handleCreateCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!categoryName.trim()) {
      setCategoryError("Category name is required.");
      return;
    }

    setCategoryError("");
    setCategorySaving(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryName,
          description: categoryDescription,
        }),
      });
      const data = (await res.json()) as CategoriesResponse;

      if (!res.ok || !data.category) {
        setCategoryError(data.error || "Failed to create category.");
        return;
      }

      setCategories((prev) => [data.category as AdminCategory, ...prev]);
      setSelectedCategoryId(data.category._id);
      setCategoryName("");
      setCategoryDescription("");
      setCategoryStatus(data.message || "Category created.");
    } catch {
      setCategoryError("Failed to create category.");
    } finally {
      setCategorySaving(false);
    }
  }

  async function handleCreateSubcategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedCategoryId) {
      setCategoryError("Select a category first.");
      return;
    }

    if (!subcategoryName.trim()) {
      setCategoryError("Subcategory name is required.");
      return;
    }

    setCategoryError("");
    setSubcategorySaving(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/admin/categories/${selectedCategoryId}/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subcategoryName,
          description: subcategoryDescription,
        }),
      });

      const data = (await res.json()) as CategoriesResponse;
      if (!res.ok || !data.category) {
        setCategoryError(data.error || "Failed to create subcategory.");
        return;
      }

      const updatedCategory = data.category as AdminCategory;
      setCategories((prev) =>
        prev.map((category) => {
          if (category._id !== updatedCategory._id) {
            return category;
          }
          return updatedCategory;
        })
      );

      setSubcategoryName("");
      setSubcategoryDescription("");
      setCategoryStatus(data.message || "Subcategory created.");
    } catch {
      setCategoryError("Failed to create subcategory.");
    } finally {
      setSubcategorySaving(false);
    }
  }

  return (
    <section className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest/10 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-on-surface">Categories Management</h3>
        <p className="mt-1 text-sm text-on-surface-variant">Create categories and subcategories for your services catalog.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <form onSubmit={handleCreateCategory} className="space-y-3 rounded border border-outline-variant/30 bg-surface-container-low/40 p-4">
          <h4 className="font-display text-lg font-semibold text-on-surface">Create Category</h4>
          <input
            className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <textarea
            className="h-24 w-full resize-none rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
            placeholder="Category description (optional)"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          <button
            type="submit"
            disabled={categorySaving}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {categorySaving ? "Creating..." : "Create Category"}
          </button>
        </form>

        <form onSubmit={handleCreateSubcategory} className="space-y-3 rounded border border-outline-variant/30 bg-surface-container-low/40 p-4">
          <h4 className="font-display text-lg font-semibold text-on-surface">Create Subcategory</h4>
          <select
            className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
            placeholder="Subcategory name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
          <textarea
            className="h-24 w-full resize-none rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
            placeholder="Subcategory description (optional)"
            value={subcategoryDescription}
            onChange={(e) => setSubcategoryDescription(e.target.value)}
          />
          <button
            type="submit"
            disabled={subcategorySaving || !selectedCategory}
            className="rounded bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary/90 disabled:opacity-70"
          >
            {subcategorySaving ? "Creating..." : "Create Subcategory"}
          </button>
        </form>
      </div>

      {categoryStatus ? <p className="mt-4 text-sm text-primary">{categoryStatus}</p> : null}
      {categoryError ? <p className="mt-2 text-sm text-error">{categoryError}</p> : null}

      <div className="mt-6 rounded border border-outline-variant/30 bg-surface-container-low/30 p-4">
        <h4 className="font-display text-lg font-semibold text-on-surface">Existing Categories</h4>
        {categories.length === 0 ? (
          <p className="mt-3 text-sm text-on-surface-variant">No categories created yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {categories.map((category) => (
              <div key={category._id} className="rounded border border-outline-variant/20 bg-surface-container-high/20 p-3">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <p className="font-semibold text-on-surface">{category.name}</p>
                  <p className="text-xs text-on-surface-variant">{category.subcategories?.length || 0} subcategories</p>
                </div>
                {category.description ? <p className="mt-1 text-sm text-on-surface-variant">{category.description}</p> : null}

                {category.subcategories?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <span
                        key={subcategory._id}
                        className="rounded-full border border-outline-variant/30 bg-surface-container-lowest/40 px-3 py-1 text-xs text-on-surface-variant"
                      >
                        {subcategory.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
