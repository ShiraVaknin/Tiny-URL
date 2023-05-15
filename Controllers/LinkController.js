const LinkModel = require('../Models/LinkModel');
const links = require('../Models/LinkModel')
const UserModel = require('../Models/UserModel')
const LinkController = {

    getAllLinks: async (req, res) => {
        try {
            const  link = await links.find();
            res.status(200).send(link)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getLinkById: async(req, res) => {
        try {
            const link = await links.findById(req.params.id)
            res.json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    addLink: async(req, res) => {
        const link = req.body[0];
        const {password} = req.body[1];
        try {
            const user = await UserModel.findOne({password:password})
            if(!user){
                return res.send("The user doesn't exist")
            }
            const newLink = await links.create(link);
            user.links.push(newLink);
            await user.save()
            res.send(newLink);
        } catch (error) {
            res.status(400).json({message: error.message})   
        }
    },
    updateLink: async(req, res) => {
        const {id} = req.params;
        try {
            const link = await links.findByIdAndUpdate(id, req.body, {new:true});
            res.stats(200).json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    //chek the user before this function
    deleteLink: async (req, res) => {
        const {id}= req.params;
        try {
            const link = await links.findByIdAndDelete(id);
            res.status(200).json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    redirect: async(req, res) => {
        const {newurl} = req.params;
        try {
            const link = await LinkModel.findOne({newUrl:newurl});
            link.clicks.push({insertDate:Date.now(), ipAdress:req.socket.localAddress});
            link.save();
            res.redirect(link.origionUrl)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports =  LinkController;