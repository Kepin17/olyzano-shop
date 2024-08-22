import axios from "axios";
import React from "react";

const UserProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user-id") || "{}");
  console.log(user.customer_id);
  const addProfile = () => {
    //   const profileData = {
    //     customer_id: user.customer_id, // Pastikan ini adalah customer_id yang valid
    //     first_name: "John",
    //     last_name: "Doe",
    //     phone: "123-456-7890",
    //     address: "Jl. Lima",
    //     city: "Jakarta",
    //     postal_code: "111",
    //     country: "Indonesia",
    //   };

    axios
      .get(`http://localhost:8000/api/user-profile/{${user.customer_id}}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the profile!", error);
      });
  };
  return (
    <button
      onClick={addProfile}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Button
    </button>
  );
};

export default UserProfilePage;
