import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/getmyjobs`,
          { withCredentials: true }
        );

        setMyJobs(data.myJobs);
      } catch {
        toast.error("Failed to load jobs");
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized || user?.role !== "Employer") {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => setEditingMode(jobId);

  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );

      toast.success(data.message);
      setEditingMode(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );

      toast.success(data.message);
      setMyJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prev) =>
      prev.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>

        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <input
                    value={element.title}
                    disabled={editingMode !== element._id}
                    onChange={(e) =>
                      handleInputChange(element._id, "title", e.target.value)
                    }
                  />

                  <textarea
                    value={element.description}
                    disabled={editingMode !== element._id}
                    onChange={(e) =>
                      handleInputChange(element._id, "description", e.target.value)
                    }
                  />
                </div>

                <div className="button_wrapper">
                  {editingMode === element._id ? (
                    <>
                      <button onClick={() => handleUpdateJob(element._id)}>
                        <FaCheck />
                      </button>
                      <button onClick={handleDisableEdit}>
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEnableEdit(element._id)}>
                      Edit
                    </button>
                  )}

                  <button onClick={() => handleDeleteJob(element._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
