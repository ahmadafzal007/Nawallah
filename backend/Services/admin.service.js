const AdminService = {
    async authorizeRestaurant(restaurantId, adminId) {
        try {
            const admin = await db.collection('admin').doc(adminId).get();
            if (!admin.exists) {
                throw new Error('Admin does not exist');
            }
            const restaurant = await db.collection('restaurant').doc(restaurantId).get();
            if (!restaurant.exists) {
                throw new Error('Restaurant does not exist');
            }
            await db.collection('restaurant').doc(restaurantId).update({ authorized: true });
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AdminService;