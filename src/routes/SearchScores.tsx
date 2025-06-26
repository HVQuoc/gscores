import { useState } from "react";
import Card from "../components/shared/Card";
import { useSearchScore } from "../hooks/useSearchScore";
import { useSubjects } from "../hooks/useSubjects";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const SearchScores = () => {
  const [regNumber, setRegNumber] = useState("");
  const [search, setSearch] = useState<string | null>(null);
  const { scores, error, isLoading } = useSearchScore(search);
  const { subjects, error: subjectsError } = useSubjects();

  const scoreMap = scores.reduce((map: Record<string, number>, s: any) => {
    map[s.subject_code] = s.score;
    return map;
  }, {});
  console.log("Score Map:", scoreMap);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim() === "") {
      setSearch(null);
      return;
    }
    setSearch(regNumber.trim());
  };

  if (error) {
    return (
      <div className="w-full mx-auto mt-8">
        <Card className="bg-red-100 text-red-700 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{error.message}</p>
          <p>Try again.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-8">
      {/* Search Input Card */}
      <Card className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Scores</h2>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <input
            type="text"
            value={regNumber}
            onChange={(e) => {
              setRegNumber(e.target.value);
              setSearch(null); // Reset search when input changes
            }}
            placeholder="Enter registration number"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-800 text-white w-32 h-11 px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              "Search"
            )}
          </button>
        </form>
        {error && <div className="text-red-600 mt-3">{error}</div>}
      </Card>

      {/* Result Table */}
      {scores && subjects?.length > 0 && (
        <div className="my-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Search Result</h2>
            {subjectsError && (
              <div className="text-red-600 mb-4">
                Error loading subjects: {subjectsError.message}
              </div>
            )}
            {subjects.length === 0 && (
              <div className="text-gray-600 mb-4">No subjects found.</div>
            )}

            {/* Desktop Table */}
            {scores.length === 0 ? (
              <div className="text-gray-600 mb-4">
                Detail view of the search here.
              </div>
            ) : (
              <div>
                <div className="overflow-x-auto hidden md:block">
                  <table className="min-w-full text-left border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">SBD</th>
                        {subjects.map((subj: any) => (
                          <th
                            key={subj.code}
                            className="border px-4 py-2 capitalize"
                          >
                            {subj.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">{regNumber}</td>
                        {subjects.map((subj: any) => (
                          <td
                            key={subj.code}
                            className="border text-center px-4 py-2"
                          >
                            {scoreMap[subj.code] !== undefined
                              ? scoreMap[subj.code]
                              : "-"}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden mb-">
                  <div className="mb-2">
                    <strong>SBD:</strong> {regNumber}
                  </div>
                  {subjects.map((subj: any) => (
                    <div
                      key={subj.code}
                      className="flex justify-between border-b py-2 text-sm"
                    >
                      <span className="font-medium capitalize">
                        {subj.name}
                      </span>
                      <span>
                        {scoreMap[subj.code] !== undefined
                          ? scoreMap[subj.code]
                          : "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchScores;
