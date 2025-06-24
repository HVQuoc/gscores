import { BrowserRouter, Routes, Route } from "react-router";

import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./routes/Dashboard";
import SearchScores from "./routes/SearchScores";
import Reports from "./routes/Reports";
import TopScores from "./routes/TopScores";

export const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="search-scores" element={<SearchScores />} />
          <Route path="reports" element={<Reports />} />
          <Route path="top-scores" element={<TopScores />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
