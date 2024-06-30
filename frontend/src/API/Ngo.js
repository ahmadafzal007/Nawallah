class NgoController{
    backendURL = import.meta.env.VITE_BACKEND_URL;

    acceptOrder = async(email,donationId)=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/ngo/acceptDonation`);

        try {
            const response = await fetch(`${this.backendURL}/ngo/acceptDonation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,donationId}),
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to accept order'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    };

    getAllDonations = async()=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/ngo/getAllDonations`);

        try {
            const response = await fetch(`${this.backendURL}/ngo/getAllDonations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to get all donations'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    };

    getAcceptedDonations = async(email)=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/ngo/getAcceptedDonations`);

        try {
            const response = await fetch(`${this.backendURL}/ngo/getAcceptedDonations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to get accepted donations'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    };
}


export default new NgoController();