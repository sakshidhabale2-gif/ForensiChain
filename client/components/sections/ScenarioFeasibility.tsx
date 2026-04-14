import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScenarioFeasibility() {
  const [data, setData] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        console.log("SCENARIO DATA:", data);
        setData(data);
      });
  }, []);

  const analyzeScenario = () => {
    if (data.length < 2) {
      alert("Upload at least 2 evidence files");
      return;
    }

    const first = data[0];
    const second = data[1];

    const distance = 120; // demo meters
    const time = (second.time - first.time) / 1000; // seconds
    const speed = distance / time;

    const humanMaxSpeed = 10;

    const feasible = speed <= humanMaxSpeed;

    setResult({
      distance,
      time,
      speed,
      feasible,
      file: first.fileName,
      hash: first.hash,
    });

    setAnalyzed(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Scenario Feasibility
        </h1>
        <p className="text-gray-400">
          AI-based possibility engine for forensic scenarios
        </p>
      </div>

      {/* BUTTON */}
      <div className="bg-[#1e293b] p-6 rounded-lg">
        <Button className="w-full" onClick={analyzeScenario}>
          Analyze Scenario
        </Button>
      </div>

      {/* RESULT */}
      {analyzed && result && (
        <div className="bg-[#1e293b] p-6 rounded-lg space-y-4">
          <p>File: {result.file}</p>
          <p>Hash: {result.hash.substring(0, 20)}...</p>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-[#0f172a] rounded">
              <p>Distance</p>
              <strong>{result.distance} m</strong>
            </div>

            <div className="p-3 bg-[#0f172a] rounded">
              <p>Time</p>
              <strong>{result.time.toFixed(2)} s</strong>
            </div>

            <div className="p-3 bg-[#0f172a] rounded">
              <p>Speed</p>
              <strong>{result.speed.toFixed(2)} m/s</strong>
            </div>
          </div>

          {/* RESULT */}
          <div
            className={`p-4 rounded-lg ${
              result.feasible ? "bg-green-900" : "bg-red-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {result.feasible ? (
                <CheckCircle2 className="text-green-400" />
              ) : (
                <AlertTriangle className="text-red-400" />
              )}

              <h3 className="font-bold">
                {result.feasible
                  ? "Scenario Feasible"
                  : "Scenario Not Feasible"}
              </h3>
            </div>

            <p className="text-sm mt-2">
              {result.feasible
                ? "Movement is within human capability"
                : "Movement exceeds human physical limits"}
            </p>
          </div>

          <div>
            <p>Feasibility Score:</p>
            <strong>{result.feasible ? "85%" : "25%"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}