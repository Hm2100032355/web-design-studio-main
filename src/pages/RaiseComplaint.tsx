import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Category = "Water" | "Electricity" | "Wi-Fi" | "Cleaning" | "Food";

const categories: Category[] = [
  "Water",
  "Electricity",
  "Wi-Fi",
  "Cleaning",
  "Food",
];

const subCategories: Record<Category, string[]> = {
  Water: ["No water", "Low pressure", "Leakage"],
  Electricity: ["Power cut", "Switch issue", "Fan not working"],
  "Wi-Fi": ["Slow internet", "No internet", "Router issue"],
  Cleaning: ["Room cleaning", "Washroom cleaning", "Garbage not cleared"],
  Food: ["Poor quality", "Late service", "Hygiene issue"],
};

export default function RaiseComplaint() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [pgName, setPgName] = useState("Sunrise PG");
  const [roomNumber, setRoomNumber] = useState("204");
  const [floor, setFloor] = useState("2");

  const [files, setFiles] = useState<File[]>([]);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setSubCategory(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setShowPopup(true);

    console.log({
      pgName,
      roomNumber,
      floor,
      category,
      subCategory,
      description,
      files,
    });
  };

  return (
    <div style={styles.page}>
      {/* BREADCRUMB */}
      <div style={styles.breadcrumb}>
        <span
          style={styles.link}
          onClick={() => navigate("/complaints")}
        >
          Complaints
        </span>
        <span style={styles.separator}>›</span>
        <span style={styles.current}>Raise New Complaint</span>
      </div>

      {/* PAGE TITLE */}
      <h2 style={styles.pageTitle}>Raise New Complaint</h2>

      {/* Location */}
      <section style={styles.card}>
        <h4 style={styles.sectionTitle}>Location / Room Details</h4>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>PG Name</label>
            <input value={pgName} onChange={(e) => setPgName(e.target.value)} />
          </div>
          <div>
            <label style={styles.label}>Room Number</label>
            <input
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div>
            <label style={styles.label}>Floor</label>
            <input value={floor} onChange={(e) => setFloor(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Category */}
      <section style={styles.card}>
        <h4 style={styles.sectionTitle}>Complaint Category</h4>
        <div style={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.btn,
                borderColor: category === cat ? "#6d4bd3" : "#ddd",
                background: category === cat ? "#f2edff" : "#fff",
              }}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {category && (
          <>
            <h5 style={styles.subTitle}>Sub-Category (Optional)</h5>
            <div style={styles.grid}>
              {subCategories[category].map((sub) => (
                <button
                  key={sub}
                  style={{
                    ...styles.btn,
                    fontSize: 13,
                    borderColor: subCategory === sub ? "#6d4bd3" : "#ddd",
                    background:
                      subCategory === sub ? "#f2edff" : "#fff",
                  }}
                  onClick={() => setSubCategory(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Upload */}
      <section style={styles.card}>
        <h4 style={styles.sectionTitle}>Upload Photos / Videos</h4>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <ul style={{ marginTop: 10 }}>
            {files.map((file, index) => (
              <li key={index} style={styles.fileItem}>
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)}>❌</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Description */}
      <section style={styles.card}>
        <h4 style={styles.sectionTitle}>Description</h4>
        <textarea
          rows={5}
          style={styles.textarea}
          placeholder="Explain the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      <button style={styles.submit} onClick={handleSubmit}>
        Submit Complaint
      </button>

      {/* Popup */}
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>✅ Complaint Submitted</h3>
            <p>Your complaint has been successfully registered.</p>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/complaints");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 820,
    margin: "30px auto",
    padding: 20,
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    marginBottom: 10,
  },

  link: {
    color: "#6d4bd3",
    cursor: "pointer",
    fontWeight: 600,
  },

  separator: {
    color: "#999",
  },

  current: {
    color: "#555",
    fontWeight: 600,
  },

  pageTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 30,
    color: "#2c2c2c",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
  },

  subTitle: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 600,
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
    gap: 12,
  },

  btn: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    cursor: "pointer",
    fontWeight: 500,
  },

  submit: {
    width: "100%",
    padding: 14,
    background: "#6d4bd3",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },

  textarea: {
  width: "100%",
  resize: "vertical",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
},

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  popup: {
    background: "#fff",
    padding: 25,
    borderRadius: 14,
    textAlign: "center",
    width: 320,
  },

  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f8f8f8",
    padding: "6px 10px",
    borderRadius: 8,
    marginTop: 6,
  },
};