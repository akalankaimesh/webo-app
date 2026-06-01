"use client";

import { FormEvent, useMemo, useState } from "react";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

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

type ServicesResponse = {
  service?: AdminService;
  error?: string;
  message?: string;
};

export default function ServicesManager({
  initialCategories,
  initialServices,
}: {
  initialCategories: AdminCategory[];
  initialServices: AdminService[];
}) {
  const [services, setServices] = useState<AdminService[]>(initialServices);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [priceFrom, setPriceFrom] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategories[0]?._id || "");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const selectedCategory = useMemo(
    () => initialCategories.find((category) => category._id === categoryId) || null,
    [initialCategories, categoryId]
  );

  const availableSubcategories = selectedCategory?.subcategories || [];

  async function handleCreateService(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Service name is required.");
      return;
    }

    if (!categoryId || !subcategoryId) {
      setError("Please select category and subcategory.");
      return;
    }

    if (!imageFile && !imageUrl.trim()) {
      setError("Please upload an image or provide an image URL.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const payload = new FormData();
      payload.set("name", name);
      payload.set("description", description);
      payload.set("priceFrom", priceFrom);
      payload.set("durationMinutes", durationMinutes);
      payload.set("categoryId", categoryId);
      payload.set("subcategoryId", subcategoryId);

      if (imageFile) {
        payload.set("imageFile", imageFile);
      }

      if (imageUrl.trim()) {
        payload.set("imageUrl", imageUrl.trim());
      }

      const res = await fetch(`${backendBaseUrl}/api/admin/services`, {
        method: "POST",
        body: payload,
      });

      const data = (await res.json()) as ServicesResponse;
      if (!res.ok || !data.service) {
        setError(data.error || "Failed to create service.");
        return;
      }

      setServices((prev) => [data.service as AdminService, ...prev]);
      setName("");
      setDescription("");
      setImageUrl("");
      setImageFile(null);
      setPriceFrom("");
      setDurationMinutes("");
      setSubcategoryId("");
      setStatus(data.message || "Service created.");
    } catch {
      setError("Failed to create service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest/10 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-on-surface">Services Management</h3>
        <p className="mt-1 text-sm text-on-surface-variant">Create services under categories and subcategories.</p>
      </div>

      <form onSubmit={handleCreateService} className="grid grid-cols-1 gap-4 rounded border border-outline-variant/30 bg-surface-container-low/40 p-4 xl:grid-cols-2">
        <input
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          placeholder="Price from (e.g. 45)"
          type="number"
          min="0"
          step="0.01"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
          required
        />

        <input
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          placeholder="Image URL (optional if file uploaded)"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-on-primary hover:file:bg-primary/90"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
          }}
        />

        <input
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          placeholder="Duration minutes (e.g. 60)"
          type="number"
          min="1"
          step="1"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          required
        />

        <select
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryId("");
          }}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {initialCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          required
          disabled={!availableSubcategories.length}
        >
          <option value="" disabled>
            {availableSubcategories.length ? "Select subcategory" : "No subcategories available"}
          </option>
          {availableSubcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <textarea
          className="h-24 w-full resize-none rounded border border-outline-variant/40 bg-surface-container-low/70 px-3 py-2 text-sm text-on-surface outline-none focus:border-primary xl:col-span-2"
          placeholder="Service description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-70 xl:col-span-2"
        >
          {saving ? "Creating..." : "Create Service"}
        </button>
      </form>

      {status ? <p className="mt-4 text-sm text-primary">{status}</p> : null}
      {error ? <p className="mt-2 text-sm text-error">{error}</p> : null}

      <div className="mt-6 rounded border border-outline-variant/30 bg-surface-container-low/30 p-4">
        <h4 className="font-display text-lg font-semibold text-on-surface">Existing Services</h4>
        {services.length === 0 ? (
          <p className="mt-3 text-sm text-on-surface-variant">No services created yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {services.map((service) => (
              <div key={service._id} className="rounded border border-outline-variant/20 bg-surface-container-high/20 p-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-16 w-24 rounded border border-outline-variant/20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <p className="font-semibold text-on-surface">{service.name}</p>
                      <p className="font-mono text-xs text-on-surface-variant">
                        ${service.priceFrom} • {service.durationMinutes} min
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {service.categoryName} / {service.subcategoryName}
                    </p>
                    {service.description ? <p className="mt-2 text-sm text-on-surface-variant">{service.description}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
