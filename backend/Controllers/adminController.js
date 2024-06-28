
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
    }
}