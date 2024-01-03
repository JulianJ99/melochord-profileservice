module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          profileid: Number,
          username: String,
          profilepicture: String,
          userid: Number
        },
        { timestamps: true }
      );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Profile = mongoose.model("profile", schema);
    //getProfiles,
    //updateProfile
    return Profile;
  };

//get all profiles from the database
// const getProfiles = async () => {
//   try {
//     return await new Promise(function (resolve, reject) {
//       pool.query("SELECT * FROM profiles", (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         if (results && results.rows) {
//           resolve(results.rows);
//         } else {
//           reject(new Error("No results found"));
//         }
//       });
//     });
//   } catch (error_1) {
//     console.error(error_1);
//     throw new Error("Internal server error");
//   }
// };

exports.findOne = (req, res) => {
  const id = req.params.id;

  Profile.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Couldn't find profile with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving profile with id=" + id });
    });
};

// Update profile
// const updateProfile = (id, body) => {
//   return new Promise(function (resolve, reject) {
//     const { username, profilepicture } = body;
//     pool.query(
//       "UPDATE profiles SET username = $1, profilepicture = $2 WHERE profileid = $3 RETURNING *",
//       [username, profilepicture, profileid],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         if (results && results.rows) {
//           resolve(`Profile updated: ${JSON.stringify(results.rows[0])}`);
//         } else {
//           reject(new Error("No results found"));
//         }
//       }
//     );
//   });
// };

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile with id=${id}. Maybe the profile wasn't found.`
        });
      } else res.send({ message: "Profile was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating profile with id=" + id
      });
    });
};