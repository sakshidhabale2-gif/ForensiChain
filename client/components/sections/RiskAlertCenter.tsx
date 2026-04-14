import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function RiskAlertCenter() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        console.log("🚨 RISK DATA:", data);
        setData(data);
      });
  }, []);

  // 🔥 Generate alerts for ALL evidence
  const alerts = data.flatMap((evidence) => [
    ...(evidence.verified
      ? []
      : [
          {
            severity: "HIGH",
            title: "Tampering Detected",
            description: `${evidence.fileName} integrity compromised`,
            timestamp: new Date(evidence.time).toLocaleString(),
            severity_color: "text-danger",
            severity_bg: "bg-danger/10",
          },
        ]),

    ...(evidence.riskLevel === "High"
      ? [
          {
            severity: "HIGH",
            title: "High Risk Evidence",
            description: `${evidence.fileName} flagged as high risk`,
            timestamp: new Date(evidence.time).toLocaleString(),
            severity_color: "text-danger",
            severity_bg: "bg-danger/10",
          },
        ]
      : []),

    ...(evidence.riskLevel === "Medium"
      ? [
          {
            severity: "MEDIUM",
            title: "Moderate Risk",
            description: `${evidence.fileName} has inconsistencies`,
            timestamp: new Date(evidence.time).toLocaleString(),
            severity_color: "text-warning",
            severity_bg: "bg-warning/10",
          },
        ]
      : []),

    {
      severity: "LOW",
      title: "Evidence Logged",
      description: `${evidence.fileName} uploaded successfully`,
      timestamp: new Date(evidence.time).toLocaleString(),
      severity_color: "text-safe",
      severity_bg: "bg-safe/10",
    },
  ]);

  const highAlertCount = alerts.filter(a => a.severity === "HIGH").length;
  const mediumAlertCount = alerts.filter(a => a.severity === "MEDIUM").length;
  const lowAlertCount = alerts.filter(a => a.severity === "LOW").length;

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Risk & Alert Center
        </h1>
        <p className="text-gray-400">
          Real-time forensic risk monitoring
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-xs">High</p>
          <p className="text-2xl font-bold text-red-400">
            {highAlertCount}
          </p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
          <p className="text-xs">Medium</p>
          <p className="text-2xl font-bold text-yellow-400">
            {mediumAlertCount}
          </p>
        </div>

        <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
          <p className="text-xs">Low</p>
          <p className="text-2xl font-bold text-green-400">
            {lowAlertCount}
          </p>
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`${alert.severity_bg} border rounded-lg p-4`}
            >
              <div className="flex items-start gap-4">
                <AlertTriangle
                  className={`w-5 h-5 ${alert.severity_color}`}
                />

                <div>
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="text-sm">{alert.description}</p>
                  <p className="text-xs text-gray-400">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No alerts yet. Upload evidence.
          </p>
        )}
      </div>

      {/* GLOBAL RISK */}
      {data.length > 0 && (
        <div className="bg-[#1e293b] border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Overall Risk Assessment
          </h2>

          <p>
            Risk Level:{" "}
            <strong>
              {highAlertCount > 0
                ? "HIGH"
                : mediumAlertCount > 0
                ? "MEDIUM"
                : "LOW"}
            </strong>
          </p>

          <p>
            Total Evidence: <strong>{data.length}</strong>
          </p>

          <div className="mt-4">
            <p className="text-sm">
              Recommendation:{" "}
              {highAlertCount > 0
                ? "Immediate investigation required"
                : "System stable"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}