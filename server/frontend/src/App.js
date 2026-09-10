import LoginPanel from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Dealer from "./components/Dealers/Dealer";
import Dealers from './components/Dealers/Dealers';
import PostReview from "./components/Dealers/PostReview";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dealers" replace />} />
        <Route path="/login" element={<LoginPanel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/dealer/:id" element={<Dealer />} />
        <Route path="/postreview/:id" element={<PostReview />} />
      </Routes>
    </div>
  );
}
export default App;
