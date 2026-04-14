import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function BlockchainLedger() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);

  // 🔥 FETCH REAL DATA FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/evidence")
      .then(res => res.json())
      .then(data => {
        const generatedBlocks = data.map((item: any, index: number) => ({
          id: 1020 + index,
          hash: item.hash,
          prevHash: index === 0 ? "GENESIS" : data[index - 1].hash,
          timestamp: new Date(item.time).toLocaleString(),
          eventId: "EV-" + (index + 1),
        }));

        setBlocks(generatedBlocks);
      });
  }, []);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Blockchain Integrity Ledger
        </h1>
        <p className="text-muted-foreground">
          Immutable record of all evidence events
        </p>
      </div>

      {/* Block Explorer */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Block Explorer</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Block ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Hash
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Previous Hash
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Event ID
                </th>
              </tr>
            </thead>

            <tbody>
              {blocks.map((block) => (
                <tr
                  key={block.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">
                    #{block.id}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-muted-foreground">
                        {block.hash?.substring(0, 16)}...
                      </code>

                      <button
                        onClick={() => copyHash(block.hash)}
                        className="text-muted-foreground hover:text-primary transition"
                      >
                        {copiedHash === block.hash ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <code className="font-mono text-xs text-muted-foreground">
                      {block.prevHash?.substring(0, 16)}...
                    </code>
                  </td>

                  <td className="px-6 py-4 text-sm font-mono text-foreground">
                    {block.timestamp}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary">
                      {block.eventId}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* On-Chain */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            On-Chain Storage
          </h3>

          <div className="space-y-3">
            {["Event ID", "Content Hash", "Timestamp"].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <p className="text-sm font-medium text-foreground">{item}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Stored immutably on blockchain
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Off-Chain */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Off-Chain Storage
          </h3>

          <div className="space-y-3">
            {["Multimedia Files", "Video Footage", "Metadata"].map(
              (item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <p className="text-sm font-medium text-foreground">{item}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stored externally with hash reference
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-secondary/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Data Flow
        </h3>

        <div className="flex flex-wrap gap-3 items-center justify-center">
          {[
            "Evidence File",
            "Hash Calculation",
            "Blockchain Entry",
            "Reference Link",
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground">
                {step}
              </div>
              {idx < 3 && (
                <div className="text-muted-foreground text-lg">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}