import { Camera, Clock, Pause, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvidence } from "../../context/EvidenceContext";
import { useMemo } from "react";

export default function TimelineReconstruction() {
  const { evidence } = useEvidence();

  const formatDuration = (ms: number) => {
    if (ms < 0) return '0s';
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const { timelineEvents, summary, videoCameras } = useMemo(() => {
    const safeEvidence = Array.isArray(evidence) ? evidence : [];
    const sorted = [...safeEvidence].sort((a, b) => a.time - b.time);

    let totalMissingMs = 0;
    const uniqueCams = new Set<string>();
    const cameraMap = new Map<string, { fileUrl?: string, fileType?: string }>();

    const events = sorted.map((item, i) => {
      const eventGroupStr = item.eventGroup || "Anomaly - System";
      const parts = eventGroupStr.split("-").map(p => p.trim());
      const type = parts[0];
      const cameraPart = parts.slice(1).join(" - ") || "Unknown Camera";
      const cameraKey = cameraPart.trim().toUpperCase();
      
      uniqueCams.add(cameraKey);
      
      if (item.fileUrl) {
         cameraMap.set(cameraKey, {
           fileUrl: item.fileUrl,
           fileType: item.fileType
         });
      }

      let gapMs = 0;
      let missingFootage = false;
      if (i > 0) {
        gapMs = item.time - sorted[i-1].time;
        // Flag gaps larger than 2 minutes (120,000 ms) as suspicious missing footage
        if (gapMs > 120000) {
           missingFootage = true;
           totalMissingMs += gapMs;
        }
      }

      const d = new Date(item.time || Date.now());
      const displayHours = d.getHours() % 12 || 12;
      const timeStr = `${displayHours}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;

      // Dynamically assign simple description logic
      let desc = `Subject ${type.toLowerCase()} captured via ${cameraPart.toLowerCase()}`;
      if (type === "Entry") desc = `Subject enters perimeter capturing point at ${cameraPart}`;
      if (type === "Movement") desc = `Subject detected in transit by ${cameraPart}`;
      if (type === "Interaction") desc = `Subject interaction logged around ${cameraPart}`;
      if (type === "Exit") desc = `Subject exits premises past ${cameraPart}`;
      if (type === "Anomaly") desc = `Abnormal signature detected by ${cameraPart}`;

      return {
         id: item.hash || `ev-${i}`,
         timeStr,
         rawTime: item.time,
         type,
         camera: cameraPart,
         description: desc,
         gapMs,
         missingFootage,
         status: item.status
      };
    });

    let totalDurationMs = 0;
    if (events.length > 1) {
      totalDurationMs = events[events.length - 1].rawTime - events[0].rawTime;
    }

    const videoCams = Array.from(uniqueCams).slice(0, 2).map(cam => ({
       name: cam,
       fileUrl: cameraMap.get(cam)?.fileUrl,
       fileType: cameraMap.get(cam)?.fileType
    }));

    if (videoCams.length === 0) {
       videoCams.push({
         name: "Camera A",
         fileUrl: "",
         fileType: ""
       }, { 
         name: "Camera B",
         fileUrl: "",
         fileType: ""
       });
    } else if (videoCams.length === 1) {
       videoCams.push({
         name: "Camera " + (videoCams[0].name.includes("A") ? "B" : "A"),
         fileUrl: "",
         fileType: ""
       });
    }

    return {
      timelineEvents: events,
      videoCameras: videoCams,
      summary: {
        totalDuration: formatDuration(totalDurationMs),
        eventsCaptured: events.length,
        camerasUsed: uniqueCams.size,
        missingFootage: formatDuration(totalMissingMs),
        hasMissingFootage: totalMissingMs > 0
      }
    };
  }, [evidence]);

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
            <Button size="sm" variant="outline" className="flex items-center gap-2" disabled={timelineEvents.length === 0}>
              <Play className="w-4 h-4" /> Play
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2" disabled={timelineEvents.length === 0}>
              <Pause className="w-4 h-4" /> Pause
            </Button>
          </div>
        </div>

        {timelineEvents.length > 0 ? (
          <div className="relative pl-6 space-y-4">
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 from-70% to-red-500 to-70%"></div>

            {timelineEvents.map((ev, index) => (
              <div key={ev.id} className="relative p-4 rounded-lg bg-secondary/20 border border-border/50 ml-6">
                <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-secondary text-blue-400 rounded-md">
                    <Clock className="w-3 h-3" /> {ev.timeStr}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">{ev.type}</span>
                  {ev.status === "Compromised" && (
                    <span className="text-xs font-bold px-2 py-1 bg-red-500/10 text-red-500 rounded-md">TAMPERED SOURCE</span>
                  )}
                </div>
                <p className="text-sm text-foreground mb-3">{ev.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md border border-border">{ev.camera}</span>
                  {/* Show gap if present */}
                  {ev.gapMs > 0 && !ev.missingFootage && (
                    <span className="text-xs text-muted-foreground">+{formatDuration(ev.gapMs)}</span>
                  )}
                  {/* Show missing footage alert if gap is large */}
                  {ev.missingFootage && (
                    <span className="text-xs font-medium px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md">
                      {formatDuration(ev.gapMs)} (MISSING FOOTAGE GAP DETECTED)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Clock className="w-10 h-10 text-muted-foreground opacity-50 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground">Timeline is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">Upload evidence files to begin automated chronological reconstruction.</p>
          </div>
        )}
      </div>

      {/* Video Feeds */}
      <div className="grid md:grid-cols-2 gap-6">
        {videoCameras.map((camGroup, index) => (
          <div key={`cam-${index}`} className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold text-foreground mb-4">{camGroup.name}</h3>
            <div className="bg-black/50 border border-border/50 rounded-lg aspect-video flex flex-col items-center justify-center mb-4 text-muted-foreground relative overflow-hidden">
              
              {camGroup.fileUrl ? (
                 camGroup.fileType?.startsWith("video") ? (
                    <video src={camGroup.fileUrl} controls className="absolute inset-0 w-full h-full object-contain bg-black" autoPlay muted loop playsInline />
                 ) : camGroup.fileType?.startsWith("image") ? (
                    <img src={camGroup.fileUrl} className="absolute inset-0 w-full h-full object-contain bg-black" alt={camGroup.name} />
                 ) : camGroup.fileType?.startsWith("audio") ? (
                    <audio src={camGroup.fileUrl} controls className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%]" />
                 ) : (
                    <span className="text-sm text-muted-foreground/70 relative z-10">Unsupported Media</span>
                 )
              ) : (
                 <>
                   <Video className="w-8 h-8 mb-2 opacity-50 relative z-10" />
                   <span className="text-sm text-muted-foreground/70 relative z-10">
                     {timelineEvents.length > 0 ? "Video Feed Ready" : "Awaiting Data"}
                   </span>
                 </>
              )}

            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <p className="text-muted-foreground mb-1">Recording Time:</p>
                <p className="font-medium text-foreground">Status:</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-foreground mb-1">Live Sync Tracker</p>
                {timelineEvents.length > 0 ? (
                  <p className="text-green-500 font-medium">Synced</p>
                ) : (
                  <p className="text-muted-foreground font-medium">Offline</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-semibold text-foreground mb-4">Timeline Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Duration</p>
            <p className="text-lg font-bold text-foreground">{summary.totalDuration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Events Captured</p>
            <p className="text-lg font-bold text-foreground">{summary.eventsCaptured}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Cameras Used</p>
            <p className="text-lg font-bold text-foreground">{summary.camerasUsed}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Missing Footage</p>
            <p className={`text-lg font-bold ${summary.hasMissingFootage ? 'text-red-500' : 'text-foreground'}`}>
              {summary.missingFootage}
            </p>
          </div>
        </div>
      </div>

      {/* Full Evidence Gallery Fallback */}
      {evidence && evidence.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5 mt-6">
          <h3 className="font-semibold text-foreground mb-4">Evidence Gallery (Direct Render)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {evidence.map((item: any, idx: number) => (
               <div key={idx} className="border border-border/50 rounded-lg p-3 bg-secondary/10">
                 <p className="text-xs text-muted-foreground mb-3 truncate" title={item.fileName}>
                    {item.fileName}
                 </p>
                 <div className="w-full aspect-video bg-black flex items-center justify-center rounded overflow-hidden">
                   {item.fileUrl ? (
                      item.fileType?.startsWith("video") ? (
                        <video src={item.fileUrl} controls className="w-full h-full object-contain" />
                      ) : item.fileType?.startsWith("image") ? (
                        <img src={item.fileUrl} className="w-full h-full object-contain" />
                      ) : item.fileType?.startsWith("audio") ? (
                        <audio src={item.fileUrl} controls className="w-[90%]" />
                      ) : (
                        <span className="text-xs text-muted-foreground">Unsupported format</span>
                      )
                   ) : (
                      <span className="text-xs text-red-400 font-medium">Link Broken/Missing</span>
                   )}
                 </div>
               </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}