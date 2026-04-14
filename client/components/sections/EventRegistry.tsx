import { useEffect, useState } from "react";

export default function EventRegistry() {
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvidence = async () => {
      const res = await fetch("http://localhost:5000/evidence");
      const data = await res.json();

      console.log("BACKEND DATA:", data);

      // 🔥 Convert backend → events
      const generatedEvents = data.flatMap((item: any, index: number) => {
        const baseId = `EV-${index + 1}`;

        return [
          {
            id: baseId,
            type: "Upload",
            time: new Date(item.time),
            file: item.fileName,
            status: item.status,
            location: "User Upload",
          },
          {
            id: `${baseId}-HASH`,
            type: "Hash Generated",
            time: new Date(item.time),
            file: item.fileName,
            status: item.status,
            location: "System",
          },
          {
            id: `${baseId}-STORE`,
            type: "Stored",
            time: new Date(item.time),
            file: item.fileName,
            status: "Stored",
            location: "Secure Storage",
          },
        ];
      });

      setEvents(generatedEvents);
    };

    fetchEvidence();
  }, []);

  const filteredEvents = events.filter((e) =>
    e.file.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Event Registry</h1>
      <p className="text-gray-400 mb-4">
        Real-time forensic event tracking
      </p>

      {/* 🔍 Search */}
      <input
        placeholder="Search events..."
        className="w-full p-3 bg-[#1e293b] rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 TABLE */}
      <div className="bg-[#0f172a] rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#1e293b]">
            <tr>
              <th className="p-3">Event ID</th>
              <th>Type</th>
              <th>Time</th>
              <th>Evidence</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((event, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="p-3 text-blue-400">{event.id}</td>
                <td>{event.type}</td>
                <td>{event.time.toLocaleTimeString()}</td>
                <td>📄 1 file</td>

                <td
                  className={
                    event.status === "Safe"
                      ? "text-green-400"
                      : event.status === "Compromised"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {event.status}
                </td>

                <td className="text-blue-400 cursor-pointer">
                  👁 View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 EVENT CARDS */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredEvents.slice(0, 3).map((event, i) => (
          <div key={i} className="bg-[#1e293b] p-4 rounded-lg">
            <p className="font-semibold">{event.type}</p>
            <p className="text-sm text-gray-400">{event.id}</p>

            <p className="mt-2 text-sm">
              Time: {event.time.toLocaleString()}
            </p>

            <p className="text-sm text-gray-400">
              Location: {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}