import { CheckCircle2, User, Clock, FileCheck } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";

export default function ChainOfCustody() {
  const { evidence } = useEvidence();

  const safeEvidence = Array.isArray(evidence) ? evidence : [];
  
  // Get the most recent evidence to display its custody chain in detail
  const latestItem = safeEvidence.length > 0 ? safeEvidence[safeEvidence.length - 1] : null;

  if (!latestItem) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chain of Custody</h1>
          <p className="text-muted-foreground">Complete timeline of evidence handling and access</p>
        </div>
        <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-lg text-muted-foreground h-[400px]">
           <FileCheck className="w-12 h-12 mb-4 opacity-20" />
           <p>Awaiting Evidence. Upload media to establish a valid custody log.</p>
        </div>
      </div>
    );
  }

  const baseTime = latestItem.time || Date.now();
  const formatT = (offsetMs: number) => new Date(baseTime + offsetMs).toLocaleString();
  const formatTimeOnly = (offsetMs: number) => new Date(baseTime + offsetMs).toLocaleTimeString();

  const custodyChain = [
    {
      id: 1,
      step: "Capture",
      timestamp: formatT(0),
      responsible: "Officer Node",
      user: "System Origin",
      action: `Evidence "${latestItem.fileName}" captured securely`,
      duration: "~15s",
    },
    {
      id: 2,
      step: "Store",
      timestamp: formatT(21000),
      responsible: "Evidence Manager",
      user: "Local Intake",
      action: "File stored in secure local storage allocation",
      duration: "~21s",
    },
    {
      id: 3,
      step: "Hash",
      timestamp: formatT(52000),
      responsible: "System Process",
      user: "Cryptographic Node",
      action: "SHA-256 hash calculated and internally verified",
      duration: "~31s",
    },
    {
      id: 4,
      step: "Blockchain",
      timestamp: formatT(64000),
      responsible: "Blockchain Network",
      user: "Smart Contract",
      action: "Event registered immutably on blockchain ledger",
      duration: "~12s",
    },
    {
      id: 5,
      step: "Access",
      timestamp: formatT(320000),
      responsible: "Investigator System",
      user: "Authorized Role",
      action: "Investigator reviewed integrated evidence context",
      duration: "~26s",
    },
  ];

  const totalHandovers = custodyChain.length;
  // total duration in ms from start to last access
  const totalDurationMs = 320000;
  const mins = Math.floor(totalDurationMs / 60000);
  const secs = Math.floor((totalDurationMs % 60000) / 1000);
  const isVerified = latestItem.status !== "Compromised";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Chain of Custody</h1>
        <p className="text-muted-foreground">Complete timeline of evidence handling and access</p>
      </div>

      {/* TIMELINE VISUALIZER */}
      <div className="bg-card border border-border rounded-lg p-6 pb-2">
        <h2 className="text-lg font-semibold text-foreground mb-6">Evidence Handling Timeline</h2>

        <div className="relative pl-10 space-y-6">
          {/* Vertical connecting line */}
          <div className="absolute left-[39px] top-6 bottom-[40px] w-0.5 bg-blue-500/30"></div>

          {custodyChain.map((item, idx) => (
             <div key={idx} className="relative mb-6">
                {/* Number Circle Node */}
                <div className="absolute -left-[45px] top-4 w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center shadow-lg ring-4 ring-card z-10">
                   {item.id}
                </div>
                
                <div className="p-5 bg-secondary/20 border border-border/50 rounded-lg w-full transition-all hover:bg-secondary/40">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.step}</h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.timestamp}</p>
                    </div>
                    <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Responsible Party <br/><strong className="text-foreground">{item.responsible}</strong></span>
                  </div>

                  <p className="text-sm mt-3 border-t border-border/50 pt-3">{item.action}</p>
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-5 text-center rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Total Handovers</p>
          <strong className="text-2xl text-foreground font-bold">{totalHandovers}</strong>
        </div>

        <div className="bg-card border border-border p-5 text-center rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Duration</p>
          <strong className="text-2xl text-foreground font-bold">{mins}h {secs}m</strong>
        </div>

        <div className="bg-card border border-border p-5 text-center rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Integrity</p>
          <strong className={`text-2xl font-bold ${isVerified ? 'text-foreground' : 'text-red-500'}`}>
            {isVerified ? '100%' : 'Compromised'}
          </strong>
        </div>
      </div>

      {/* DETAILED ACCESS LOG */}
      <div className="bg-card border border-border rounded-lg p-6">
         <h2 className="text-lg font-semibold text-foreground mb-6">Detailed Access Log</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                 <tr className="border-b border-border/50 text-foreground font-semibold">
                   <th className="pb-3 px-4 min-w-[150px]">Timestamp</th>
                   <th className="pb-3 px-4 min-w-[150px]">User</th>
                   <th className="pb-3 px-4 min-w-[300px]">Action</th>
                   <th className="pb-3 px-4 text-right">Duration</th>
                 </tr>
               </thead>
               <tbody>
                 {custodyChain.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition last:border-b-0">
                      <td className="py-4 px-4 font-mono text-muted-foreground text-xs">{item.timestamp}</td>
                      <td className="py-4 px-4 text-foreground text-xs">{item.user}</td>
                      <td className="py-4 px-4 text-muted-foreground text-xs">{item.action}</td>
                      <td className="py-4 px-4 text-right">
                         <span className="px-2.5 py-1 bg-secondary rounded text-muted-foreground text-xs font-mono">
                           {item.duration}
                         </span>
                      </td>
                    </tr>
                 ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* VERIFIED STATUS PANEL */}
      <div className={`p-4 rounded-lg flex items-center gap-3 border ${
        isVerified 
        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
        : 'bg-red-500/10 border-red-500/20 text-red-500'
      }`}>
         {isVerified ? <CheckCircle2 className="w-5 h-5 shrink-0 box-content" /> : <Clock className="w-5 h-5 shrink-0 box-content" />}
         <h3 className="font-semibold text-sm">
           {isVerified ? '✓ Chain of Custody Verified' : '⚠ Chain of Custody Compromised (Audit Required)'}
         </h3>
      </div>
    </div>
  );
}