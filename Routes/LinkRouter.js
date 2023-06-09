const LinkRouter =  require("express").Router();
const LinkController = require( "../Controllers/LinkController.js");

LinkRouter.get("/", LinkController.getAllLinks);
LinkRouter.get("/:id", LinkController.getLinkById);
LinkRouter.post("/", LinkController.addLink);
LinkRouter.put("/:newUrl", LinkController.updateLink);
LinkRouter.delete("/:newUrl/:id", LinkController.deleteLink);

module.exports= LinkRouter;