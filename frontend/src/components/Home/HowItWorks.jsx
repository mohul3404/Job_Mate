import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const HowItWorks = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  return (
    <div className="howitworks">
      <div className="container">
        <h3>How Career Connect Works !</h3>

        <div className="banner">
          
          {/* Create Account */}
          <div
            className="card"
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

          {/* Find / Post Job */}
          <div
            className="card"
            onClick={() =>
              navigate(user?.role === "Employer" ? "/post/job" : "/jobs")
            }
            style={{ cursor: "pointer" }}
          >
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

          {/* Apply / Recruit */}
          <div
            className="card"
            onClick={() => navigate("/jobs")}
            style={{ cursor: "pointer" }}
          >
            <IoMdSend />
            <p>Apply For Job/Recruit Suitable Candidates</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HowItWorks;