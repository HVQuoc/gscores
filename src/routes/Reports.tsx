import { useState } from "react";
import { useSubjects } from "../hooks/useSubjects";
import useSWR from "swr";
import axiosClient from "../lib/axios-client";
import Card from "../components/shared/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const Reports = () => {
  const {
    subjects,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useSubjects();
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  // Fetch report data when a subject is selected
  const {
    data: report,
    isLoading: reportLoading,
    error: reportError,
  } = useSWR(
    selectedSubject ? `/api/reports/score-level/${selectedSubject}` : null,
    fetcher
  );

  // Prepare chart data
  const chartData = report
    ? Object.entries(report.score_levels).map(([level, value]) => ({
        level,
        value,
      }))
    : [];

  return (
    <div className="w-full mx-auto mt-8">
      <Card>
        <h2 className="text-xl font-semibold mb-4">Score Level Report</h2>

        {/* Subject Select */}
        <div className="mb-6 max-w-xl">
          <label className="block mb-2 font-medium">Select Subject</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={subjectsLoading}
          >
            <option value="">-Choose a subject-</option>
            {subjects &&
              subjects.map((sub: any) => (
                <option key={sub.code} value={sub.code}>
                  {sub.name}
                </option>
              ))}
          </select>
          {subjectsError && (
            <div className="text-red-600 mt-2">Failed to load subjects.</div>
          )}
        </div>
        {/* Chart */}
        {reportLoading && (
          <div className="flex gap-2">
            <p className="text-center text-gray-800">Loading chart...</p>
            <LoadingSpinner />
          </div>
        )}
        {reportError && (
          <div className="text-red-600">Failed to load report data.</div>
        )}
        {chartData.length > 0 && (
          // <div className="flex justify-center">
          <div className="max-w-xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6366f1" name="Number of Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          // </div>
        )}
        {!reportLoading && selectedSubject && chartData.length === 0 && (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </Card>
    </div>
  );
};

export default Reports;
