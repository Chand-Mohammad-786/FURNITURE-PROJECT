import Contact from "../model/contactModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Save message
    const newMessage = await Contact.create({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("newContactMessage", newMessage);
    }

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Contact send error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
