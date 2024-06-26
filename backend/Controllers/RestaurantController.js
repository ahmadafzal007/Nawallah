const restaurantService = require('../Services/resturant.service')

const RestaurantController = {
    
    async createFoodItem(req,res,next){
        try {
            const foodItem = req.body;
            const restaurantId = req.params.restaurantId;
            const foodItemId = await restaurantService.addFoodItem(restaurantId,foodItem);
            res.status(201).send({id:foodItemId});
        } catch (error) {
            res.status(400).send({error:error.message});
        }
    }


}

module.exports = RestaurantController;