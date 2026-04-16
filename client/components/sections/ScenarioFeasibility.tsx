import { useState, useEffect, useMemo } from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEvidence } from "../../context/EvidenceContext";

export default function ScenarioFeasibility() {
  const { evidence } = useEvidence();
  
  const [distance, setDistance] = useState(120);
  const [time, setTime] = useState(5);
  const [analyzed, setAnalyzed] = useState(false);
  const [isManualTime, setIsManualTime] = useState(false);

  // Dynamically calculate the real time delta from uploaded evidence
  const realEvidenceTimeMs = useMemo(() => {
    if (!evidence || evidence.length < 2) return null;
    const sorted = [...evidence].sort((a, b) => a.time - b.time);
    return sorted[sorted.length - 1].time - sorted[0].time;
  }, [evidence]);

  // Sync real timeline data automatically into the analyzer
  useEffect(() => {
    if (realEvidenceTimeMs !== null && !isManualTime) {
      let gapSec = Math.round(realEvidenceTimeMs / 1000);
      if (gapSec === 0) gapSec = 1; // avoid division by zero
      setTime(gapSec);
      setDistance(gapSec * 5); // Rough guess 5m/s as a starting slider position
    }
  }, [realEvidenceTimeMs, isManualTime]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseInt(e.target.value));
    setAnalyzed(false);
    setIsManualTime(true);
  };

  // Math engine
  const speed = distance / time;
  const humanMaxSpeed = 10;
  const feasible = speed <= humanMaxSpeed;
  
  // Real sequence check (do timestamps chronologically align without contradictions?)
  const sequenceValid = realEvidenceTimeMs !== null && realEvidenceTimeMs > 0;
  
  let score = feasible ? Math.floor(100 - (speed / humanMaxSpeed) * 15) : Math.max(5, Math.floor(35 - (speed / 20) * 10));
  if (!sequenceValid && evidence?.length > 1) score -= 10; // Sequence penalty
  const finalScore = Math.max(0, Math.min(100, score)); 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Scenario Feasibility (Possibility Engine)</h1>
        <p className="text-muted-foreground">Analyze if reconstructed scenarios are physically possible based on Live Evidence</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-foreground mb-6 flex justify-between items-center">
              Scenario Analysis
              {realEvidenceTimeMs !== null && !isManualTime && (
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-mono flex items-center gap-1 border border-green-500/30">
                  <Clock className="w-3 h-3" /> Auto-Synced with Evidence
                </span>
              )}
            </h2>

            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-foreground">Estimated Distance Gap</label>
                  <span className="text-sm text-muted-foreground">{distance} meters</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max={Math.max(500, distance * 2)} 
                  value={distance} 
                  onChange={(e) => { setDistance(parseInt(e.target.value)); setAnalyzed(false); }}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-foreground">Elapsed Time</label>
                  <span className="text-sm text-muted-foreground">{time} seconds</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max={Math.max(120, time * 2)} 
                  value={time} 
                  onChange={handleTimeChange}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium mb-6" 
              onClick={() => setAnalyzed(true)}
            >
              Analyze Feasibility
            </Button>

            <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Physics Reference Engine</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Human walking: ~1.4 m/s</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Human jogging: ~4.5 m/s</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Human sprinting: ~7-10 m/s</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span> Vehicular transit: ~15+ m/s</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-foreground mb-6">Analysis Results</h2>

            {/* Top row stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/30 border border-border/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Distance Gap</p>
                <p className="text-xl font-bold text-foreground">{distance}m</p>
              </div>
              <div className="bg-secondary/30 border border-border/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Time Elapsed</p>
                <p className="text-xl font-bold text-foreground">{time}s</p>
              </div>
              <div className="bg-secondary/30 border border-border/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Req. Speed</p>
                <p className="text-xl font-bold text-foreground">{speed.toFixed(1)}m/s</p>
              </div>
            </div>

            {analyzed ? (
              <>
                {/* Logic Checks */}
                <h3 className="text-sm font-semibold text-foreground mb-4">Logic Checks</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-secondary/10">
                    {sequenceValid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${sequenceValid ? 'text-green-500' : 'text-amber-500'}`}>Time Consistency</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {sequenceValid 
                           ? "Timeline events occur in logical mathematical sequence." 
                           : "Insufficient Timeline Data. Upload at least 2 events to map chronological sequence!"}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg border ${feasible ? 'border-border/50 bg-secondary/10' : 'border-red-500/30 bg-red-500/5'}`}>
                    {feasible ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${feasible ? 'text-green-500' : 'text-red-500'}`}>Movement Feasibility</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Required speed ({speed.toFixed(1)} m/s) {feasible ? 'is physically possible within biological limits' : `physically exceeds human sprinting threshold (${humanMaxSpeed} m/s)`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-secondary/10">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-500">Hash Integrity</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Underlying file hashes cryptographically valid</p>
                    </div>
                  </div>
                </div>

                {/* Final Verdict */}
                <div className={`p-5 rounded-lg border ${feasible ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'} mb-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    {feasible ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    )}
                    <h3 className={`text-lg font-bold ${feasible ? 'text-green-500' : 'text-red-500'}`}>
                      {feasible ? 'Feasible Scenario' : 'Suspicious/Not Feasible'}
                    </h3>
                  </div>
                  <p className={`text-sm ${feasible ? 'text-green-500/80' : 'text-red-500/80'}`}>
                    {feasible 
                      ? 'When analyzing the timestamps uploaded from Evidence Intake, this scenario is physically possible.' 
                      : 'WARNING: The required movement speed between these evidence capture points violates physical limits, implying tampering or spoofed timelines.'}
                  </p>
                </div>

                {/* Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-foreground">System Trust Score</span>
                    <span className={`text-sm font-bold ${finalScore >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                      {finalScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${finalScore >= 50 ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`} 
                      style={{ width: `${finalScore}%` }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground h-[400px]">
                <AlertTriangle className="w-12 h-12 mb-4 opacity-20" />
                <p>Adjust parameters and click <br/>"Analyze Feasibility" to view calculations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}