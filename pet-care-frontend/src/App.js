import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Travel from "./components/Travel";
import Watch from "./components/Watch";
import Read from "./components/Read";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import PetManager from "./components/PetManager"; // For CRUD
import ArticleEditor from "./components/ArticleEditor"; // For writing articles
import AIHealth from "./components/AIHealth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/read" element={<Read />} />
        <Route path="/contact" element={<Contact />} />      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/pets" element={<PetManager />} />
        <Route path="/dashboard/articles" element={<ArticleEditor />} />
        <Route path="/dashboard/ai-health" element={<AIHealth />} />
      </Routes>
    </Router>
  );
}

export default App;