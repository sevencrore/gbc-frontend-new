import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBusinessDetails = () => {
  const { business_id } = useParams(); // Get the business_id from the URL
  const [business, setBusiness] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch business details
    const fetchBusinessDetails = async () => {
      try {
        const businessResponse = await axios.get(
          `http://127.0.0.1:8000/api/business/${business_id}`
        );
        setBusiness(businessResponse.data.data);

        const buyersResponse = await axios.get(
          `http://127.0.0.1:8000/api/businessbuyers/business/${business_id}`
        );
        setBuyers(buyersResponse.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [business_id]);

  // Function to handle buyer deletion
  const handleDeleteBuyer = async (id) => {
    if (window.confirm("Are you sure you want to delete this buyer?")) {
      try {
        debugger;
        await axios.delete(`http://127.0.0.1:8000/api/business-buyers/${id}`);
        // Update the state after successful deletion
        setBuyers(buyers.filter((buyer) => buyer.id !== id));
        alert("Buyer deleted successfully.");
      } catch (error) {
        alert("Failed to delete the buyer. Please try again.");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      {/* Business Details Section */}
      {business && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4 className="card-title">Business Details</h4>
          </div>
          <div className="card-body">
            <p><strong>Business Name:</strong> {business.business_name}</p>
            <p><strong>Address:</strong> {business.address}</p>
            <p><strong>City:</strong> {business.city}</p>
            {/* <p><strong>Postal Code:</strong> {business.postal_code || "N/A"}</p> */}
            <p><strong>Phone Number:</strong> {business.phone_number}</p>
            <p><strong>Website:</strong> <a href={business.website}>{business.website}</a></p>
            {/* <p><strong>Description:</strong> {business.description || "N/A"}</p> */}
            <p><strong>Products And Services:</strong> {business.keywords}</p>
            <p><strong>Contact Person:</strong> {business.contact_person_name}</p>
            <p><strong>Contact Email:</strong> {business.contact_person_email}</p>
            <p><strong>Created At:</strong> {business.created_at}</p>
            <p><strong>Updated At:</strong> {business.updated_at}</p>
          </div>
        </div>
      )}

      {/* Buyers Details Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h4 className="card-title">Buyers Details</h4>
        </div>
        <div className="card-body">
          {buyers.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Contact Details</th>
                    <th>Created At</th>
                    <th>Actions</th> {/* Add an Actions column */}
                  </tr>
                </thead>
                <tbody>
                  {buyers.map((buyer, index) => (
                    <tr key={buyer.id}>
                      <td>{index + 1}</td>
                      <td>{buyer.company_name}</td>
                      <td>{buyer.location}</td>
                      <td>{buyer.contact_details}</td>
                      <td>{new Date(buyer.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteBuyer(buyer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No buyers found for this business.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBusinessDetails;
