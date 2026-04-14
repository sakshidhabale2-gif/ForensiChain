import { Upload, File, Loader2, CheckCircle2 } from "lucide-react";

export default function EvidenceIntake() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Evidence Intake</h1>
        <p className="text-muted-foreground">Upload and organize evidence files with automatic hashing and event assignment</p>
      </div>

      {/* Upload Zone */}
      <div className="border border-border bg-card rounded-lg p-10 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Drag and drop evidence files</h3>
        <p className="text-muted-foreground text-sm mb-6">Supports video, images, documents, and audio files</p>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition">
          Select Files
        </button>
      </div>

      {/* Recent Uploads */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-4">Recent Uploads</h2>
        <div className="space-y-4">
          {/* Item 1 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="flex items-start gap-4">
              <File className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">CCTV Entrance 001.mp4</p>
                <p className="text-xs text-muted-foreground mb-2">2024-01-15 08:30:42</p>
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium">Entry - Camera A</span>
                  <code className="bg-secondary/60 px-2 py-1 rounded-md text-muted-foreground font-mono">0xA7F3C2...</code>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="flex items-start gap-4">
              <File className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">photo_hallway_02.jpg</p>
                <p className="text-xs text-muted-foreground mb-2">2024-01-15 08:32:15</p>
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium">Movement - Camera B</span>
                  <code className="bg-secondary/60 px-2 py-1 rounded-md text-muted-foreground font-mono">0x89D1E4...</code>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="flex items-start gap-4">
              <File className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">CCTV_Office_003.mp4</p>
                <p className="text-xs text-muted-foreground mb-2">2024-01-15 08:34:28</p>
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium">Interaction - Camera C</span>
                  <code className="bg-secondary/60 px-2 py-1 rounded-md text-muted-foreground font-mono">0xC4E5F0...</code>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Event Grouping */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-4">Suggested Event Grouping</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-foreground text-sm">Entry - Camera A</span>
              <span className="text-primary font-medium text-sm">95%</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">3 files</p>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: "95%" }}></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-foreground text-sm">Movement - Camera B</span>
              <span className="text-primary font-medium text-sm">87%</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">2 files</p>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: "87%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}