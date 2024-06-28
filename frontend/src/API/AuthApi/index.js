class AuthController {
    backendURL = import.meta.env.VITE_BACKEND_URL;

    registerRestaurant = async (restaurant) => {
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/restaurant/auth/register`);

        try {
            const response = await fetch(`${this.backendURL}/restaurant/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant),
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to register restaurant'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    };

    registerNgo = async(ngo)=>{
        console.log("request received in auth controller");
        console.log("backendURL", `${this.backendURL}/ngo/auth/register`);

        try {
            const response = await fetch(`${this.backendURL}/ngo/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ngo),
            });

            const responseData = await response.json();

            if (response.ok) { // Check if response status is in the range 200-299
                return responseData; // Return the parsed JSON response
            } else {
                return (responseData || 'Failed to register NGO'); // Throw an error with a message from the server or a default message
            }
        } catch (error) {
            throw new Error(error || 'Failed to connect to the server'); // Throw an error with a message from the catch block or a default message
        }
    }

}

export default new AuthController();
