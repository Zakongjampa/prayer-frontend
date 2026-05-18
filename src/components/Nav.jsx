import { User } from "lucide-react";
import Login, { unsetLocalStorage } from "./Login";
import { Link } from "react-router-dom";

export default function Nav() {
  let handleLogOut = () => {
    unsetLocalStorage();
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand fs-1" href="">
          ཞལ་འདོན་དཔེ་ཆ།
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              <User size={24} color="white" />
              {localStorage.getItem("username") != null ? (
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
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
