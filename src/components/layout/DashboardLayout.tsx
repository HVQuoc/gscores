import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <main>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </main>
  )
}

export default Dashboard
