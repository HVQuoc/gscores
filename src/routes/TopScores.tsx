import useSWR from "swr";
import axiosClient from "../lib/axios-client";
import Card from "../components/shared/Card";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

const TopScores = () => {
  const { data, error, isLoading } = useSWR(
    "/api/reports/score-level/group",
    fetcher
  );

  return (
    <div className="w-full mx-auto mt-8">
      <Card>
        <h2 className="text-2xl font-bold mb-4">Top 10 Scores of Group A</h2>
        {isLoading && (
          <div className="flex justify-center gap-2">
            <p className="text-gray-800">Loading...</p>
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="text-red-600">Failed to load top scores.</div>
        )}
        {data && (
          <div className="overflow-x-auto">
            <table className="px-2 min-w-full border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">SBD</th>
                  <th className="px-3 py-2 text-left">Total Score</th>
                  <th className="px-3 py-2 text-left">Subjects</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, idx: number) => (
                  <tr key={item.sbd} className="border-t">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2 font-mono">{item.sbd}</td>
                    <td className="px-3 py-2 font-semibold">
                      {item.total_score}
                    </td>
                    <td className="px-3 py-2">
                      <ul>
                        {Object.entries(item.subject_scores).map(
                          ([subject, score]) => (
                            <li key={subject}>
                              <span className="font-medium">{subject}:</span>{" "}
                              {String(score)}
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TopScores;
