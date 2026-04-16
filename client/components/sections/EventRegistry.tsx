import { Search, Eye, File, CheckCircle2, Clock, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";
import { useMemo, useState } from "react";
import React from "react";

interface GroupedEvent {
  eventId: string;
  type: string;
  location: string;
  time: string;
  filesCount: number;
  status: "Verified" | "Pending" | "Compromised";
  timestampRaw: number;
  files: any[];
}

export default function EventRegistry() {
  const { evidence } = useEvidence();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const groupedEvents = useMemo(() => {
    // Strictly only display accurately uploaded real events
    const events: GroupedEvent[] = [];

    const safeEvidence = Array.isArray(evidence) ? evidence : [];
    
    // Group all uploaded evidence context files
    const groupings: Record<string, GroupedEvent> = {};
    let dynamicIdOffset = 200;

    safeEvidence.forEach((item) => {
      // the property injected from EvidenceIntake local state logic
      const eventGroupStr = item.eventGroup || "Anomaly - Unknown Origin";
      const parts = eventGroupStr.split("-").map((p: string) => p.trim());
      const type = parts[0];
      const location = parts[1] || "Unknown";

      if (groupings[eventGroupStr]) {
         groupings[eventGroupStr].filesCount += 1;
         groupings[eventGroupStr].files.push(item);
         // If a file is compromised, entire event group inherits the alert state
         if (item.status === "Compromised") {
             groupings[eventGroupStr].status = "Compromised";
         }
      } else {
         const timeNum = item.time || Date.now();
         const d = new Date(timeNum);
         const displayHours = d.getHours() % 12 || 12;
         const timeStr = `${displayHours}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
         
         dynamicIdOffset += 1;
         const eventId = `EV-${dynamicIdOffset}`;

         groupings[eventGroupStr] = {
           eventId,
           type,
           location,
           time: timeStr,
           filesCount: 1,
           status: item.status === "Compromised" ? "Compromised" : "Verified",
           timestampRaw: timeNum,
           files: [item]
         };
      }
    });

    // Merge custom mapped events
    return [...events, ...Object.values(groupings)].sort((a, b) => a.timestampRaw - b.timestampRaw);
  }, [evidence]);

  const filteredEvents = groupedEvents.filter(ev => 
    ev.type.toLowerCase().includes(search.toLowerCase()) || 
    ev.eventId.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Event Registry</h1>
        <p className="text-muted-foreground">View and manage evidence events with linked files</p>
      </div>

      {/* Main Table Card */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 text-foreground font-semibold">
                <th className="pb-3 px-4 whitespace-nowrap">Event ID</th>
                <th className="pb-3 px-4">Type</th>
                <th className="pb-3 px-4">Time</th>
                <th className="pb-3 px-4">Evidence</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => (
                <React.Fragment key={ev.eventId}>
                  <tr className="border-b border-border/50 hover:bg-secondary/20 transition group">
                    <td className="py-4 px-4 font-mono text-primary font-medium">{ev.eventId}</td>
                    <td className="py-4 px-4 text-foreground">{ev.type}</td>
                    <td className="py-4 px-4 text-foreground font-mono">{ev.time}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-foreground">
                        <File className="w-4 h-4 text-blue-400" />
                        <span>{ev.filesCount} file{ev.filesCount !== 1 && 's'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {ev.status === "Verified" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-medium">
                          Verified
                        </span>
                      )}
                      {ev.status === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-medium">
                          Pending
                        </span>
                      )}
                      {ev.status === "Compromised" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-medium">
                          Alert
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => toggleExpand(ev.eventId)}
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition text-sm font-medium"
                      >
                        {expandedId === ev.eventId ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                        {expandedId === ev.eventId ? "Collapse" : "Details"}
                      </button>
                    </td>
                  </tr>
                  
                  {expandedId === ev.eventId && (
                    <tr className="bg-secondary/10">
                      <td colSpan={6} className="p-4 border-b border-border/50">
                        <div className="space-y-3 pl-8 max-w-4xl">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Linked Evidence Files</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ev.files && ev.files.length > 0 ? (
                              ev.files.map((f, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-md">
                                  <div className="flex items-center gap-3">
                                    <File className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-sm font-medium text-foreground truncate max-w-[200px]" title={f.fileName}>
                                      {f.fileName || 'Unknown File'}
                                    </span>
                                  </div>
                                  <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-secondary/50 border border-border/50" title={f.hash}>
                                    {f.hash && f.hash !== "none" ? `0x${f.hash.substring(0,10).toUpperCase()}...` : 'Pending Hash'}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground italic col-span-2">File metadata restricted or unavailable.</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredEvents.length === 0 && (
                <tr>
                   <td colSpan={6} className="text-center py-8 text-muted-foreground">
                     No events found matching your search.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards below table */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.slice(0, 2).map((ev) => (
          <div key={`summary-${ev.eventId}`} className="bg-card border border-border rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{ev.type}</h3>
                <p className="text-sm font-mono text-muted-foreground mt-1 text-primary">{ev.eventId}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                ev.status === "Verified" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                ev.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                "bg-red-500/10 text-red-500 border-red-500/20"
              }`}>
                {ev.status === "Compromised" ? "Alert" : ev.status}
              </span>
            </div>
            
            <div className="space-y-4 text-sm mt-6">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</p>
                <p className="text-foreground">{ev.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Timestamp</p>
                <p className="text-foreground font-mono">
                  {ev.timestampRaw > 10 ? new Date(ev.timestampRaw).toISOString().replace("T", " ").substring(0, 19) : "2024-01-15 20:30:42"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Linked Evidence</p>
                <p className="text-foreground">{ev.filesCount} file{ev.filesCount !== 1 && 's'} registered</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}