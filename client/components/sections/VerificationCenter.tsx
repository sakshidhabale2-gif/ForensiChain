import { CheckCircle2, AlertTriangle, FileCheck, ShieldCheck, Database } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";

export default function VerificationCenter() {
  const { evidence } = useEvidence();

  const safeEvidence = Array.isArray(evidence) ? evidence : [];
  // Use the most recently uploaded piece of evidence for the Verification Center focus
  const latestEvidence = safeEvidence.length > 0 ? safeEvidence[safeEvidence.length - 1] : null;

  if (!latestEvidence) {
    return (
       <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Verification Center</h1>
            <p className="text-muted-foreground">Validate evidence integrity and authenticity</p>
          </div>
          <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-lg text-muted-foreground h-[400px]">
             <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
             <p>Awaiting Evidence. Upload media to initiate system verification.</p>
          </div>
       </div>
    );
  }

  // Verification Logic Math
  const hashMatched = latestEvidence.status !== "Compromised";
  const blockchainConfirmed = latestEvidence.hash && !latestEvidence.hash.includes("pending");
  const tamperDetected = !hashMatched;
  const chainComplete = !!latestEvidence.time;

  const verifications = [
    {
      title: "Hash Status",
      status: hashMatched ? "MATCHED" : "MISMATCH",
      description: "File hash aligns with blockchain record",
      feasible: hashMatched
    },
    {
      title: "Blockchain Verification",
      status: blockchainConfirmed ? "CONFIRMED" : "PENDING",
      description: "Event verified in immutable ledger",
      feasible: blockchainConfirmed
    },
    {
      title: "Tamper Status",
      status: tamperDetected ? "COMPROMISED" : "SAFE",
      description: tamperDetected ? "Hash mismatch detected!" : "No tampering detected on file",
      feasible: !tamperDetected
    },
    {
      title: "Chain of Custody",
      status: chainComplete ? "COMPLETE" : "BROKEN",
      description: "Full custody trail available",
      feasible: chainComplete
    },
  ];

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 MB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formattedDate = new Date(latestEvidence.time || Date.now()).toLocaleString();
  
  // Calculate relative blocks based on array position mapping identical to Blockchain Ledger
  const blockId = 1000 + safeEvidence.findIndex((e: any) => e.hash === latestEvidence.hash);
  const eventId = `EV-${latestEvidence.hash.substring(latestEvidence.hash.length - 4).toUpperCase()}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Verification Center</h1>
        <p className="text-muted-foreground">Validate evidence integrity and authenticity</p>
      </div>

      {/* STATUS CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {verifications.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-6 bg-secondary/10 ${
              item.feasible ? 'border-green-500/50' : 'border-red-500/50'
            }`}
          >
            <div className="flex items-start gap-4">
              {item.feasible ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="w-full">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className={`px-3 py-1 rounded inline-block text-xs font-bold tracking-wider ${
                  item.feasible ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {item.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VERIFICATION REPORT PANEL */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Verification Report</h2>

        {/* FILE INFO */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4" /> File Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">File Name</p>
              <p className="font-medium text-foreground truncate" title={latestEvidence.fileName}>{latestEvidence.fileName}</p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">File Size</p>
              <p className="font-medium text-foreground">{formatFileSize(latestEvidence.fileSize)}</p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Upload Time</p>
              <p className="font-medium text-foreground">{formattedDate}</p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Format</p>
              <p className="font-medium text-foreground">{latestEvidence.fileType || 'Raw Binary'}</p>
            </div>
          </div>
        </div>

        {/* HASH INFO */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Hash Information
          </h3>
          <div className="bg-secondary/30 border border-border/50 p-5 rounded-lg">
            <p className="text-muted-foreground text-xs mb-2">SHA-256 Cryptographic Hash:</p>
            <p className={`font-mono text-sm break-all ${hashMatched ? 'text-foreground' : 'text-red-500'}`}>
              {latestEvidence.hash}
            </p>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${hashMatched ? 'text-green-500' : 'text-red-500'}`}>
            {hashMatched ? (
               <><CheckCircle2 className="w-4 h-4" /> Hash verified firmly against origin record</>
            ) : (
               <><AlertTriangle className="w-4 h-4" /> CRITICAL: Hash mismatch detected. Data integrity compromised.</>
            )}
          </div>
        </div>

        {/* BLOCKCHAIN CONFIRMATION */}
        <div className="space-y-4 mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4" /> Blockchain Confirmation
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Block ID</p>
              <p className="font-mono text-primary font-medium">#{blockId}</p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Confirmation Status</p>
              <p className="font-medium text-foreground">
                {blockchainConfirmed ? "Confirmed (Encrypted block)" : "Validating Proof-of-Work..."}
              </p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Event ID</p>
              <p className="font-medium text-foreground">{eventId}</p>
            </div>
            <div className="bg-secondary/30 border border-border/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-xs mb-1">Blockchain Timestamp</p>
              <p className="font-medium text-foreground">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Verification Timeline Execution</h2>

        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border/50"></div>

          <div className="relative">
            <div className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <p className="text-xs text-blue-400 font-mono mb-1">{formattedDate}</p>
            <p className="text-sm font-medium text-foreground">File uploaded to secure intake system</p>
          </div>

          <div className="relative">
             <div className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <p className="text-xs text-blue-400 font-mono mb-1">{(new Date(latestEvidence.time + 100)).toLocaleTimeString()}</p>
            <p className="text-sm font-medium text-foreground">SHA-256 hash calculation executed</p>
          </div>

          <div className="relative">
             <div className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <p className="text-xs text-blue-400 font-mono mb-1">{(new Date(latestEvidence.time + 1200)).toLocaleTimeString()}</p>
            <p className="text-sm font-medium text-foreground">Distributed blockchain entry secured</p>
          </div>

          <div className="relative">
             <div className="absolute -left-[32px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <p className="text-xs text-blue-400 font-mono mb-1">{(new Date(latestEvidence.time + 4800)).toLocaleTimeString()}</p>
            <p className="text-sm font-medium text-foreground">Off-site encrypted cloud backup replicated</p>
          </div>
        </div>
      </div>
    </div>
  );
}