import React, { useState, useEffect } from "react";
import { Button, Table, Typography, Modal, Card, message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./DonationDetails.css"; // Import the CSS file for custom styles
import { FaWeight } from "react-icons/fa";

const { Title } = Typography;

const DonationDetails = () => {
  const [donations, setDonations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Set dummy data
    const dummyDonations = [
      {
        id: 1,
        restaurantName: "Ramada",
        foodDetails:
          "Pizza, Burger, Tons of Biryani, 15 kg chicken haleem, 35 pieces of roast ",
        restaurantAddress: "123 Main St, City A",
      },
      {
        id: 2,
        restaurantName: "Pearl Continental",
        foodDetails: "Sushi, Ramen",
        restaurantAddress: "456 Elm St, City B",
      },
      {
        id: 3,
        restaurantName: "Serena",
        foodDetails: "Tacos, Burritos",
        restaurantAddress: "789 Oak St, City C",
      },
    ];
    setDonations(dummyDonations);
  }, []);

  const handleAccept = (id) => {
    // Logic to accept the donation
    message.success("Donation accepted");
    console.log("Accepted donation with ID:", id);
  };

  const handleReject = (id) => {
    // Logic to reject the donation
    message.error("Donation rejected");
    console.log("Rejected donation with ID:", id);
  };

  const handleRowClick = (record) => {
    setSelectedRestaurant(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderActions = (_, record) => {
    return (
      <div>
      <Button
  type="primary"
  onClick={() => handleAccept(record.id)}
  style={{
    marginRight: "10px",
    backgroundColor: "#2a622d",
    borderColor: "#100404",
    marginBottom: "10px",
    width: "85px", // Fixed width
    height: "45px", // Fixed height
    borderRadius: "40px", // Rounded corners
    transition: "background-color 0.3s", // Smooth transition on hover
    fontWeight: "bold",
    borderWidth: "1px",
    fontFamily: "serif", // Setting serif font family
  }}
  className="accept-button" // Optional class for additional styling
>
  Order
</Button>


      </div>
    );
  };

  const columns = [
    {
      title: "Restaurant Name",
      dataIndex: "restaurantName",
      key: "restaurantName",
      align: "center",
      className: "table-header", // Custom class for table header
    },
    {
      title: "Food Details",
      dataIndex: "foodDetails",
      key: "foodDetails",
      align: "center",
      className: "table-cell", // Custom class for table cell
    },
    {
      title: "Restaurant Address",
      dataIndex: "restaurantAddress",
      key: "restaurantAddress",
      align: "center",
      className: "table-cell", // Custom class for table cell
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: renderActions,
      className: "table-cell", // Custom class for table cell
    },
  ];

  return (
    <div className="dashboard-content bg-brandDark">
      <Title
        level={2}
        style={{ textAlign: "center", margin: "20px 0", color: "white" }}
        className="text-4xl text-white sm:text-4xl lg:text-5xl font-bold tracking-wider font-cursive"
      >
        Welfare Administrator
      </Title>
      <Table
        dataSource={donations}
        columns={columns}
        rowKey="id"
        className="green-table"
        onRow={(record) => {
          return {
            onClick: () => {
              handleRowClick(record);
            },
          };
        }}
      />
      <Modal
        title="Restaurant Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedRestaurant && (
          <div>
            <Card className="bold-text">
              <p>
                <strong>Restaurant Name:</strong>{" "}
                {selectedRestaurant.restaurantName}
              </p>
              <p>
                <strong>Food Details:</strong>{" "}
                {selectedRestaurant.foodDetails}
              </p>
              <p>
                <strong>Restaurant Address:</strong>{" "}
                {selectedRestaurant.restaurantAddress}
              </p>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonationDetails;
