import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import PrivateRoute from "./PrivateRoute";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {

  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  
  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    window.location.reload();
    navigate('/login')
  }


  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token]);


  return (
    <div className="bg-orange-300 h-[700px]">
      <header className="bg-orange-200 py-6 px-20">
        <nav className="h-full">
          <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold -ml-12"><span className="text-pink-700">Abdishakur</span> Notes</h3>
            <ul className="hidden md:flex space-x-6 -mr-16">
              <li>
                <Link to="/" className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">Home</Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/add" className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">
                      Add Note 
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleLogout()}
                      className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li>
                    <Link to="/login" className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-xl px-4 py-2 rounded-2xl border-purple-400 hover:border-b-2 text-pink-700">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<PrivateRoute />}>
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
        <Route path="/add" element={<PrivateRoute />}>
          <Route path="/add" element={<AddNote />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;