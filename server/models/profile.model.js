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
    getProfiles,
    updateProfile
    return Profile;
  };
//get all profiles from the database
const getProfiles = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM profiles", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};
const updateProfile = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { username, profilepicture } = body;
    pool.query(
      "UPDATE profiles SET username = $1, profilepicture = $2 WHERE profileid = $3 RETURNING *",
      [username, profilepicture, profileid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Profile updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};