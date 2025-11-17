"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar_Admin from "../../Components/Navbar_Admin";
import "../admin.css";
import "../../portfolio/[type]/Port.css";
import { api } from "@/lib/api";
import SearchBox from '../components/SearchBox'
import ProjectsList from "../components/ProjectsList";
import EditProjectModal from "../components/EditProjectModal";
import { getApiType } from "../components/utils";
import { toast } from "react-toastify";

export default function AdminProjectsPage() {
  const { type } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const apiType = getApiType(type as string);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://novatech66.pythonanywhere.com/projects/projects/${apiType}/`
        );
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("❌ خطأ أثناء جلب المشاريع:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiType]);

const handleDelete = (id: number) => {
  toast.info(
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

              if (!res.ok) throw new Error();

              setProjects((prev) => prev.filter((p) => p.id !== id));
              toast.success("تم حذف المشروع بنجاح");
            } catch (err) {
              toast.error("حدث خطأ أثناء حذف المشروع");
            }
            toast.dismiss(); // إغلاق Toast التأكيد
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
    </div>,
    { autoClose: false }
  );
};


  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSave = (updated: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setShowModal(false);
  };

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
