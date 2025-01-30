import React, { useContext } from 'react';
import { MenteeContext } from '../contexts/MenteeContext';
import { Link } from 'react-router-dom';

function MenteeProfilePage() {
  const { mentee } = useContext(MenteeContext);

  if (!mentee) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white rounded-lg shadow-lg">
      <h2 className="text-lg md:text-xl lg:text-2xl text-center font-semibold mb-6 border-b pb-2 border-gray-700">
        Mentee Profile
      </h2>
      
      <div className="flex justify-between">
        <Link to='/mentee-dashboard/profile/delete' className="px-3 py-1 text-xs sm:text-base md:text-lg bg-red-600 hover:bg-red-700 text-white rounded-md transition">
          Delete Profile
        </Link>
        <Link to='/mentee-dashboard/profile/edit' className="px-3 py-1 text-xs sm:text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
          Edit Profile
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs sm:text-base md:text-lg"><strong>Name:</strong> {mentee.name}</p>
        <p className="text-xs sm:text-base md:text-lg"><strong>Email:</strong> {mentee.email}</p>
        <p className="text-xs sm:text-base md:text-lg"><strong>Years of Experience:</strong> {mentee.yearsOfExperience || "N/A"}</p>
      </div>

      <h3 className="text-base md:text-lg font-bold mt-6 border-b pb-2 border-gray-700">
        Interests
      </h3>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        {mentee.interests.map((interest, index) => (
          <li className='text-xs sm:text-base md:text-lg' key={index}>{interest}</li>
        ))}
      </ul>

      <h3 className="text-base md:text-lg font-bold mt-6 border-b pb-2 border-gray-700">
        Highest Degree
      </h3>
      <div className="mt-3 space-y-1">
        <p className="text-xs sm:text-base md:text-lg"><strong>Institute:</strong> {mentee.highestDegree.institute}</p>
        <p className="text-xs sm:text-base md:text-lg"><strong>Degree Name:</strong> {mentee.highestDegree.degreeName}</p>
        <p className="text-xs sm:text-base md:text-lg"><strong>Completion Year:</strong> {mentee.highestDegree.completionYear}</p>
      </div>

      {mentee.otherDegrees.length > 0 && (
        <>
          <h3 className="text-base md:text-lg font-bold mt-6 border-b pb-2 border-gray-700">
            Other Degrees
          </h3>
          <div className="mt-3 space-y-4">
            {mentee.otherDegrees.map((degree, index) => (
              <div key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-800">
                <p className="text-xs sm:text-base md:text-lg"><strong>Institute:</strong> {degree.institute}</p>
                <p className="text-xs sm:text-base md:text-lg"><strong>Degree Name:</strong> {degree.degreeName}</p>
                <p className="text-xs sm:text-base md:text-lg"><strong>Completion Year:</strong> {degree.completionYear}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MenteeProfilePage;
