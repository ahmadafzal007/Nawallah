import React, { useState, useEffect } from "react";
import { Button, Table, Typography, Modal, Card, message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./DonationDetails.css"; // Import the CSS file for custom styles
import { FaWeight } from "react-icons/fa";
import {   MenuBookOutlined, PeopleAltOutlined} from "@mui/icons-material";
import NgoController from "../../API/Ngo"

const { Title } = Typography;

const DonationDetails = () => {
  const [donations, setDonations] = useState([]);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [view, setView] = useState("available"); // State to manage view


  useEffect(() => {
    console.log("I am getting called");
  
    const fetchData = async () => {
      try {
        const response = await NgoController.getAllDonations();
        if (response.success) {
          const donationData = response.donations.map((item) => {
            return {
              id: item.id,
              restaurantName: item.restaurantName,
              foodDetails: item.description,
              restaurantAddress: item.restaurantLocation,
              phoneNumber: item.restaurantPhone,
            };
          });
  
          setDonations(donationData);
        } else {
          console.log("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    const fetchAcceptedData = async () => {
      try {
        const email = JSON.parse(localStorage.getItem("ngo")).email;
        const response = await NgoController.getAcceptedDonations(email);
        if (response.success) {
          console.log('respnse ' , response.acceptedDonations);
          const acceptedData = response.acceptedDonations.map((item) => {
            return {
              id: item.id,
              restaurantName: item.restaurantName,
              foodDetails: item.description,
              restaurantAddress: item.restaurantLocation,
              phoneNumber: item.restaurantPhone,
            };
          });
  
          console.log("accepted data", acceptedData);
          setAcceptedDonations(acceptedData);
        } else {
          console.log("Failed to fetch accepted donations");
        }
      } catch (error) {
        console.error("Error fetching accepted donations:", error);
      }
    }
  
    fetchData();
    fetchAcceptedData();
    
  }, []); // Add dependencies if needed, e.g., [] for running once on mount
  

  

  const handleAccept = async ( donationId) => {
    console.log("donationId", donationId);
    const email = JSON.parse(localStorage.getItem("ngo")).email;
    console.log("ngo email", email);
    // Logic to accept the donation
    const acceptedDonation = donations.find(donation => donation.id === donationId);
    setAcceptedDonations([...acceptedDonations, acceptedDonation]);
    setDonations(donations.filter(donation => donation.id !== donationId));
    message.success("Donation accepted");
    await NgoController.acceptOrder(email,donationId).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })


 
  };

  const handleReject = (id) => {
    // Logic to reject the donation
    message.error("Donation rejected");
    setDonations(donations.filter(donation => donation.id !== id));
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

  const renderActions = (_, record) => (
    <div>
      <Button
        type="primary"
        onClick={() => handleAccept(record.id)}
        style={{
          marginRight: "10px",
          backgroundColor: "#48bf53",
          borderColor: "#f10057",
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

  const columns = [
    {
      title: "Business Name",
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
      title: "Business Address",
      dataIndex: "restaurantAddress",
      key: "restaurantAddress",
      align: "center",
      className: "table-cell", // Custom class for table cell
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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

  const acceptedColumns = columns.filter(col => col.key !== "actions");

  return (
    <div className="flex text-white">
      <aside className="w-1/5 h-screen bg-[#f10057]  pt-8 pb-4">
        <ul className="space-y-[18.5px]">
          <li
            className={`p-2.5 flex items-center gap-3  text-base font-normal rounded-lg  font-serif   my-5 cursor-pointer ${view === "available" ? "bg-brandDark text-[#f10057]" : ""}`}
            onClick={() => setView("available")}
          >
          <PeopleAltOutlined className="w-[22px] h-[22px]" />
          <span className="hidden lg:block">Available Donations</span>          
          </li>
          
          <li
            className={`p-2.5 font-serif flex items-center gap-3 text-base font-normal rounded-lg   cursor-pointer ${view === "accepted" ? "bg-brandDark text-[#f10057]" : ""}`}
            onClick={() => setView("accepted")}
          >
            <MenuBookOutlined className="w-[22px] h-[22px]" />
            <span className="hidden lg:block">Accepted Donations</span>
          </li>
        </ul>
      </aside>
      <div className="w-4/5 p-4">
       
        {view === "available" ? (
          <div>
           <Title
           level={2}
           style={{ textAlign: "center", margin: "20px 0", color: "#f10057" }}
           className="text-4xl text-[#f10057] sm:text-4xl lg:text-5xl font-bold tracking-wider font-cursive"
         >
           Available Donations
         </Title>
          <Table
            dataSource={donations}
            columns={columns}
            rowKey="id"
            className="green-table"
            style={{
              margin: "0 20px", // Adding margin to right and left
              borderRadius: "10px", // Rounding the corners of the table
              overflow: "hidden", // Ensuring the corners are rounded
            }}
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
          />
          </div>
        ) : (
          <div>
             <Title
           level={2}
           style={{ textAlign: "center", margin: "20px 0", color: "#f10057" }}
           className="text-4xl text-[#f10057] sm:text-4xl lg:text-5xl font-bold tracking-wider font-cursive"
         >
           Accepted Donations
         </Title>
          <Table
            dataSource={acceptedDonations}
            columns={acceptedColumns}
            rowKey="id"
            className="green-table"
            style={{
              margin: "0 20px", // Adding margin to right and left
              borderRadius: "10px", // Rounding the corners of the table
              overflow: "hidden", // Ensuring the corners are rounded
            }}
          />
          </div>
        )}
        <Modal
          title={
            <Title level={4} className="mr-4 modal-title font-serif">
              Donation Details
            </Title>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          style={{ fontFamily: "serif" }}
        >
          {selectedRestaurant && (
            <div>
              <Card className="bold-text font-serif border-1 border-black ">
                <p>
                  <strong className="underline mr-1">Business Name:</strong>{" "}
                  <span className="font-mono">{selectedRestaurant.restaurantName}</span>
                </p>
                <p>
                  <strong className="underline mr-1">Food Details:</strong>{" "}
                  <span className="font-mono">{selectedRestaurant.foodDetails}</span>
                </p>
                <p>
                  <strong className="underline mr-1">Restaurant Address:</strong>{" "}
                  <span className="font-mono">{selectedRestaurant.restaurantAddress}</span>
                </p>
                <p>
                  <strong className="underline mr-1">Phone Number:</strong>{" "}
                  <span className="font-mono">{selectedRestaurant.phoneNumber}</span>
                </p>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DonationDetails;
