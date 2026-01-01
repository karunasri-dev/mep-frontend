import { useState } from "react";
import { Trophy } from "lucide-react";
import ChampionForm from "../components/ChampionShip/ChampionForm";
import ChampionCard from "../components/ChampionShip/ChampionCard";
import Modal from "../components/ChampionShip/Modal";

export default function ChampionManagement() {
  const [champions, setChampions] = useState([
    {
      id: "1",
      eventId: "1",
      eventName: "Monsoon Bull Race 2024",
      eventDate: "2024-08-15",
      winnerName: "Prakash Shetty",
      bullName: "Thunderbolt",
      raceTime: "2:45.32",
      prizeAmount: "₹5,00,000",
      notes: "Record-breaking performance in challenging conditions",
    },
  ]);

  const [completedEvents] = useState([
    { id: "1", name: "Monsoon Bull Race 2024", date: "2024-08-15" },
    { id: "3", name: "Coastal Championship 2024", date: "2024-09-20" },
  ]);

  const [editingChampion, setEditingChampion] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = () => {
    setEditingChampion(null);
    setIsFormOpen(true);
  };

  const handleEdit = (champion) => {
    setEditingChampion(champion);
    setIsFormOpen(true);
  };

  const handleSave = (data) => {
    const existingEvent = completedEvents.find((e) => e.id === data.eventId);
    if (!existingEvent) return;

    const payload = {
      ...data,
      eventName: existingEvent.name,
      eventDate: existingEvent.date,
    };

    if (editingChampion) {
      setChampions(
        champions.map((c) => (c.id === editingChampion.id ? payload : c))
      );
    } else {
      setChampions([...champions, { ...payload, id: Date.now().toString() }]);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 font-medium mb-2">
              Champions & Winners
            </h1>
            <p className="text-stone-600">
              Update champion details for completed races
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm font-medium"
          >
            <Trophy className="w-5 h-5" />
            Add Champion
          </button>
        </div>

        {/* Modal + Form */}
        {isFormOpen && (
          <Modal
            title={editingChampion ? "Edit Champion" : "Add Champion"}
            onClose={() => setIsFormOpen(false)}
          >
            <ChampionForm
              completedEvents={completedEvents}
              initialData={editingChampion}
              onSave={handleSave}
              onCancel={() => setIsFormOpen(false)}
            />
          </Modal>
        )}

        {/* Champion List */}
        <div className="space-y-6">
          {champions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
              <p className="text-stone-500 font-medium">
                No champions recorded yet. Add champion details for completed races.
              </p>
            </div>
          ) : (
            champions.map((champion) => (
              <ChampionCard
                key={champion.id}
                champion={champion}
                onEdit={() => handleEdit(champion)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
