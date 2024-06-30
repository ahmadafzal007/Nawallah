const adminService = require('../Services/admin.service');

const AdminController = {
    async auhorizeRestaurant(req,res,next){
        try {
            const restaurantId = req.params.restaurantId;
            const adminId = req.params.adminId;
            const result = await adminService.authorizeRestaurant(restaurantId,adminId);
            res.status(200).send({message:"Restaurant Authorized"});
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },

    async authorizeNgo(req,res,next){
        try {
            const ngoId = req.params.ngoId;
            const result = await adminService.authorizeNgo(ngoId);
            res.status(200).send({message:"NGO Authorized"});
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },

    async getTotalDonations(req,res,next){
        console.log("request received in admin controller");
        try {
            const result = await adminService.getTotalDonations();
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },

    async getTotalOrders(req,res,next){
        console.log("request received in admin controller");
        try {
            const result = await adminService.getTotalOrders();
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    },

    async sendMail (req,res,next){
        try {
            const {name,email,subject,message} = req.body;
            const result = await adminService.sendMail(name,email,subject,message);
            res.status(200).send({message:"Mail Sent"});
        } catch (error) {
            res.status(400).send({error:error});
        }
    }

}

module.exports = AdminController;