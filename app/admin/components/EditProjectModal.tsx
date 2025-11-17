"use client";
import { useState, useEffect } from "react";
import {api} from '../../../lib/api';
import { CldUploadWidget } from "next-cloudinary";
import { ToastContainer, toast } from 'react-toastify';

interface EditProjectModalProps {
  project: any;
  onClose: () => void;
  onSave: (updatedProject: any) => void;
}

export default function EditProjectModal({ project, onClose, onSave }: EditProjectModalProps) {
  const [selectedProject, setSelectedProject] = useState<any>(project);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("modal-open");
      return () => document.body.classList.remove("modal-open");
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedProject((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {

      const res = await api(
        `https://novatech66.pythonanywhere.com/projects/project/${selectedProject.id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" ,
          },
          body: JSON.stringify(selectedProject),
        }
      );

      if (!res.ok) throw new Error("فشل التحديث");
               toast.success("تم ارسال الطلب بنجاح");
      onSave(selectedProject);
    } catch (err) {
      console.error("❌ خطأ أثناء الحفظ:", err);
            toast.error("حصل خطأ أثناء ارسال الطلب، الرجاء المحاولة لاحقاً");
    } finally {
      setSaving(false);
    }
  };

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !selectedProject.tags.includes(clean)) {
      setSelectedProject((prev: any) => ({
        ...prev,
        tags: [...prev.tags, clean],
      }));
    }
  };

  const removeTag = (tag: string) => {
    setSelectedProject((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((t: string) => t !== tag),
    }));
  };

  const removePhoto = (url: string) => {
    setSelectedProject((prev: any) => ({
      ...prev,
      photosUrls: prev.photosUrls.filter((u: string) => u !== url),
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">

      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close" aria-label="إغلاق" type="button">
          ×
        </button>

        <h3 style={{ textAlign: "center", marginTop: 4, marginBottom: 10 }}>
          تعديل المشروع
        </h3>

        <form onSubmit={handleSave}>
          {/* 🧾 البيانات الأساسية */}
          <input
            name="name"
            value={selectedProject.name}
            onChange={handleChange}
            className="form-control"
            placeholder="اسم المشروع"
            required
          />
          <input
            name="shortDiscription"
            value={selectedProject.shortDiscription}
            onChange={handleChange}
            className="form-control"
            placeholder="وصف قصير"
          />
          <textarea
            name="longDiscription"
            value={selectedProject.longDiscription}
            onChange={handleChange}
            className="form-control"
            rows={3}
            placeholder="الوصف الكامل"
          />
          <input
            name="githubUrl"
            value={selectedProject.githubUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="رابط GitHub"
          />
          <input
            name="experienceUrl"
            value={selectedProject.experienceUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="رابط التجربة"
          />

          {/* 🏷️ الكلمات المفتاحية */}
          <div style={{ marginTop: 10 }}>
            <label>الكلمات المفتاحية:</label>

            <div className="d-flex align-items-center gap-2 mt-2 mb-2">
              <input
                id="newTagInput"
                type="text"
                className="form-control"
                placeholder="أدخل كلمة مفتاحية جديدة"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const input = document.getElementById("newTagInput") as HTMLInputElement;
                  if (input?.value.trim()) {
                    addTag(input.value);
                    input.value = "";
                  }
                }}
              >
                إضافة
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedProject.tags?.map((tag: string, i: number) => (
                <span key={i} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 🖼️ الصور */}
          <div style={{ marginTop: 10 }}>
            <label>صور المشروع:</label>

            <CldUploadWidget
              uploadPreset="unsigned_preset"
              options={{ multiple: true, maxFiles: 10 }}
              onSuccess={(results: any) => {
                if (results.info?.files) {
                  const urls = results.info.files.map(
                    (f: any) => f.uploadInfo.secure_url
                  );
                  setSelectedProject((prev: any) => ({
                    ...prev,
                    photosUrls: [...prev.photosUrls, ...urls],
                  }));
                } else if (results.info?.secure_url) {
                  setSelectedProject((prev: any) => ({
                    ...prev,
                    photosUrls: [...prev.photosUrls, results.info.secure_url],
                  }));
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="btn btn-info mt-2"
                >
                  رفع صور جديدة
                </button>
              )}
            </CldUploadWidget>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {selectedProject.photosUrls?.map((url: string, i: number) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={url} className="modal-thumb" alt={`photo-${i}`} />
                  <button
                    type="button"
                    onClick={() => removePhoto(url)}
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      border: "none",
                      background: "#c0392b",
                      color: "#fff",
                      borderRadius: 8,
                      width: 22,
                      height: 22,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* الأزرار */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              إلغاء
            </button>
            <button type="submit" disabled={saving} className="btn btn-success">
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

