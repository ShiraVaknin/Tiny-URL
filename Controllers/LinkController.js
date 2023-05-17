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
            }//להוסיף בדיקה שזה לא קיים כבר
            const newLink = await links.create(link);
            user.links.push(newLink);
            await user.save()
            res.send(newLink);
        } catch (error) {
            res.status(400).json({message: error.message})   
        }
    },
    updateLink: async(req, res) => {
        const {newUrl} = req.params;
        try {
            const newLink = await LinkModel.findOne({newUrl:newUrl});
            if(newLink == null){
                return res.send("This url not exist")
            }
            const link = await links.findByIdAndUpdate(newLink._id, req.body, {new:true});
            res.status(200).json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    deleteLink: async (req, res) => {
        //the id of the user will be in the token, now i send it in the params.
        const {newUrl}= req.params;
        const {id} = req.params;
        try {
            const newLink = await LinkModel.findOne({newUrl:newUrl});
            if(newLink == null){
                return res.send("This url not exist")
            }
            const link = await links.findById(newLink._id);
            await UserModel.findByIdAndUpdate(id, { $pull: {links:newLink._id}})
            link.remove();
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