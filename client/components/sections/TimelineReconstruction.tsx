import { Camera, Clock, Pause, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TimelineReconstruction() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Timeline Reconstruction</h1>
        <p className="text-muted-foreground">Interactive timeline with multi-source synchronization</p>
      </div>

      {/* Event Timeline */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Event Timeline</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Play
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Pause className="w-4 h-4" /> Pause
            </Button>
          </div>
        </div>

        <div className="relative pl-6 space-y-4">
          {/* Timeline Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 from-70% to-red-500 to-70%"></div>

          {/* Event 1 */}
          <div className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 ml-6">
            <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-secondary text-blue-400 rounded-md">
                <Clock className="w-3 h-3" /> 8:30:00
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">Entry</span>
            </div>
            <p className="text-sm text-foreground mb-3">Subject enters building via main entrance</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md border border-border">Camera A</span>
            </div>
          </div>

          {/* Event 2 */}
          <div className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 ml-6">
            <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-secondary text-blue-400 rounded-md">
                <Clock className="w-3 h-3" /> 8:32:15
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">Movement</span>
            </div>
            <p className="text-sm text-foreground mb-3">Subject walks through hallway towards office</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md border border-border">Camera B</span>
              <span className="text-xs text-muted-foreground">2m 15s</span>
            </div>
          </div>

          {/* Event 3 */}
          <div className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 ml-6">
            <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-secondary text-blue-400 rounded-md">
                <Clock className="w-3 h-3" /> 8:34:28
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">Interaction</span>
            </div>
            <p className="text-sm text-foreground mb-3">Subject interacts with desk and safe</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md border border-border">Camera C</span>
              <span className="text-xs text-muted-foreground">2m 13s</span>
            </div>
          </div>

          {/* Event 4 */}
          <div className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 ml-6">
            <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-secondary text-blue-400 rounded-md">
                <Clock className="w-3 h-3" /> 8:38:55
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">Exit</span>
            </div>
            <p className="text-sm text-foreground mb-3">Subject exits building</p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md border border-border">Camera A</span>
              <span className="text-xs font-medium px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md">4m 27s (MISSING FOOTAGE)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Feeds */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Camera A */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Camera A</h3>
          <div className="bg-black/50 border border-border/50 rounded-lg aspect-video flex flex-col items-center justify-center mb-4 text-muted-foreground">
            <Video className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm text-muted-foreground/70">Video Feed</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Recording Time:</p>
              <p className="font-medium text-foreground">Status:</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-foreground mb-1">08:30:00 - 08:40:00</p>
              <p className="text-green-500 font-medium">Synced</p>
            </div>
          </div>
        </div>

        {/* Camera B */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="font-semibold text-foreground mb-4">Camera B</h3>
          <div className="bg-black/50 border border-border/50 rounded-lg aspect-video flex flex-col items-center justify-center mb-4 text-muted-foreground">
            <Video className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-sm text-muted-foreground/70">Video Feed</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Recording Time:</p>
              <p className="font-medium text-foreground">Status:</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-foreground mb-1">08:30:00 - 08:40:00</p>
              <p className="text-green-500 font-medium">Synced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-semibold text-foreground mb-4">Timeline Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Duration</p>
            <p className="text-lg font-bold text-foreground">8m 55s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Events Captured</p>
            <p className="text-lg font-bold text-foreground">4</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Cameras Used</p>
            <p className="text-lg font-bold text-foreground">3</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Missing Footage</p>
            <p className="text-lg font-bold text-red-500">4m 27s</p>
          </div>
        </div>
      </div>
    </div>
  );
}