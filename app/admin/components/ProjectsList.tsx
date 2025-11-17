export default function ProjectsList({ projects, onEdit, onDelete }: any) {
  return (
    <div className="Portfolio_Items container">
      {projects.map((proj: any) => (
        <div
          key={proj.id}
          className="relative bg-white/10 p-3 rounded-lg mb-4"
          style={{ position: "relative" }}
        >
          <img
            src={proj.photosUrls[0] || "/Logo.png"}
            alt={proj.name}
            className="rounded w-100"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <h4 className="text-white mt-2">{proj.name}</h4>
          <p className="text-light small">{proj.shortDiscription}</p>

          <div
            className="overlay-buttons"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              borderRadius: "12px",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <button className="btn btn-warning" onClick={() => onEdit(proj)}>
              تعديل
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(proj.id)}>
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
