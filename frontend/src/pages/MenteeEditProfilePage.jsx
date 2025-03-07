import React, { useContext, useState } from "react";
import { MenteeContext } from "../contexts/MenteeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MenteeEditProfilePage() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { mentee, setMentee } = useContext(MenteeContext);
    const [name, setName] = useState(mentee.name);
    const email= mentee.email;
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [interests, setInterests] = useState(mentee.interests.join(", "));
    const [yearsOfExperience, setYearsOfExperience] = useState(mentee.yearsOfExperience);
    const highestDegreeInstitute = mentee.highestDegree.institute;
    const highestDegreeName = mentee.highestDegree.degreeName;
    const highestDegreeCompletionYear = mentee.highestDegree.completionYear;
    const otherDegrees = mentee.otherDegrees || [];
    const [newDegrees, setNewDegrees] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const handleAddDegree = () => {
        setNewDegrees([
            ...newDegrees,
            { institute: "", degreeName: "", completionYear: "" },
        ]);
    };

    const handleNewDegreeChange = (index, field, value) => {
        const updatedDegrees = newDegrees.map((degree, i) =>
            i === index ? { ...degree, [field]: value } : degree
        );
        setNewDegrees(updatedDegrees);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const ineterestArray = interests.split(",").map((item) => item.trim());
        const otherDegreesArray = [...otherDegrees, ...newDegrees];        
        
        const updatedData = {
            currentPassword,
        }
        if(name) updatedData.name = name;
        if(newPassword) updatedData.newPassword = newPassword;
        if(otherDegreesArray) updatedData.otherDegrees = otherDegreesArray;
        if(ineterestArray) updatedData.interests = ineterestArray;
        if(yearsOfExperience) updatedData.yearsOfExperience = yearsOfExperience;        
        // console.log("updated data", updatedData);

        
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/mentee/update-profile`, 
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            
            if(response.status === 200){
                // console.log(response);
                alert("Profile Updated successfully!");
                setMentee(response.data.mentee);
                navigate("/mentee-dashboard/profile");
            }            
        } catch (error) {
            console.log("Error updating mentee profile: ", error);
            alert(`Error: ${error}`);
        }
    }



    return (
        <div className="max-w-2xl mx-auto px-4 py-14 bg-gray-900 text-white rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl lg:text-2xl text-center font-semibold mb-4">Edit Profile</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-xs sm:text-base md:text-lg font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-xs sm:text-base md:text-lg w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-xs sm:text-base md:text-lg font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="text-xs sm:text-base md:text-lg w-full p-2 mt-1 border border-gray-700 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Experience Field */}
                <div>
                    <label className="block text-xs sm:text-base md:text-lg font-medium">Years of Experience</label>
                    <input
                        type="number"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="text-xs sm:text-base md:text-lg w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter experience in years"
                        min="0"
                    />
                </div>

                {/* Interests Field */}
                <div>
                    <label className="block text-xs sm:text-base md:text-lg font-medium">Interests</label>
                    <input
                        type="text"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        className="text-xs sm:text-base md:text-lg w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="E.g., Web Development, AI, Design"
                        required
                    />
                </div>

                {/* Highest Education Degree */}
                <div>
                    <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-2">Highest Education Degree</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            disabled
                            className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                            type="text"
                            value={highestDegreeInstitute}
                            placeholder="Institute Name"
                            required
                        />
                        <input
                            disabled
                            className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                            type="text"
                            value={highestDegreeName}
                            placeholder="Degree Name"
                            required
                        />
                        <input
                            disabled
                            className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                            type="number"
                            value={highestDegreeCompletionYear}
                            placeholder="Completion Year"
                            required
                        />
                    </div>
                </div>

                {/* Other Degrees */}
                <div>
                    <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-2">Other Degrees</h3>
                    {otherDegrees.map((degree, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                value={degree.institute}
                                disabled
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Institute Name"
                                required
                            />
                            <input
                                value={degree.degreeName}
                                disabled
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Degree Name"
                                required
                            />
                            <input
                                value={degree.completionYear}
                                disabled
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-slate-700 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                placeholder="Completion Year"
                                required
                            />
                        </div>
                    ))}
                    {newDegrees.map((degree, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                value={degree.institute}
                                onChange={(e) => handleNewDegreeChange(index, "institute", e.target.value)}
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Institute Name"
                                required
                            />
                            <input
                                value={degree.degreeName}
                                onChange={(e) => handleNewDegreeChange(index, "degreeName", e.target.value)}
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Degree Name"
                                required
                            />
                            <input
                                value={degree.completionYear}
                                onChange={(e) => handleNewDegreeChange(index, "completionYear", e.target.value)}
                                className="text-xs sm:text-base md:text-lg px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                placeholder="Completion Year"
                                required
                            />
                        </div>
                    ))}
                    <button
                        className="text-xs sm:text-base md:text-lg bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2 transition"
                        type="button"
                        onClick={handleAddDegree}
                    >
                        Add New Degree
                    </button>
                </div>

                {/* Password Change Section */}
                <div>
                    <h3 className="text-xs sm:text-base md:text-lg font-semibold text-white mb-2">Change Password</h3>
                    <input
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type="password"
                        className="text-xs sm:text-base md:text-lg w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Current Password"
                        required
                    />
                    {showNewPassword && (
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            className="text-xs sm:text-base md:text-lg w-full px-3 py-2 mt-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="New Password"
                        />
                    )}
                    <button
                        type="button"
                        className={`text-xs sm:text-base md:text-lg w-full mt-2 p-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition ${showNewPassword ? "hidden" : "block"}`}
                        onClick={() => setShowNewPassword(true)}
                    >
                        Change Password
                    </button>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleUpdateProfile}
                    type="submit"
                    className="text-xs sm:text-base md:text-lg w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default MenteeEditProfilePage;
