const ngoService = require('../Services/ngo.service');
const NgoController = {
   
    AcceptDonation : async(req,res,next)=>{
        try {
            const {email,donationId} = req.body;
            const result = await ngoService.acceptDonation(email,donationId);
            res.status(200).send(result);
        } catch (error) {
            console.log('NgoController ' , error);
            res.status(400).send({ error: "Cannot accept donation" });
        }
    },

    getAcceptedDonations: async(req,res,next)=>{
        try {
            const {email} = req.body;
            const result = await ngoService.getAcceptedDonations(email);
            res.status(200).send(result);
        } catch (error) {
            console.log('NgoController ' , error);
            res.status(400).send({ error: "Cannot get accepted donations" });
        }
    },
    getAllDonations: async(req,res,next)=>{
        try {
            const result = await ngoService.getAllDonations();
            res.status(200).send(result);
        } catch (error) {
            console.log('NgoController ' , error);
            res.status(400).send({ error: "Cannot get all donations" });
        }
    }
    
}

module.exports = NgoController;