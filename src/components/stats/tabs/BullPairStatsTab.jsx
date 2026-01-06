import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, TrendingUp, Zap } from "lucide-react";
import StatCard from "../StatCard";
import DetailsSection from "../DetailsSection";

export default function BullPairStatsTab({ stats = [] }) {
  const highlights = useMemo(() => {
    if (!stats.length) return null;

    const sortedByWinRate = [...stats].sort((a, b) => b.winRate - a.winRate);
    const sortedByWins = [...stats].sort((a, b) => b.totalWins - a.totalWins);
    const sortedByDistance = [...stats].sort((a, b) => (b.maxDistance || 0) - (a.maxDistance || 0));

    return {
      bestWinRate: sortedByWinRate[0],
      mostWins: sortedByWins[0],
      bestDistance: sortedByDistance[0],
    };
  }, [stats]);

  const chartData = useMemo(() => {
    // Top 10 by Win Rate for the chart to avoid clutter
    return [...stats]
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 10)
      .map((s) => ({
        name: s.bullPairName,
        winRate: s.winRate,
        wins: s.totalWins,
      }));
  }, [stats]);

  if (!stats.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No data available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights?.bestWinRate && (
          <StatCard
            title="Highest Win Rate"
            value={`${highlights.bestWinRate.winRate}%`}
            subValue={highlights.bestWinRate.bullPairName}
            icon={TrendingUp}
            color="emerald"
          />
        )}
        {highlights?.mostWins && (
          <StatCard
            title="Most Wins"
            value={highlights.mostWins.totalWins}
            subValue={highlights.mostWins.bullPairName}
            icon={Trophy}
            color="amber"
          />
        )}
        {highlights?.bestDistance && (
          <StatCard
            title="Max Distance"
            value={`${highlights.bestDistance.maxDistance}m`}
            subValue={highlights.bestDistance.bullPairName}
            icon={Zap}
            color="blue"
          />
        )}
      </div>

      {/* Primary Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Top 10 Bull Pairs by Win Rate
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="winRate" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                name="Win Rate %"
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details Table */}
      <DetailsSection title="Detailed Statistics">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BullPair</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plays</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Dist.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stats.map((stat, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.bullPairName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{stat.winRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.totalWins}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.totalPlays}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.maxDistance}m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{stat.totalPrizeWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DetailsSection>
    </div>
  );
}
