const restaurantService = require('../Services/resturant.service');
const admin = require('../Db/firebaseAdmin');
const ngoService = require('../Services/ngo.service');



const authController = {
    async registerRestaurant(req,res,next) {
        try {
          const restaurant = req.body;
          const email = restaurant.email;
          try{
                if (restaurantService.emailExists(email)){
                    res.status(403).json({
                        "messsage":"Email already Exists"
                    })
                }
          }catch(error){
            next(error)
          }
          const restaurantId = await restaurantService.addRestaurant(restaurant);

        
          res.status(201).send({ id: restaurantId });
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
      },

    async loginRestaurant(req,res,next) {

    },

    async registerNgo(req, res) {
      try {
          const ngo = req.body;
          const email = ngo.email;
          try {
              if (await ngoService.emailExists(email)) {
                  res.status(403).json({
                      message: 'Email already exists'
                  });
              }
          } catch (error) {
              throw new Error(error);
          }
          
          const result = await ngoService.createNgo(ngo);
          res.status(201).send({ id: result.id });
      } catch (error) {
          res.status(400).send({ error: error.message });
      }
  },
  async verifyNgo(req, res) {
    try {
        const { idToken } = req.body;
        const decodedToken = await ngoService.verifyToken(idToken);
        res.status(200).send({ uid: decodedToken.uid });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
}

module.exports = authController;