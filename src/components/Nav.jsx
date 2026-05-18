import { User } from "lucide-react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { unsetLocalStorage } from "../Tool";

export default function Nav({ userId, setUserId }) {
  let handleLogOut = () => {
    unsetLocalStorage();
    setUserId(null);
  };
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand fs-1" href="">
          ཞལ་འདོན་དཔེ་ཆ།
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <User size={24} color="white" />
            {userId != null ? (
              <>
                {localStorage.getItem("firstname") +
                  localStorage.getItem("lastname")}
                <button
                  className="btn btn-danger m-3"
                  onClick={() => handleLogOut()}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-primary m-4" to="/login">
                  Login
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
