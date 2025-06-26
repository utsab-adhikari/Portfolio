"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Hireme = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    category: "",
    contact: "",
    noOfEmployees: "",
    description: "",
    source: "",
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `/api/hireme`, // Change this to your actual API endpoint
        formData
      );

      toast.success(res.data.message || "Request sent successfully!");

      // Reset form after submit
      setFormData({
        companyName: "",
        address: "",
        email: "",
        category: "",
        contact: "",
        noOfEmployees: "",
        description: "",
        source: "",
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <h2
          className="text-center font-bold text-indigo-700 mb-6"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          }}
        >
          {formData.category} Offer Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name / Your Name"
            value={formData.companyName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium">Select Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select an option</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Remote">Remote</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <input
            type="number"
            name="noOfEmployees"
            placeholder="Number of Employees"
            value={formData.noOfEmployees}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="sm:col-span-2">
            <textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium">How did you find me?</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select an option</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="facebook">Facebook</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2 bg-indigo-100 p-4 border-l-4 border-indigo-500">
            <h3 className="font-semibold text-indigo-700 mb-2">
              Why you should hire me?
            </h3>
            <p className="text-gray-800">
              I bring a solid foundation in full-stack development, driven by a
              desire for continual growth and excellence. With a proactive
              approach, adaptability to new challenges, and clear communication
              skills, I thrive in collaborative environments. I’m dedicated to
              delivering clean, scalable solutions that align with project
              goals, making me a valuable addition to your team.
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded font-medium hover:bg-indigo-700 transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hireme;
