const restaurantService = require('../Services/resturant.service');
const admin = require('../Db/firebaseAdmin');
const ngoService = require('../Services/ngo.service');



const authController = {
    async registerRestaurant(req,res,next) {
        try {
          const restaurant = req.body;
          const email = restaurant.email;
          console.log("request recived",req.body)
  
        
                if (await restaurantService.emailExists(email)){
                  console.log("inside if")
                  // console.log(restaurantService.emailExists(email))
                    res.status(403).json({
                        "messsage":"Email already Exists"
                    })
                    return ;
                }
                const restaurantId = await restaurantService.createRestaurant(restaurant);
                res.status(201).send({ id: restaurantId });
  
      
        } catch (error) {
          console.log('auth controller ' , error);
          res.status(400).send({ error: "Cannot register restaurant" });
        }
      },

    async loginRestaurant(req,res,next) {

    },

    async registerNgo(req, res) {
      console.log("request recived /register/ngo",req.body)
      try {
          const ngo = req.body;
          const email = ngo.email;
          
              if (await ngoService.emailExists(email)) {
                  res.status(403).json({
                      message: 'Email already exists'
                  });
                  return ;
              }

              const result = await ngoService.createNgo(ngo);
              res.status(201).send({ id: result.id });
              return;

        
      } catch (error) {
          console.log('auth controller ' , error);
          res.status(400).send({ error: "Cannot register NGO"});
      }
  },
  async  verifyNgo(req, res) {
    try {
        const { email,password } = req.body;
        const response = await ngoService.verifyNgo(email,password);
        
        res.status(200).send({ response });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
}

module.exports = authController;