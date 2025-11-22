"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar_Admin from "../../Components/Navbar_Admin";
import "../admin.css";
import "../../portfolio/[type]/Port.css";
import { api } from "@/lib/api";
import SearchBox from "../components/SearchBox";
import ProjectsList from "../components/ProjectsList";
import EditProjectModal from "../components/EditProjectModal";
import { getApiType } from "../components/utils";
import { toast } from "react-toastify";

// تعريف واجهة المشروع لتجنب any
interface Project {
  id: number;
  name: string;
  shortDiscription: string;
  longDiscription: string;
  tags: string[];
  githubUrl?: string;
  experienceUrl?: string;
  projectType?: string[];
  photosUrls?: string[];
}

export default function AdminProjectsPage() {
  const { type } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  const apiType = getApiType(type as string);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://novatech66.pythonanywhere.com/projects/projects/${apiType}/`
        );
        if (!res.ok) throw new Error("فشل جلب المشاريع");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("❌ خطأ أثناء جلب المشاريع:", err);
        toast.error("حدث خطأ أثناء جلب المشاريع");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiType]);

  // حذف مشروع
const handleDelete = (id: number) => {
  const confirmDelete = (
    <div className="text-center">
      <p>هل أنت متأكد من حذف المشروع؟</p>
      <div className="d-flex justify-content-center gap-2 mt-2">
        
        <button
          className="btn btn-danger btn-sm"
          onClick={async () => {
            try {
              const res = await api(
                `https://novatech66.pythonanywhere.com/projects/project/${id}/`,
                { method: "DELETE" }
              );

              if (!res) throw new Error("لا يوجد استجابة من السيرفر");
              if (!res.ok) throw new Error("فشل حذف المشروع");

              setProjects((prev) => prev.filter((p) => p.id !== id));
              toast.success("تم حذف المشروع بنجاح");
            } catch (err) {
              console.error(err);
              toast.error("حدث خطأ أثناء حذف المشروع");
            } finally {
              toast.dismiss();
            }
          }}
        >
          حذف
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => toast.dismiss()}
        >
          إلغاء
        </button>
      </div>
    </div>
  );

  toast.info(confirmDelete, { autoClose: false });
};


  // تعديل مشروع
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSave = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setShowModal(false);
  };

  // تصفية المشاريع بحسب البحث
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar_Admin />
      <div className="container Port_Body">
        <h3 className="text-white mt-4">إدارة مشاريع {apiType}</h3>

        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading ? (
          <p>⏳ جاري تحميل المشاريع...</p>
        ) : (
          <ProjectsList
            projects={filteredProjects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {showModal && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
