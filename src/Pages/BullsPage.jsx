// Bulls & Owners Page
import { ShimmerTable } from "../components/ShimmerEffect";

const BullsPage = ({ loading }) => {
  if (loading) return <ShimmerTable />;

  const bulls = [
    {
      name: "Rajasekhar",
      owner: "Venkat Rao",
      team: "RK Bulls",
      age: "5 years",
    },
    {
      name: "Shankar",
      owner: "Krishna Murthy",
      team: "BSR Bulls",
      age: "4 years",
    },
    {
      name: "Balaji",
      owner: "Ramesh Kumar",
      team: "PSK Bulls",
      age: "6 years",
    },
    {
      name: "Venkateswara",
      owner: "Suresh Babu",
      team: "RK Bulls",
      age: "3 years",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Bulls & Owners</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
          + Add Bull
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Bull Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bulls.map((bull, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {bull.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bull.owner}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bull.team}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {bull.age}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
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
};

export default BullsPage;
