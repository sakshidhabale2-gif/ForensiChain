import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  FileText,
  Archive,
  LineChart,
  Zap,
  Lock,
  Database,
  CheckCircle2,
  Link2,
  TrendingUp,
  AlertTriangle,
  Brain,
} from "lucide-react";

// Import all section components
import CaseManager from "@/components/sections/CaseManager";
import EvidenceIntake from "@/components/sections/EvidenceIntake";
import EventRegistry from "@/components/sections/EventRegistry";
import TimelineReconstruction from "@/components/sections/TimelineReconstruction";
import ScenarioFeasibility from "@/components/sections/ScenarioFeasibility";
import BlockchainLedger from "@/components/sections/BlockchainLedger";
import StorageManagement from "@/components/sections/StorageManagement";
import VerificationCenter from "@/components/sections/VerificationCenter";
import ChainOfCustody from "@/components/sections/ChainOfCustody";
import TrustIntelligence from "@/components/sections/TrustIntelligence";
import RiskAlertCenter from "@/components/sections/RiskAlertCenter";
import ForensicIntelligenceLab from "@/components/sections/ForensicIntelligenceLab";

const SIDEBAR_ITEMS = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Case Manager",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Evidence Intake",
  },
  {
    icon: <Archive className="w-5 h-5" />,
    label: "Event Registry",
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    label: "Timeline Reconstruction",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Scenario Feasibility",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: "Blockchain Integrity Ledger",
  },
  {
    icon: <Database className="w-5 h-5" />,
    label: "Storage Management",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    label: "Verification Center",
  },
  {
    icon: <Link2 className="w-5 h-5" />,
    label: "Chain of Custody",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Trust Intelligence",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    label: "Risk & Alert Center",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    label: "Forensic Intelligence Lab",
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Case Manager");

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-foreground hover:bg-secondary rounded-lg p-2 transition"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground hidden sm:inline">
                ForensiChain
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 max-w-xl mx-4 hidden sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cases, evidence..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-muted-foreground hover:text-foreground relative p-2 rounded-lg hover:bg-secondary transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-secondary transition">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-border transition-all duration-300 z-30 ${
            sidebarOpen ? "w-64" : "w-20"
          } overflow-y-auto`}
        >
          <div className="p-4 space-y-2">
            {SIDEBAR_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSection(item.label);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  selectedSection === item.label
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          } ml-20`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Render appropriate section component */}
            <div className="max-w-6xl mx-auto">
              {selectedSection === "Case Manager" && <CaseManager />}
              {selectedSection === "Evidence Intake" && <EvidenceIntake />}
              {selectedSection === "Event Registry" && <EventRegistry />}
              {selectedSection === "Timeline Reconstruction" && (
                <TimelineReconstruction />
              )}
              {selectedSection === "Scenario Feasibility" && (
                <ScenarioFeasibility />
              )}
              {selectedSection === "Blockchain Integrity Ledger" && (
                <BlockchainLedger />
              )}
              {selectedSection === "Storage Management" && (
                <StorageManagement />
              )}
              {selectedSection === "Verification Center" && (
                <VerificationCenter />
              )}
              {selectedSection === "Chain of Custody" && <ChainOfCustody />}
              {selectedSection === "Trust Intelligence" && (
                <TrustIntelligence />
              )}
              {selectedSection === "Risk & Alert Center" && (
                <RiskAlertCenter />
              )}
              {selectedSection === "Forensic Intelligence Lab" && (
                <ForensicIntelligenceLab />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
