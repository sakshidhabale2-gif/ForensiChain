import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function StorageManagement() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        console.log("💾 STORAGE DATA:", data);
        setData(data);
      });
  }, []);

  // 🔥 Calculate total size (MB → GB)
  const totalSizeMB = data.reduce(
    (sum, item) => sum + (item.fileSize || 0) / (1024 * 1024),
    0
  );

  const totalSizeGB = totalSizeMB / 1024;

  const onSiteStorage = {
    used: totalSizeGB,
    total: 10,
    status: data.length > 0 ? "Active" : "Idle",
  };

  const offSiteStorage = {
    used: totalSizeGB,
    total: 100,
    status: data.length > 0 ? "Synced" : "Idle",
  };

  const onSitePercent = (onSiteStorage.used / onSiteStorage.total) * 100;
  const offSitePercent = (offSiteStorage.used / offSiteStorage.total) * 100;

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Storage Management
        </h1>
        <p className="text-gray-400">
          Real-time evidence storage tracking
        </p>
      </div>

      {/* STORAGE CARDS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ON-SITE */}
        <div className="bg-[#1e293b] p-6 rounded">
          <div className="flex justify-between mb-4">
            <h3>On-Site Storage</h3>
            <span className="text-green-400">
              {onSiteStorage.status}
            </span>
          </div>

          <p>
            {onSiteStorage.used.toFixed(2)} GB / {onSiteStorage.total} GB
          </p>

          <div className="w-full bg-gray-700 h-3 rounded mt-2">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${onSitePercent}%` }}
            />
          </div>

          <p className="text-sm mt-2">
            {onSitePercent.toFixed(1)}% used
          </p>
        </div>

        {/* OFF-SITE */}
        <div className="bg-[#1e293b] p-6 rounded">
          <div className="flex justify-between mb-4">
            <h3>Cloud Storage</h3>
            <span className="text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {offSiteStorage.status}
            </span>
          </div>

          <p>
            {offSiteStorage.used.toFixed(2)} GB / {offSiteStorage.total} GB
          </p>

          <div className="w-full bg-gray-700 h-3 rounded mt-2">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${offSitePercent}%` }}
            />
          </div>

          <p className="text-sm mt-2">
            {offSitePercent.toFixed(1)}% used
          </p>
        </div>
      </div>

      {/* FILE LIST */}
      {data.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded">
          <h3 className="mb-3">Stored Evidence</h3>

          {data.map((item, i) => (
            <div key={i} className="mb-2">
              <p>{item.fileName}</p>
              <p className="text-sm text-gray-400">
                {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ))}
        </div>
      )}

      {/* STATS */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-[#1e293b] p-4 text-center rounded">
          <p>Total Evidence</p>
          <strong>{data.length}</strong>
        </div>

        <div className="bg-[#1e293b] p-4 text-center rounded">
          <p>Average File Size</p>
          <strong>
            {data.length > 0
              ? (totalSizeMB / data.length).toFixed(1) + " MB"
              : "0 MB"}
          </strong>
        </div>

        <div className="bg-[#1e293b] p-4 text-center rounded">
          <p>Backup Status</p>
          <strong>{data.length > 0 ? "Synced" : "Idle"}</strong>
        </div>
      </div>
    </div>
  );
}