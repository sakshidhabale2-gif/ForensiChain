import { AlertTriangle, TrendingUp } from "lucide-react";
import { useEvidence } from "../../context/EvidenceContext";
import { useMemo } from "react";

export default function RiskAlertCenter() {
  const { evidence } = useEvidence();

  const safeEvidence = Array.isArray(evidence) ? evidence : [];

  // Re-calculate the actual arrays into Risk alerts based on ACTUAL logic
  const { alerts, recommendations, aggregateMetrics } = useMemo(() => {
    const genAlerts: any[] = [];
    const recs: Set<string> = new Set();
    let hasHigh = false;
    let hasMed = false;
    let lowestTrust = 100;
    let worstTimeGap = 0;

    if (safeEvidence.length === 0) {
      return { alerts: [], recommendations: [], aggregateMetrics: { caseRisk: "LOW", evidenceReliability: "HIGH", timelineConfidence: "HIGH" } };
    }

    // Sort evidence chronologically
    const sorted = [...safeEvidence].sort((a, b) => a.time - b.time);

    sorted.forEach((item, index) => {
      const isVerified = item.status !== "Compromised";
      const fileName = item.fileName;
      // Synthesize trustScore out of verification
      const trustScore = isVerified ? 90 : 35;
      if (trustScore < lowestTrust) lowestTrust = trustScore;

      // 1. Tampering
      if (!isVerified) {
        genAlerts.push({
          severity: "HIGH",
          title: "Tampering Detected",
          description: `${fileName} shows signs of hash mismatch or corruption`,
          timestamp: new Date(item.time).toLocaleString(),
        });
        recs.add(`Investigate cryptographic integrity on ${fileName}`);
        hasHigh = true;
      }

      // 2. Trust Score
      if (trustScore < 60) {
        genAlerts.push({
          severity: "MEDIUM",
          title: "Low Trust Score",
          description: `Device origin reliability below threshold (${trustScore}%)`,
          timestamp: new Date(item.time).toLocaleString(),
        });
        recs.add(`Cross-reference ${fileName} origin with secondary intelligence`);
        hasMed = true;
      }

      // Physics/Timeline Checks if there's a preceding event
      if (index > 0) {
        const prev = sorted[index - 1];
        const gapSeconds = (item.time - prev.time) / 1000;
        
        if (gapSeconds > worstTimeGap) worstTimeGap = gapSeconds;

        if (gapSeconds > 60) {
           genAlerts.push({
             severity: "MEDIUM",
             title: "Missing Timeline Data",
             description: `Gap of ${Math.round(gapSeconds)}s detected with no consecutive surveillance feed`,
             timestamp: new Date(item.time).toLocaleString(),
           });
           recs.add(`Request additional area footage for missing ${Math.round(gapSeconds)}s gap`);
           hasMed = true;
        }

        // Just an algorithmic test for impossible scenarios: extremely short gaps across different designated cameras
        if (gapSeconds > 0 && gapSeconds < 2 && item.eventGroup !== prev.eventGroup) {
           genAlerts.push({
             severity: "HIGH",
             title: "Impossible Scenario",
             description: `Movement across sectors detected in ${gapSeconds.toFixed(1)}s, exceeding physical human limits`,
             timestamp: new Date(item.time).toLocaleString(),
           });
           recs.add("Verify physics feasibility of tracking nodes");
           hasHigh = true;
        }
      }

      // Metadata log
      genAlerts.unshift({
        severity: "LOW",
        title: "Evidence Logged",
        description: `Secured chain of custody initiated for ${fileName}`,
        timestamp: new Date(item.time).toLocaleString(),
      });
    });

    const caseRisk = hasHigh ? "HIGH" : (hasMed ? "MEDIUM" : "LOW");
    const evidenceReliability = lowestTrust > 80 ? "HIGH" : (lowestTrust > 50 ? "MEDIUM" : "LOW");
    const timelineConfidence = worstTimeGap > 60 ? "LOW" : (worstTimeGap > 10 ? "MEDIUM" : "HIGH");

    // Add generic if none
    if (recs.size === 0) recs.add("Standard protocol observation");

    return { 
       alerts: genAlerts.reverse(), 
       recommendations: Array.from(recs), 
       aggregateMetrics: { caseRisk, evidenceReliability, timelineConfidence } 
    };

  }, [safeEvidence]);

  const highAlertCount = alerts.filter(a => a.severity === "HIGH").length;
  const mediumAlertCount = alerts.filter(a => a.severity === "MEDIUM").length;
  const lowAlertCount = alerts.filter(a => a.severity === "LOW").length;

  const getSeverityColors = (severity: string) => {
    switch(severity) {
      case "HIGH": return "border-red-500/50 bg-red-500/10 text-red-500";
      case "MEDIUM": return "border-yellow-500/50 bg-yellow-500/10 text-yellow-500";
      case "LOW": return "border-green-500/50 bg-green-500/10 text-green-500";
      default: return "border-border bg-card text-foreground";
    }
  };

  const getMetricProgressColor = (val: string) => {
    switch(val) {
      case "HIGH": return "bg-red-500";
      case "MEDIUM": return "bg-yellow-500";
      case "LOW": return "bg-green-500";
      default: return "bg-green-500";
    }
  };

  const getConfidenceLevelBar = (val: string) => {
    if (val === "HIGH") return "w-full";
    if (val === "MEDIUM") return "w-2/3";
    return "w-1/3";
  };

  if (alerts.length === 0) {
    return (
       <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Risk & Alert Center</h1>
            <p className="text-muted-foreground">Monitor investigation alerts and risk indicators</p>
          </div>
          <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-lg text-muted-foreground h-[400px]">
             <AlertTriangle className="w-12 h-12 mb-4 opacity-20" />
             <p>Awaiting Evidence. Secure feeds to initialize threat tracking.</p>
          </div>
       </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Risk & Alert Center</h1>
        <p className="text-muted-foreground">Monitor investigation alerts and risk indicators</p>
      </div>

      {/* COUNTERS */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-card border border-red-500/30 rounded-lg p-5">
          <p className="text-xs text-muted-foreground mb-2">High Severity</p>
          <p className="text-3xl font-bold text-red-500">{highAlertCount}</p>
        </div>

        <div className="bg-card border border-yellow-500/30 rounded-lg p-5">
          <p className="text-xs text-muted-foreground mb-2">Medium Severity</p>
          <p className="text-3xl font-bold text-yellow-500">{mediumAlertCount}</p>
        </div>

        <div className="bg-card border border-green-500/30 rounded-lg p-5">
          <p className="text-xs text-muted-foreground mb-2">Low Severity</p>
          <p className="text-3xl font-bold text-green-500">{lowAlertCount}</p>
        </div>
      </div>

      {/* ALERT FEED */}
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`border rounded-lg p-5 flex justify-between items-start gap-4 ${getSeverityColors(alert.severity).replace('text-', '').replace('bg-', 'bg-card border-l-4 ')}`}>
            <div className="flex items-start gap-4">
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${getSeverityColors(alert.severity).split(' ')[2]}`} />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-2">{alert.description}</p>
                <p className="text-xs text-muted-foreground/60">{alert.timestamp}</p>
              </div>
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary ${getSeverityColors(alert.severity).split(' ')[2]}`}>
               {alert.severity}
            </span>
          </div>
        ))}
      </div>

      {/* GLOBAL RISK ASSESSMENT */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Overall Risk Assessment</h2>

        <div className="space-y-6 max-w-3xl">
           <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-foreground">Case Risk Level</span>
                 <span className={getSeverityColors(aggregateMetrics.caseRisk).split(' ')[2]}>{aggregateMetrics.caseRisk}</span>
              </div>
              <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                 <div className={`${getMetricProgressColor(aggregateMetrics.caseRisk)} h-full rounded-full ${getConfidenceLevelBar(aggregateMetrics.caseRisk)} transition-all`}></div>
              </div>
           </div>

           <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-foreground">Evidence Reliability</span>
                 <span className={getSeverityColors(aggregateMetrics.evidenceReliability).split(' ')[2]}>{aggregateMetrics.evidenceReliability}</span>
              </div>
              <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                 <div className={`${getMetricProgressColor(aggregateMetrics.evidenceReliability)} h-full rounded-full ${getConfidenceLevelBar(aggregateMetrics.evidenceReliability === "HIGH" ? "LOW" : (aggregateMetrics.evidenceReliability === "LOW" ? "HIGH" : "MEDIUM"))} transition-all`}></div>
              </div>
           </div>

           <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                 <span className="text-foreground">Timeline Confidence</span>
                 <span className={getSeverityColors(aggregateMetrics.timelineConfidence).split(' ')[2]}>{aggregateMetrics.timelineConfidence}</span>
              </div>
              <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                 <div className={`${getMetricProgressColor(aggregateMetrics.timelineConfidence === "HIGH" ? "LOW" : "HIGH")} h-full rounded-full ${getConfidenceLevelBar(aggregateMetrics.timelineConfidence === "HIGH" ? "LOW" : (aggregateMetrics.timelineConfidence === "LOW" ? "HIGH" : "MEDIUM"))} transition-all`}></div>
              </div>
           </div>
        </div>

        <div className="mt-8 p-5 bg-secondary/30 border border-border/50 rounded-lg max-w-3xl">
           <h3 className="font-semibold text-sm text-foreground mb-3">Recommended Actions</h3>
           <ul className="space-y-2 text-sm text-muted-foreground">
             {recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 items-start tracking-wide">
                  <span className="text-primary mt-1 shadow-sm">•</span> {rec}
                </li>
             ))}
           </ul>
        </div>
      </div>

      {/* TREND GRAPH */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-sm text-foreground mb-4">Alert Trend</h3>
        <div className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded">
           <TrendingUp className="w-6 h-6 text-muted-foreground mb-2" />
           <p className="text-sm text-muted-foreground text-center">Alerts have increased by {highAlertCount + mediumAlertCount} in the current session</p>
           <p className="text-xs text-muted-foreground/50 mt-1">Currently: {alerts.length} active logs</p>
        </div>
      </div>
    </div>
  );
}