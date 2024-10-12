import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // logout
  const logout = () => {
    localStorage.clear("token");
    navigate("/");
    toast.success("Logged out!");
  };

  return (
    <>
      <header className="bg-green-700 text-white p-5 font-bold">
        <div className="flex justify-between">
          <div className="logo  text-2xl">Freelanco.in</div>
          <nav>
            <ul className="flex gap-3">
              {token ? (
                <>
                  <li>
                    <Link to={"/home/addProject"}>Add Project</Link>
                  </li>
                  <li>
                    <Link>Add file</Link>
                  </li>
                  <li>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}
