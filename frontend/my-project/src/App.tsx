import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import HallOfKnights from "./HallOfKnights";
import Organizers from "./Organizers";
import { VirtuesPage } from "./VirtuesPage";
import Partnership from "./Partnership";



export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/virtues" element={<VirtuesPage />} />
        <Route path="/knights" element={<HallOfKnights />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/organizers" element={<Organizers />} />
      </Routes>
      
    </>
  );
}