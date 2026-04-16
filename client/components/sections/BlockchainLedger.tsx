import { Copy, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";
import { useMemo } from "react";

export default function BlockchainLedger() {
  const { evidence } = useEvidence();

  const blocks = useMemo(() => {
    if (!evidence || evidence.length === 0) return [];
    
    // Sort chronologically from oldest to newest to build the immutable chain linkages
    const sorted = [...evidence].sort((a, b) => a.time - b.time);
    
    return sorted.map((item, index) => {
      // The blockchain connects blocks via hashes. First item gets a genesis hash.
      const prevHash = index === 0 ? "0x0000000000000000000000000000000000000000" : sorted[index - 1].hash;
      
      const d = new Date(item.time || Date.now());
      const timeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      
      const formattedHash = item.hash.startsWith("0x") ? item.hash : "0x" + item.hash;
      const formattedPrevHash = prevHash.startsWith("0x") ? prevHash : "0x" + prevHash;
      
      return {
        blockId: 1000 + index, 
        hash: formattedHash,
        prevHash: formattedPrevHash,
        timestamp: timeStr,
        eventId: `EV-${item.hash.substring(item.hash.length - 4).toUpperCase()}`
      };
    }).reverse(); // Display the newest block at the top
  }, [evidence]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          Blockchain Integrity Ledger
        </h1>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-primary font-medium">
            "This page ensures chain of custody by converting each evidence into a cryptographic hash and storing it on blockchain, making any tampering immediately detectable."
          </p>
        </div>
      </div>

      {/* Block Explorer */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-2">Block Explorer</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This section shows how each evidence event is stored as a block in the blockchain. Each block is linked to the previous one, making the system tamper-proof.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 text-foreground font-semibold">
                <th className="pb-3 px-4 min-w-[100px]">Block ID</th>
                <th className="pb-3 px-4 min-w-[200px]">Hash</th>
                <th className="pb-3 px-4 min-w-[200px]">Previous Hash</th>
                <th className="pb-3 px-4 min-w-[180px]">Timestamp</th>
                <th className="pb-3 px-4 min-w-[120px]">Event ID</th>
              </tr>
            </thead>
            <tbody>
              {blocks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Pending genesis block... Upload evidence to generate the ledger.
                  </td>
                </tr>
              ) : (
                blocks.map((block, idx) => (
                  <tr key={block.blockId} className="border-b border-border/50 hover:bg-secondary/20 transition last:border-b-0">
                    <td className="py-4 px-4 font-mono text-primary font-medium">#{block.blockId}</td>
                    <td className="py-4 px-4 font-mono text-muted-foreground text-xs flex items-center gap-2">
                      <span className="truncate w-16 sm:w-32 block">{block.hash}</span>
                      <button 
                        onClick={() => copyToClipboard(block.hash)}
                        className="text-muted-foreground hover:text-foreground transition"
                        title="Copy Hash"
                      ><Copy className="w-3.5 h-3.5" /></button>
                    </td>
                    <td className="py-4 px-4 font-mono text-muted-foreground text-xs">
                      <span className="truncate w-16 sm:w-32 block">{block.prevHash}</span>
                    </td>
                    <td className="py-4 px-4 font-mono text-foreground text-xs">{block.timestamp}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-secondary rounded-full text-foreground text-xs font-medium border border-border">
                        {block.eventId}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* On-Chain Storage */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">On-Chain Storage</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Critical verification data like hash and timestamps are stored on-chain to ensure integrity and authenticity. Cannot be changed once stored.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm flex items-center gap-2">
                Event ID
              </p>
              <p className="text-xs text-muted-foreground mt-1">Stored immutably on blockchain</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm">Content Hash</p>
              <p className="text-xs text-muted-foreground mt-1">Stored immutably on blockchain</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm">Timestamp</p>
              <p className="text-xs text-muted-foreground mt-1">Stored immutably on blockchain</p>
            </div>
          </div>
        </div>

        {/* Off-Chain Storage */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Off-Chain Storage</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The actual evidence files are stored off-chain, while their hash is stored on-chain to ensure they are not altered. Blockchain cannot store large files efficiently.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm">Multimedia Files</p>
              <p className="text-xs text-muted-foreground mt-1">Stored externally with hash reference</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm">Video Footage</p>
              <p className="text-xs text-muted-foreground mt-1">Stored externally with hash reference</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="font-medium text-foreground text-sm">Metadata</p>
              <p className="text-xs text-muted-foreground mt-1">Stored externally with hash reference</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-semibold text-foreground mb-2">Data Flow Pipeline</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This flow ensures that even if the file is accessed externally, its integrity can always be verified using the blockchain hash.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <div className="px-6 py-3 rounded-lg bg-secondary/50 border border-border">Evidence File</div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="px-6 py-3 rounded-lg bg-secondary/50 border border-border">Hash Calculation</div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="px-6 py-3 rounded-lg bg-secondary/50 border border-border">Blockchain Entry</div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="px-6 py-3 rounded-lg bg-secondary/50 border border-border">Reference Link</div>
        </div>
      </div>
    </div>
  );
}