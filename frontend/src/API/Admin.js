class AdminController{
    backendURL = import.meta.env.VITE_BACKEND_URL;

    getTotalDonations = async()=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/admin/getTotalDonations`);

        try {
            const response = await fetch(`${this.backendURL}/admin/getTotalDonations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to get total donations'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    }

    getTotalOrders = async()=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/admin/getTotalOrders`);

        try {
            const response = await fetch(`${this.backendURL}/admin/getTotalOrders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to get total orders'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    }

    sendMail = async(name,email,subject,message)=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/admin/sendMail`);

        try {
            const response = await fetch(`${this.backendURL}/admin/sendMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,email,subject,message}),
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to send mail'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
    }
    }
}


export default new AdminController();