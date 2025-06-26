import { useState } from "react";
import Card from "../components/shared/Card";

const SearchScores = () => {
  const [regNumber, setRegNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/scores/search?registrationNumber=${encodeURIComponent(regNumber)}`);
      if (!res.ok) throw new Error("No result found");
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-8">
      {/* Search Input Card */}
      <Card className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Search Scores</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={regNumber}
            onChange={e => setRegNumber(e.target.value)}
            placeholder="Enter registration number"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div className="text-red-600 mt-3">{error}</div>}
      </Card>
      {/* Result Card */}
      {(
        <Card className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Search Result</h2>
          <pre className="mb-0 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default SearchScores;