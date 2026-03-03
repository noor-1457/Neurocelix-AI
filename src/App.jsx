import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";

function App() {

  return (
    <div className="App">
      {/* Dashboard Layout with Sidebar + Topbar */}
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    </div>
  )
}

export default App
