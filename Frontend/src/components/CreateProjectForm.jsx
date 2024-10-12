import React, { useState } from "react";
import useFetchUrl from "../hooks/useFetchUrl";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //   handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://freelancerapp-yfd1.onrender.com/api/project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        status: "",
      });
      setLoading(false);
    }
  };

  //   handle csv uploads
  const handleCsv = async (e) => {
    e.preventDefault();
    console.log(csvFile);
    setLoading(true);
    if (csvFile.type != "text/csv") {
      setLoading(false);
      return toast.error("Only csv file allowed!");
    }

    try {
      const response = await axios.post(
        "https://freelancerapp-yfd1.onrender.com/api/project/upload/bulk",
        csvFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setCsvFile(null);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Project</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Project Title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Project Description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Please wait" : "Create Project"}
        </button>
        <div className="mt-1">
          <p className="text-center">OR</p>
          <div className="flex items-center">
            <input
              type="file"
              name="csvFile"
              onChange={(e) => {
                setCsvFile(e.target.files[0]);
              }}
            />
            <button
              type="submit"
              className="p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 text-sm"
              disabled={loading}
              onClick={handleCsv}
            >
              {loading ? "Please wait" : "upload csv"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
