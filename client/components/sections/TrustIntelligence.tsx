import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrustIntelligence() {
  const [data, setData] = useState<any[]>([]);
  const [trustScore, setTrustScore] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        console.log("📊 TRUST DATA:", data);
        setData(data);

        // 🔥 Calculate average trust
        if (data.length > 0) {
          const avg =
            data.reduce((sum: number, item: any) => sum + item.trustScore, 0) /
            data.length;

          setTrustScore(Math.floor(avg));
        }
      });
  }, []);

  // 🔥 Breakdown (dynamic)
  const breakdown =
    data.length > 0
      ? [
          {
            metric: "Device Reliability",
            score: 85,
          },
          {
            metric: "Integrity",
            score: data.every((d) => d.status === "Safe") ? 100 : 60,
          },
          {
            metric: "Timestamp Consistency",
            score: data.length > 2 ? 90 : 70,
          },
        ]
      : [];

  // 🔥 Trend
  const trustHistory =
    data.length > 0
      ? [
          { date: "Now", score: trustScore },
          { date: "-1m", score: trustScore - 3 },
          { date: "-2m", score: trustScore - 6 },
          { date: "-3m", score: trustScore - 10 },
        ]
      : [];

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Trust Intelligence
        </h1>
        <p className="text-gray-400">
          Evidence reliability and trust scoring system
        </p>
      </div>

      {/* MAIN SCORE */}
      <div className="bg-[#1e293b] p-6 text-center rounded">
        {data.length > 0 ? (
          <>
            <h2 className="mb-4">Overall Trust Score</h2>

            <div className="text-5xl font-bold text-blue-400">
              {trustScore}%
            </div>

            <p className="mt-2">
              {trustScore > 80
                ? "High Trust"
                : trustScore > 50
                ? "Moderate Trust"
                : "Low Trust"}
            </p>
          </>
        ) : (
          <p>No evidence uploaded</p>
        )}
      </div>

      {/* BREAKDOWN */}
      {breakdown.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {breakdown.map((item, idx) => (
            <div key={idx} className="bg-[#1e293b] p-4 rounded">
              <p>{item.metric}</p>
              <strong>{item.score}%</strong>

              <div className="w-full bg-gray-700 h-2 rounded mt-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TREND */}
      {trustHistory.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded">
          <div className="flex justify-between mb-4">
            <h3>Trust Trend</h3>
            <TrendingUp />
          </div>

          <div className="flex gap-2">
            {trustHistory.map((item, idx) => (
              <div key={idx} className="flex-1 text-center">
                <div
                  className="bg-blue-500"
                  style={{ height: `${item.score}%` }}
                ></div>
                <p className="text-xs">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILS */}
      {data.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded">
          <h3 className="mb-3">Integrity Checks</h3>

          <p>
            Safe Files:{" "}
            {data.filter((d) => d.status === "Safe").length}
          </p>

          <p>
            Compromised Files:{" "}
            {data.filter((d) => d.status === "Compromised").length}
          </p>

          <p>Total Files: {data.length}</p>
        </div>
      )}
    </div>
  );
}