import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Pelanggaran from "./pages/Pelanggaran";
import User from "./pages/User";
import Siswa from "./pages/Siswa";
import PelanggaranSiswa from "./pages/PelanggaranSiswa";
import ListPelanggaranSiswa from "./pages/ListPelanggaranSiswa";

export default function App(){
  return(
    <BrowserRouter>
    
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/pelanggaran" element={<Pelanggaran />} />
      <Route path="/user" element={<User />} />
      <Route path="/siswa" element={<Siswa />} />
      <Route path="/pelanggaranSiswa" element={<PelanggaranSiswa />} />
      <Route path="/listPelanggaranSiswa" element={<ListPelanggaranSiswa />} />
    </Routes>
    </BrowserRouter>
  )
}