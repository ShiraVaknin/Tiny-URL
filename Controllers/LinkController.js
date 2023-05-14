const LinkModel = require('../Models/LinkModel')

const LinkController = {

    getAllLinks: async (req, res) => {
        try {
            const  link = await LinkModel.find();
            res.status(200).send(link)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getLinkById: async(req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id)
            res.json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    //chek the user before this function
    addLink: async(req, res) => {
        const {link} = req.body;
        try {
            const newLink = await LinkModel.create({link});
            res.json(newLink);
        } catch (error) {
            res.status(400).json({message: error.message})
            
        }
    },
    updateLink: async(req, res) => {
        const {id} = req.params;
        try {
            const link = await LinkModel.findByIdAndUpdate(id, req.body, {new:true});
            res.stats(200).json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    //chek the user before this function
    deleteLink: async (req, res) => {
        const {id}= req.params;
        try {
            const link = await LinkModel.findByIdAndDelete(id);
            res.status(200).json(link)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}

module.exports =  LinkController;