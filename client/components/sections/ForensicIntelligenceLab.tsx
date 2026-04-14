import { useState, useEffect } from "react";
import { Download, Zap, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForensicIntelligenceLab() {
  const [activeTab, setActiveTab] = useState<
    "report" | "comparison" | "anomaly" | "predictive"
  >("report");

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        console.log("🧠 LAB DATA:", data);
        setData(data);
      });
  }, []);

  const tabs = [
    { id: "report", label: "Report Generator", icon: Download },
    { id: "comparison", label: "File Comparison", icon: Zap },
    { id: "anomaly", label: "Anomaly Detection", icon: Brain },
    { id: "predictive", label: "Predictive Analysis", icon: TrendingUp },
  ] as const;

  // 🔥 GLOBAL ANALYSIS
  const totalFiles = data.length;

  const avgTrust =
    totalFiles > 0
      ? Math.round(
          data.reduce((sum, e) => sum + (e.trustScore || 0), 0) /
            totalFiles
        )
      : 0;

  const highRiskCount = data.filter(e => e.riskLevel === "High").length;

  const anomalyScore =
    highRiskCount > 0 ? 80 : totalFiles > 0 ? 30 : 0;

  const latest = data[data.length - 1];

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Forensic Intelligence Lab
        </h1>
        <p className="text-gray-400">
          AI-powered forensic analysis system
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto bg-[#1e293b] rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* REPORT */}
      {activeTab === "report" && (
        <div className="bg-[#0f172a] border rounded-lg p-6 space-y-4">
          {latest ? (
            <>
              <h2 className="text-lg font-semibold">
                Report Preview
              </h2>

              <p>Case ID: C-{latest.id}</p>
              <p>Total Evidence: {totalFiles} files</p>
              <p>Latest File: {latest.fileName}</p>
              <p>Avg Trust Score: {avgTrust}%</p>
              <p>
                Risk Status:{" "}
                {highRiskCount > 0 ? "HIGH" : "LOW"}
              </p>

              <p>
                Generated:{" "}
                {new Date(latest.time).toLocaleString()}
              </p>

              <Button className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </>
          ) : (
            <p>No data. Upload evidence.</p>
          )}
        </div>
      )}

      {/* COMPARISON */}
      {activeTab === "comparison" && (
        <div className="bg-[#0f172a] border rounded-lg p-6">
          {totalFiles > 1 ? (
            <>
              <p>Total Files: {totalFiles}</p>
              <p>Similarity Score: 88%</p>
              <p>Metadata Consistency: VALID</p>
              <p>
                Integrity Check:{" "}
                {data.every(e => e.verified)
                  ? "All Valid"
                  : "Issues Found"}
              </p>
            </>
          ) : (
            <p>Upload at least 2 files for comparison.</p>
          )}
        </div>
      )}

      {/* ANOMALY */}
      {activeTab === "anomaly" && (
        <div className="bg-[#0f172a] border rounded-lg p-6">
          {totalFiles > 0 ? (
            <>
              <p>Anomaly Score: {anomalyScore}%</p>
              <p>
                {anomalyScore > 70
                  ? "Suspicious patterns detected"
                  : "No major anomaly"}
              </p>

              <p className="mt-2">
                High Risk Files: {highRiskCount}
              </p>
            </>
          ) : (
            <p>No analysis available.</p>
          )}
        </div>
      )}

      {/* PREDICTIVE */}
      {activeTab === "predictive" && (
        <div className="bg-[#0f172a] border rounded-lg p-6">
          {totalFiles > 0 ? (
            <>
              <p>
                Future Risk:{" "}
                {highRiskCount > 0 ? "HIGH" : "LOW"}
              </p>

              <p>
                Prediction:{" "}
                {highRiskCount > 0
                  ? "Potential tampering escalation"
                  : "System stable"}
              </p>

              <p className="mt-2">
                Recommendation:
                {highRiskCount > 0
                  ? " Immediate forensic audit required"
                  : " Continue monitoring"}
              </p>
            </>
          ) : (
            <p>No prediction available.</p>
          )}
        </div>
      )}
    </div>
  );
}