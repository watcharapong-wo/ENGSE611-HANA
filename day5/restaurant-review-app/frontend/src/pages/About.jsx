import React from "react";

export default function About() {
  return (
    <div className="p-4 max-w-2xl mx-auto text-sm text-gray-600">
      <h2 className="text-xl font-semibold mb-2">About This Project</h2>
      <p>
        This is a restaurant review website built as part of ENGSE611 HANA project.
      </p>
      <ul className="list-disc pl-5 mt-2">
        <li>Search, filter, sort restaurants</li>
        <li>Add / Edit / Delete restaurants</li>
        <li>Restaurant detail page with reviews</li>
        <li>Add / Edit / Delete reviews, star rating</li>
        <li>Photo upload stored as Data URL</li>
        <li>Responsive design</li>
      </ul>
    </div>
  );
}
