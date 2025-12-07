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
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-gray-900 mb-2">Champions & Winners</h2>
          <p className="text-gray-600">
            Update champion details for completed races
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
          <div className="text-center py-12 text-gray-500">
            No champions recorded yet. Add champion details for completed races.
          </div>
        ) : (
          champions.map((c) => (
            <ChampionCard
              key={c.id}
              champion={c}
              onEdit={() => handleEdit(c)}
            />
          ))
        )}
      </div>
    </div>
  );
}
