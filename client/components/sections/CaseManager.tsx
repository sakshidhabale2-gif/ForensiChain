import React from "react";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseManager() {
  const cases = [
    {
      id: "C-001",
      name: "Office Theft Case",
      status: "Active",
      evidenceCount: 12,
      lastUpdated: "2 hours ago",
      statusColor: "text-safe",
    },
    {
      id: "C-002",
      name: "Warehouse Incident",
      status: "Verified",
      evidenceCount: 8,
      lastUpdated: "1 day ago",
      statusColor: "text-safe",
    },
    {
      id: "C-003",
      name: "Parking Lot Investigation",
      status: "Under Review",
      evidenceCount: 15,
      lastUpdated: "3 hours ago",
      statusColor: "text-warning",
    },
    {
      id: "C-004",
      name: "Data Center Breach",
      status: "Active",
      evidenceCount: 20,
      lastUpdated: "30 minutes ago",
      statusColor: "text-danger",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Case Manager
          </h1>
          <p className="text-muted-foreground">
            Manage and track investigation cases
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          + New Case
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Case
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Evidence
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="border-b border-border hover:bg-secondary/50 transition"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    <div>
                      <p className="font-semibold">{caseItem.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary ${caseItem.statusColor}`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {caseItem.evidenceCount} files
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {caseItem.lastUpdated}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-primary hover:text-primary/80 transition inline-flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}