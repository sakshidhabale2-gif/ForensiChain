import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
  Database,
  Brain,
  Eye,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ForensiChain
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition">
              Technology
            </a>
            <a href="#api" className="text-muted-foreground hover:text-foreground transition">
              API
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            From Evidence to{" "}
            <span className="text-primary">Verified Reality</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure, reconstruct, and validate digital evidence using forensic
            intelligence. Built for investigators who demand precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Try Demo
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                Enter Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground">
            The Problem
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Modern forensic investigations face critical challenges
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: "Disconnected CCTV Footage",
                description:
                  "Multiple sources, different timestamps, no synchronization",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "No Unified Timeline",
                description:
                  "Evidence scattered across systems, impossible to correlate",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Evidence Tampering Risks",
                description:
                  "No cryptographic proof of integrity, chain of custody gaps",
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Misleading Scenarios",
                description:
                  "Reconstructions without feasibility validation, impossible timelines",
              },
            ].map((problem, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="text-danger mb-3 group-hover:text-primary transition">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            The ForensiChain Solution
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-12">
            {[
              { step: "1", label: "Capture", icon: <Database /> },
              { step: "2", label: "Register Event", icon: <Shield /> },
              { step: "3", label: "Secure", icon: <Lock /> },
              { step: "4", label: "Reconstruct", icon: <Clock /> },
              { step: "5", label: "Validate", icon: <CheckCircle2 /> },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 md:gap-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-2">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block w-8 h-0.5 bg-primary/50 mx-2"></div>
                )}
                {idx < 4 && idx !== 3 && (
                  <div className="md:hidden w-0.5 h-8 bg-primary/50 mx-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground">
            Core Features
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Enterprise-grade forensic investigation tools
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Database className="w-8 h-8" />,
                title: "Event Registry",
                description: "Organize evidence into structured, linked events",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Timeline Reconstruction",
                description: "Multi-source synchronization and visualization",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Scenario Feasibility",
                description: "Physics-based validation of reconstructed events",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Blockchain Integrity",
                description:
                  "Cryptographic proof of evidence authenticity and chain",
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Trust Intelligence",
                description: "Risk scoring and evidence reliability metrics",
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Forensic Intelligence Lab",
                description: "AI-powered analysis and anomaly detection",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="text-primary mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            Technology Architecture
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Integrity Layer",
                description:
                  "Evidence hashing, blockchain storage, tamper detection",
              },
              {
                title: "Event Layer",
                description:
                  "Event-based evidence organization, multi-file linking",
              },
              {
                title: "Reconstruction Layer",
                description: "Timeline generation, multi-source synchronization",
              },
              {
                title: "Scenario Feasibility Layer",
                description:
                  "Physics-based validation, impossibility detection",
              },
              {
                title: "Intelligence Layer",
                description:
                  "AI-powered anomaly detection, risk prediction, insights",
              },
            ].map((layer, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border border-primary/30 border-l-4 border-l-primary"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {layer.title}
                </h3>
                <p className="text-muted-foreground">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            API Endpoints
          </h2>

          <div className="space-y-4">
            {[
              { endpoint: "POST /api/register-event", desc: "Register a new evidence event" },
              { endpoint: "POST /api/upload-evidence", desc: "Upload and hash evidence files" },
              { endpoint: "GET /api/get-timeline", desc: "Retrieve reconstructed timeline" },
              { endpoint: "POST /api/check-feasibility", desc: "Validate scenario feasibility" },
              { endpoint: "POST /api/verify-hash", desc: "Verify evidence integrity" },
            ].map((api, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-card border border-border hover:bg-secondary transition"
              >
                <code className="text-primary font-semibold">
                  {api.endpoint}
                </code>
                <p className="text-muted-foreground text-sm mt-1">
                  {api.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Investigation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Access the ForensiChain dashboard and start securing evidence today
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2024 ForensiChain. Advanced Forensic Intelligence Platform.</p>
        </div>
      </footer>
    </div>
  );
}
