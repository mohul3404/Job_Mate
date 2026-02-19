import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");

    if (!file) return setResume(null);

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PNG, JPG, WEBP allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be under 2MB");
      return;
    }

    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) return toast.error("Upload resume");

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || user?.role === "Employer") navigateTo("/");

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>

        <form onSubmit={handleApplication}>
          <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
          <textarea placeholder="Cover Letter" value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          {fileError && <p style={{color:"red"}}>{fileError}</p>}

          <button disabled={loading}>
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
