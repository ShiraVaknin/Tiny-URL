const UserModel = require("../Models/UserModel.js");

const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const  user = await UserModel.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getUserById: async(req, res) => {
        try {
            const user = UserModel.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    addUser: async(req, res) => {
        const newProduct = new UserModel(req.body)
        newProduct.save()
            .then(product => {
                res.send(product)
            }).catch(err => {
                console.log(err)
            })
        // const {user} = req.body;
        // try {
        //     const newUser = UserModel.create({user});
        //     res.json(newUser);
        // } catch (error) {
        //     res.status(400).json({message: error.message})
            
        // }
    },
    updateUser: async(req, res) => {
        const {id} = req.params;
        try {
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new:true});
            res.stats(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    deleteUser: async (req, res) => {
        const {id}= req.params;
        try {
            const user = await UserModel.findByIdAndDelete(id);
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    // addLink:async (req, res) => {
    //     //the link object in the body and the id of the person sended in the params.
    //     const {link} = req.body;
    //     const {id} = req.params;
    //     try {
    //         const user = await UserModel.findById(id)
    //         const newLink = await LinkModel.create({link});
    //         user.links.push(newLink);//הכנסת הלינק למערך
    //         await UserModel.findByIdAndUpdate(id, user, {new:true});
    //         res.json(newLink);
    //     } catch (error) {
    //         res.status(400).json({message: error.message})
            
    //     }
    // }
}

module.exports = UserController;