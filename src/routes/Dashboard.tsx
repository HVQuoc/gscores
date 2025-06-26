import Card from "../components/shared/Card"

const Dashboard = () => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="my-2">Welcome to the dashboard! Here you can find an overview of your scores and reports.</p>
      <p className="my-2">Use the sidebar to navigate through different sections.</p>
      <p className="my-2">Explore the top scores, search for specific scores, and view detailed reports.</p>
    </Card>
  )
}

export default Dashboard
