import { useState } from "react";
import {api} from '../../../lib/api';
import { CldUploadWidget } from "next-cloudinary";
import { ToastContainer, toast } from 'react-toastify';

export default function AddProjectModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    shortDiscription: "",
    longDiscription: "",
    tags: [],
    githubUrl: "",
    experienceUrl: "",
    projectType: [],
    photos: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;
    if (multiple) {
      const values = Array.from(selectedOptions, (opt) => opt.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    const clean = tagInput.trim();
    if (clean && !form.tags.includes(clean)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, clean] }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const removePhoto = (url) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((u) => u !== url),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.shortDiscription || !form.longDiscription) {
      toast.error("الرجاء تعبئة جميع الحقول المطلوبة");

      return;
    }

    setLoading(true);
    try {

      const payload = { ...form };
      const res = await  api("https://novatech66.pythonanywhere.com/projects/newpro/", {
        method: "POST",
        headers: { "Content-Type": "application/json",
     

         },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

          toast.success("تم ارسال الطلب بنجاح");

      setForm({
        name: "",
        shortDiscription: "",
        longDiscription: "",
        tags: [],
        githubUrl: "",
        experienceUrl: "",
        projectType: [],
        photos: [],
      });
      setTagInput("");
      onClose(); // إغلاق النافذة بعد الحفظ
    } catch (err) {
      console.error(err);
      toast.error("حصل خطأ أثناء ارسال الطلب، الرجاء المحاولة لاحقاً");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">إضافة مشروع جديد</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="اسم المشروع"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="shortDiscription"
                  className="form-control"
                  placeholder="وصف قصير"
                  value={form.shortDiscription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="longDiscription"
                  className="form-control"
                  placeholder="الوصف الكامل"
                  rows={4}
                  value={form.longDiscription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

<div className="mb-3">
  <label className="form-label d-block mb-2">نوع المشروع:</label>
  <div className="d-flex flex-wrap gap-2">
    {[
      { value: "application", label: "Application" },
      { value: "website", label: "Website" },
      { value: "telegrambot", label: "Telegram Bot" },
      { value: "aimodel", label: "AI Model" },
    ].map((type) => (
      <button
        key={type.value}
        type="button"
        className={`btn ${
          form.projectType.includes(type.value)
            ? "btn-primary"
            : "btn-outline-primary"
        }`}
        onClick={() => {
          setForm((prev) => {
            const selected = prev.projectType.includes(type.value)
              ? prev.projectType.filter((t) => t !== type.value)
              : [...prev.projectType, type.value];
            return { ...prev, projectType: selected };
          });
        }}
      >
        {type.label}
      </button>
    ))}
  </div>
</div>


              <div className="mb-3">
                <input
                  type="text"
                  name="githubUrl"
                  className="form-control"
                  placeholder="رابط GitHub"
                  value={form.githubUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="experienceUrl"
                  className="form-control"
                  placeholder="رابط تجربة المشروع"
                  value={form.experienceUrl}
                  onChange={handleChange}
                />
              </div>

              {/* tags */}
              <div className="mb-3">
                <label className="form-label">الكلمات المفتاحية:</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="form-control"
                    placeholder="أضف tag"
                  />
                  <button type="button" className="btn btn-success" onClick={addTag}>
                    +
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {form.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary">
                      {tag}{" "}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="btn btn-sm btn-light ms-1 p-0 px-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* photos */}
              <div className="mb-3">
                <label className="form-label">صور المشروع:</label>
                <CldUploadWidget
                  uploadPreset="unsigned_preset"
                  options={{ multiple: true, maxFiles: 10 }}
                  onSuccess={(results) => {
                    if (results.info?.files) {
                      const urls = results.info.files.map(
                        (f) => f.uploadInfo.secure_url
                      );
                      setForm((prev) => ({
                        ...prev,
                        photos: [...prev.photos, ...urls],
                      }));
                    } else if (results.info?.secure_url) {
                      setForm((prev) => ({
                        ...prev,
                        photos: [...prev.photos, results.info.secure_url],
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="btn btn-primary"
                    >
                      رفع صور  
                    </button>
                  )}
                </CldUploadWidget>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {form.photos.map((url, i) => (
                    <div key={i} className="position-relative">
                      <img
                        src={url}
                        alt={`صورة ${i + 1}`}
                        className="rounded border"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(url)}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success w-100"
                >
                  {loading ? "جاري الإرسال..." : "حفظ المشروع"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

