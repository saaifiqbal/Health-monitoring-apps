import "./App.css";
import FirebaseData from "./data/FirebaseData";
import RealtimeData from "./pages/dashboard";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Hello, Tailwind CSS!</h1>
      <RealtimeData />
      <FirebaseData/>
    </div>
  );
}

export default App;
