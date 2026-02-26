import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      toast.success(data.message);
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={() => setShow(false)}>
            <img src="/careerconnect-white.png" alt="logo" />
          </Link>
        </div>

        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          </li>

          {/* Job Seeker Menu */}
          {user?.role === "Job Seeker" && (
            <>
              <li>
                <Link to="/jobs" onClick={() => setShow(false)}>ALL JOBS</Link>
              </li>
              <li>
                <Link to="/applications/me" onClick={() => setShow(false)}>
                  MY APPLICATIONS
                </Link>
              </li>
            </>
          )}

          {/* Employer Menu */}
          {user?.role === "Employer" && (
            <>
              <li>
                <Link to="/post/job" onClick={() => setShow(false)}>
                  POST JOB
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>
                  MY JOBS
                </Link>
              </li>
              <li>
                <Link to="/applications/me" onClick={() => setShow(false)}>
                  APPLICANTS
                </Link>
              </li>
            </>
          )}

          {isAuthorized && (
            <button onClick={handleLogout}>LOGOUT</button>
          )}
        </ul>

        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;