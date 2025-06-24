import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <main className="font-rubik">
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </main>
  )
}

export default Dashboard
