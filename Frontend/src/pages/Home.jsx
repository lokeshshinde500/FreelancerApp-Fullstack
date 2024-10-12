import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const token = localStorage.getItem("token");
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://freelancerapp-yfd1.onrender.com/api/project",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.myProjects);
      setMyProjects(response.data.myProjects);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // download csv
  const downloadCsv = async () => {
    try {
      const response = await axios.get(
        "https://freelancerapp-yfd1.onrender.com/api/project/download/bulk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', 
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'projectData.csv');
  
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while downloading the file.");
      }
    }
  };
  

  return (
    <>
      <section className="section-home">
        <div className="container mx-auto px-5">
          <button
            className="button bg-green-500 text-white p-2 rounded-sm mt-2 hover:bg-green-600 transition"
            onClick={downloadCsv}
          >
            Download csv file
          </button>
          <div className="flex flex-col gap-1">
            {myProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
