import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating authentication tokens

// Define the user schema
const userSchema = new mongoose.Schema({
  mailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const UserModel = mongoose.model("User", userSchema);

// Signup controller
export const signupController = async (req, res) => {
  try {
    const { mailId, password } = req.body;

    // Validate inputs
    if (!mailId || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ mailId });
    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ mailId, password: hashedPassword });
    await newUser.save();

    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal server error.");
  }
};

// Signin controller
export const signinController = async (req, res) => {
  try {
    const { mailId, password } = req.body;

    // Validate inputs
    if (!mailId || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Find the user
    const user = await UserModel.findOne({ mailId });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials.");
    }

    // Generate a JWT token (Replace "your-secret-key" with an actual secret key)
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).send({ message: "Signin successful", token });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).send("Internal server error.");
  }
};
