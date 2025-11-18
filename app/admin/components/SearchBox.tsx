
export default function SearchBox({ searchTerm, setSearchTerm }: any) {
  return (
    <div className="Search_Box">
      <img src="/search.avif" alt="search icon"  />
      <input
        placeholder="ابحث عن مشروع"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
