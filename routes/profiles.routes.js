module.exports = app => {
    const profiles = require("../controllers/profile.controller");
  
    var router = require("express").Router();
  
    // Create a new profile
    router.post("/", profiles.create);
  
    // Retrieve all profiles
    router.get("/", profiles.findAll);
  
    // Retrieve all published profiles
    router.get("/published", profiles.findAllPublished);
  
    // Retrieve a single profile with id
    router.get("/:id", profiles.findOne);
  
    // Update a profile with id
    router.put("/:id", profiles.update);
  
    // Delete a profile with id
    router.delete("/:id", profiles.delete);
  
    // Delete all profiles
    router.delete("/", profiles.deleteAll);
  
    app.use("/api/profiles", router);
  };