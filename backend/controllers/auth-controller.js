import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Verification from "../models/verificationSchema.js";
import { sendEmail } from "../libs/send-email.js";
import aj from "../libs/arcjet.js";

const registerUser = async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const decision = await aj.protect(request, { email });
    console.log(decision);

    if (decision.isDenied()) {
      response.writeHead(403, { "Content-type": "application/json" });
      response.end(JSON.stringify({ message: "Invlid Email Address" }));
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = jwt.sign(
      { userId: newUser._id, purpose: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: Date.now() + 3600000,
    });

    if (!(await sendVerificationEmail(verificationToken, email))) {
      return response
        .status(500)
        .json({ message: "Error sending verification email" });
    }

    response
      .status(201)
      .json({
        message:
          "Verification email sent to your email. Please check and verify your account",
      });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      const verification = await Verification.findOne({ userId: user._id });
      if (verification && verification.expiresAt > Date.now()) {
        return response.status(400).json({
          message:
            "Email not verified, Please check your email for the verification link",
        });
      } else {
        await Verification.findByIdAndDelete(verification._id);

        const token = jwt.sign(
          {
            userId: user._id,
            purpose: "email-verification",
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        await Verification.create({
          userId: user._id,
          token,
          expiresAt: Date.now() + 3600000,
        });

        sendVerificationEmail(token, email);
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const signInToken = jwt.sign(
      {
        userId: user._id,
        purpose: "sign-in",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7D" }
    );

    user.lastLogin = Date.now();
    await user.save();

    const userData = user.toObject();

    delete userData.password;

    return response.status(200).json({
      message: "Login successful",
      token: signInToken,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    response.Status(500).json({ message: "Internal server error" });
  }
};

const verifyUser = async (request, response) => {
  try {
    const { token } = request.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const { userId, purpose } = payload;
    if (purpose !== "email-verification") {
      return response.status(401).json({ message: "Unauthorized" });
    }
    const verification = await Verification.findOne({ userId, token });

    if (!verification) {
      return response.status(401).json({ message: "Unauthorized" });
    }
    const isTokenExpired = verification.expiresAt < Date.now();

    if (isTokenExpired) {
      return response.status(401).json({ message: "Token has expired" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    if (user.isVerified) {
      return response.status(400).json({ message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();
    await Verification.findByIdAndDelete(verification._id);

    response.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const sendVerificationEmail = async (verificationToken, email) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
  const emailSubject = "Verify Your Email";

  return await sendEmail(email, emailSubject, emailBody);
};

export { registerUser, loginUser, verifyUser };
