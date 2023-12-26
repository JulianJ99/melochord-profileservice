module.exports = mongoose => {
    const Profile = mongoose.model(
      "profile",
      mongoose.Schema(
        {
          profileid: Number,
          username: String,
          profilepicture: String,
          userid: Number
        },
        { timestamps: true }
      )
    );
  
    return Profile;
  };