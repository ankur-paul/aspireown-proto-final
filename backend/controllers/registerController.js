const User = require("../model/User");
const Student = require("../model/Student");
const Parent = require("../model/Parent");
const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password, role, ...rest } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const user = await User.create({
      username,
      password: hashedPwd,
      roles: { [role]: 1 },
    });

    // Create role-specific document
    if (role === "Student") {
      const student = new Student({
        user: user._id,
        personalInfo: rest.personalInfo,
        academicInfo: rest.academicInfo,
        extracurricularActivities: rest.extracurricularActivities,
        awards: rest.awards,
      });
      await student.save();
    } else if (role === "Parent") {
      const parent = new Parent({
        user: user._id,
        children: rest.children, // Array of Student IDs
      });
      await parent.save();
    } else if (role === "Admin") {
      const admin = new Admin({
        user: user._id,
        managedSchools: rest.managedSchools, // Array of School IDs
      });
      await admin.save();
    }

    res
      .status(201)
      .json({ success: `New user: ${username} created successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
