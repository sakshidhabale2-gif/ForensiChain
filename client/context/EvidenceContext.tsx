import { createContext, useContext, useState, useEffect } from "react";

const EvidenceContext = createContext<any>(null);

export const EvidenceProvider = ({ children }: any) => {

  // 🔥 Load from localStorage
  const [evidence, setEvidence] = useState(() => {
    const saved = localStorage.getItem("evidence");
    return saved ? JSON.parse(saved) : null;
  });

  // 🔥 Save to localStorage whenever it changes
  useEffect(() => {
    if (evidence) {
      localStorage.setItem("evidence", JSON.stringify(evidence));
    }
  }, [evidence]);

  return (
    <EvidenceContext.Provider value={{ evidence, setEvidence }}>
      {children}
    </EvidenceContext.Provider>
  );
};

export const useEvidence = () => {
  const context = useContext(EvidenceContext);
  if (!context) {
    throw new Error("useEvidence must be used inside EvidenceProvider");
  }
  return context;
};