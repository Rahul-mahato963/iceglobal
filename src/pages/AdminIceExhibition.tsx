import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";

import AdminLayout from "@/components/admin/AdminLayout";
import IceExhibitionEditor from "@/components/admin/sections/IceExhibitionEditor";
import { adminNavLinks } from "@/data/admin";
import {
  type IceExhibitionContent,
  defaultIceExhibitionContent,
  mergeIceExhibitionContent,
} from "@/data/ice-exhibition";

const AdminIceExhibition = () => {
  const base = import.meta.env.VITE_API_BASE_URL || "";
  const [data, setData] = useState<IceExhibitionContent>(defaultIceExhibitionContent);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("admin_refresh_token");
    if (!refreshToken) return null;
    const res = await fetch(`${base}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      return null;
    }
    const tokenData = await res.json();
    if (tokenData.accessToken) {
      localStorage.setItem("admin_access_token", tokenData.accessToken);
      return tokenData.accessToken as string;
    }
    return null;
  };

  const getAccessToken = async () => {
    const token = localStorage.getItem("admin_access_token");
    if (token) return token;
    return refreshAccessToken();
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${base}/ice-exhibition-content`);
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.includes("application/json")) throw new Error("Failed to load ICE Exhibition content");
      const payload = await res.json();
      setData(mergeIceExhibitionContent(payload));
    } catch (err) {
      console.error(err);
      setData(defaultIceExhibitionContent);
      toast.error("Could not load ICE Exhibition content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const attempt = async (authToken: string | null) =>
        fetch(`${base}/ice-exhibition-content`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          body: JSON.stringify(data),
        });
      let res = await attempt(token);
      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        res = await attempt(refreshed);
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Save failed");
      }
      toast.success("ICE Exhibition page saved");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Could not save ICE Exhibition page");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setSaving(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const attempt = async (authToken: string | null) =>
        fetch(`${base}/ice-exhibition-content/restore`, {
          method: "POST",
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });
      let res = await attempt(token);
      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        res = await attempt(refreshed);
      }
      if (!res.ok) throw new Error("Restore failed");
      const payload = await res.json();
      setData(mergeIceExhibitionContent(payload));
      toast.success("ICE Exhibition defaults restored");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Could not restore ICE Exhibition page");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="ICE Exhibition Page"
      description="Manage real images and content for the public ICE Exhibition page."
      navItems={adminNavLinks}
      sections={[{ id: "ice-exhibition", label: "ICE Exhibition" }]}
    >
      <IceExhibitionEditor
        data={data}
        onChange={setData}
        onSave={save}
        onRestore={restore}
        saving={saving}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default AdminIceExhibition;
