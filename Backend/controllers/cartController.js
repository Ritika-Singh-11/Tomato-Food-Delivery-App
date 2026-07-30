import UserModel from "../models/userModel.js"
// add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await UserModel.findById(userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Added to cart"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};






//remove items from user cart

const removeFromCart = async (req, res) => {
    try {

        const userId = req.userId;
        let userData = await UserModel.findById(userId);
        // let userData = await UserModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

        }
        // await UserModel.findByIdAndUpdate(req.body.userId, { cartData });

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }



}


// fetch user cart data
const getCart = async (req, res) => {
    try {
        // let userData = await UserModel.findById(req.body.userId);

        const userId = req.userId;
        let userData = await UserModel.findById(userId);


        // let cartData = await UserModel.cartData;
        let cartData = userData.cartData;


        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}


export { addToCart, removeFromCart, getCart }