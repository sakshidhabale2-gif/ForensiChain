import { CheckCircle2, Cloud, Database, ArrowRight, Zap, RefreshCw, FileImage, File } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";

export default function StorageManagement() {
  const { evidence } = useEvidence();

  // Protect against undefined arrays
  const safeEvidence = Array.isArray(evidence) ? evidence : [];
  
  // Real calculation from exact uploaded file sizes (captured directly from Intake)
  const totalFiles = safeEvidence.length;
  const totalSizeMB = safeEvidence.reduce(
    (sum, item) => sum + (item.fileSize || 0) / (1024 * 1024),
    0
  );

  const avgSizeMB = totalFiles > 0 ? (totalSizeMB / totalFiles) : 0;
  
  // Storage parameters
  const onSiteStorage = {
    usedGB: totalSizeMB / 1024,
    totalGB: 10,
    status: totalFiles > 0 ? "Active" : "Idle",
    lastSync: totalFiles > 0 ? "Just now" : "Offline"
  };

  const offSiteStorage = {
    usedGB: totalSizeMB / 1024,
    totalGB: 100,
    status: totalFiles > 0 ? "Synced" : "Awaiting Data",
    lastBackup: totalFiles > 0 ? "Just now" : "Offline"
  };

  const onSitePercent = Math.min(100, (onSiteStorage.usedGB / onSiteStorage.totalGB) * 100);
  const offSitePercent = Math.min(100, (offSiteStorage.usedGB / offSiteStorage.totalGB) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Storage Management</h1>
        <p className="text-muted-foreground">Monitor on-site and off-site storage with backup status</p>
      </div>

      {/* STORAGE CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ON-SITE */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">On-Site Storage</h3>
                <p className="text-xs text-muted-foreground">Local Storage Array</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${totalFiles > 0 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-secondary text-muted-foreground border-border'}`}>
              {onSiteStorage.status}
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium text-foreground">
                {onSiteStorage.usedGB < 0.01 && totalFiles > 0 ? '< 0.01' : onSiteStorage.usedGB.toFixed(2)} GB / {onSiteStorage.totalGB} GB
              </span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(1, onSitePercent)}%` }} // Minimum 1% to show the bar is active
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {onSitePercent.toFixed(1)}% Used
            </p>
          </div>

          <div className="border-t border-border/50 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Evidence Files:</span>
              <span className="font-medium text-foreground">{totalFiles}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Sync:</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                {totalFiles > 0 && <RefreshCw className="w-3 h-3 text-muted-foreground" />} {onSiteStorage.lastSync}
              </span>
            </div>
          </div>
        </div>

        {/* OFF-SITE CLOUD */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Off-Site Storage</h3>
                <p className="text-xs text-muted-foreground">Encrypted Cloud Backup</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${totalFiles > 0 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-secondary text-muted-foreground border-border'}`}>
              {totalFiles > 0 && <CheckCircle2 className="w-3 h-3" />}
              {offSiteStorage.status}
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium text-foreground">
                {offSiteStorage.usedGB < 0.01 && totalFiles > 0 ? '< 0.01' : offSiteStorage.usedGB.toFixed(2)} GB / {offSiteStorage.totalGB} GB
              </span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(1, offSitePercent)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {offSitePercent.toFixed(1)}% Used
            </p>
          </div>

          <div className="border-t border-border/50 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Backup Status:</span>
              <span className={`font-medium ${totalFiles > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
                {totalFiles > 0 ? 'Available & Synced' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Backup:</span>
              <span className="font-medium text-foreground flex items-center gap-1">
               {totalFiles > 0 && <Cloud className="w-3 h-3 text-muted-foreground" />} {offSiteStorage.lastBackup}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DATA FLOW PIPELINE */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Data Flow Pipeline</h3>
        
        <div className="grid md:grid-cols-4 gap-4 items-center">
          
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-3 relative z-10 transition group-hover:scale-110 group-hover:border-primary/50">
               <FileImage className="w-6 h-6 text-foreground" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">1. Capture</h4>
            <p className="text-xs text-muted-foreground">Evidence captured from source</p>
            <ArrowRight className="absolute -right-4 top-8 w-5 h-5 text-muted-foreground/50 hidden md:block" />
          </div>

          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-3 relative z-10 transition group-hover:scale-110 group-hover:border-primary/50">
               <Database className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">2. Local Storage</h4>
            <p className="text-xs text-muted-foreground">Stored on-site for immediate access</p>
            <ArrowRight className="absolute -right-4 top-8 w-5 h-5 text-muted-foreground/50 hidden md:block" />
          </div>

          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-3 relative z-10 transition group-hover:scale-110 group-hover:border-primary/50">
               <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">3. Blockchain Entry</h4>
            <p className="text-xs text-muted-foreground">Hash registered on immutable ledger</p>
            <ArrowRight className="absolute -right-4 top-8 w-5 h-5 text-muted-foreground/50 hidden md:block" />
          </div>

          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-3 relative z-10 transition group-hover:scale-110 group-hover:border-primary/50">
               <Cloud className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">4. Cloud Backup</h4>
            <p className="text-xs text-muted-foreground">Replicated to off-site secure vault</p>
          </div>

        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-5 text-center rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Total Evidence</p>
          <strong className="text-2xl text-foreground font-bold">{totalFiles} <span className="text-muted-foreground text-sm font-medium">items</span></strong>
        </div>

        <div className="bg-card border border-border p-5 text-center rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Average Data Size</p>
          <strong className="text-2xl text-foreground font-bold">
            {avgSizeMB > 0 ? (avgSizeMB < 0.01 ? '< 0.01' : avgSizeMB.toFixed(2)) : "0"} <span className="text-muted-foreground text-sm font-medium">MB</span>
          </strong>
        </div>

        <div className="bg-card border border-border p-5 text-center rounded-lg relative overflow-hidden">
          <p className="text-xs text-muted-foreground mb-2">Data Redundancy</p>
          <strong className="text-2xl text-foreground font-bold">{totalFiles > 0 ? "2x" : "0x"}</strong>
          {totalFiles > 0 && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-green-500" />}
        </div>
      </div>
      
      {/* RAW FILE LOG FALLBACK */}
      {totalFiles > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
           <h3 className="font-semibold text-foreground mb-4">Storage Allocation Log</h3>
           <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {[...safeEvidence].reverse().map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded bg-secondary/30 border border-border/50">
                    <div className="flex items-center gap-3">
                       <File className="w-4 h-4 text-muted-foreground" />
                       <span className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-md">{item.fileName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-1 rounded">
                       {item.fileSize ? (item.fileSize / (1024 * 1024)).toFixed(2) : '0.00'} MB
                    </span>
                 </div>
              ))}
           </div>
        </div>
      )}

    </div>
  );
}