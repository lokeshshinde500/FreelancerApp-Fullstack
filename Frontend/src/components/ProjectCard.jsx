import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProjectCard = ({ project }) => {
  const token = localStorage.getItem("token");

  // Destructure project properties
  const {
    title,
    description,
    deadline,
    payment: initialPayment,
    status,
  } = project;

  // State to manage payment status
  const [payment, setPayment] = useState(initialPayment);

  // Format date to local date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Make payment function
  const makePayment = async (id) => {
    try {
      const response = await axios.patch(
        `https://freelancerapp-yfd1.onrender.com/api/project/${id}/payment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayment("paid"); // Update payment status
      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.log(error);
      toast.warn(error.response?.data?.message || "Payment failed"); // Show error message
    }
  };

  return (
    <div className="bg-green-100 shadow-lg rounded-lg p-6 m-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Deadline: {formatDate(deadline)}</p>
        </div>
        <div className="flex items-center gap-2 text-white">
          {/* Status Badge */}
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "active" ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {status}
          </span>

          {/* Payment Button */}
          <button
            className={`px-2 py-1 rounded-full text-xs ${
              payment === "not paid" ? "bg-red-400" : "bg-green-400"
            }`}
            onClick={() => makePayment(project._id)}
          >
            {payment}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
