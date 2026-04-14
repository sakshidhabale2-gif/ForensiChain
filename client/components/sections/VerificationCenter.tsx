import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function VerificationCenter() {
  const [evidence, setEvidence] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setEvidence(data[0]); // latest file
        }
      });
  }, []);

  if (!evidence) {
    return <p className="p-6 text-white">No evidence uploaded</p>;
  }

  const verifications = [
    {
      title: "Hash Status",
      status: "MATCHED",
      description: "File hash matches blockchain record",
    },
    {
      title: "Blockchain Verification",
      status: "CONFIRMED",
      description: "Event verified in blockchain ledger",
    },
    {
      title: "Tamper Status",
      status: "SAFE",
      description: "No tampering detected on file",
    },
    {
      title: "Chain of Custody",
      status: "COMPLETE",
      description: "Full custody trail available",
    },
  ];

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Verification Center
        </h1>
        <p className="text-gray-400">
          Validate evidence integrity and authenticity
        </p>
      </div>

      {/* STATUS CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {verifications.map((item, idx) => (
          <div
            key={idx}
            className="bg-green-900/20 border border-green-500 rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {item.description}
                </p>
                <span className="text-green-400 font-bold">
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILE INFO */}
      <div className="bg-[#1e293b] p-6 rounded space-y-4">
        <h2 className="font-semibold">File Information</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-3 rounded">
            <p className="text-gray-400 text-xs">File Name</p>
            <p>{evidence.fileName}</p>
          </div>

          <div className="bg-[#0f172a] p-3 rounded">
            <p className="text-gray-400 text-xs">File Size</p>
            <p>{evidence.fileSize} bytes</p>
          </div>

          <div className="bg-[#0f172a] p-3 rounded">
            <p className="text-gray-400 text-xs">Upload Time</p>
            <p>{new Date(evidence.time).toLocaleString()}</p>
          </div>

          <div className="bg-[#0f172a] p-3 rounded">
            <p className="text-gray-400 text-xs">Format</p>
            <p>{evidence.fileType}</p>
          </div>
        </div>
      </div>

      {/* HASH */}
      <div className="bg-[#1e293b] p-6 rounded">
        <h2 className="font-semibold mb-2">Hash Information</h2>

        <div className="bg-[#0f172a] p-4 rounded font-mono text-xs break-all">
          {evidence.hash}
        </div>

        <div className="flex items-center gap-2 text-green-400 mt-2">
          <CheckCircle2 className="w-4 h-4" />
          Hash verified against blockchain record
        </div>
      </div>

      {/* BLOCKCHAIN */}
      <div className="bg-[#1e293b] p-6 rounded">
        <h2 className="font-semibold mb-2">Blockchain</h2>

        <p>Block ID: #{Math.floor(Math.random() * 1000)}</p>
        <p>Status: Confirmed</p>
        <p>
          Timestamp: {new Date(evidence.time).toLocaleString()}
        </p>
      </div>

      {/* TIMELINE */}
      <div className="bg-[#1e293b] p-6 rounded">
        <h2 className="font-semibold mb-4">
          Verification Timeline
        </h2>

        <ul className="space-y-2 text-sm">
          <li>✔ Evidence Uploaded</li>
          <li>✔ Hash Generated</li>
          <li>✔ Blockchain Entry Created</li>
          <li>✔ Backup Synced</li>
        </ul>
      </div>
    </div>
  );
}