module.exports.config = {
    name: "auto-reply",
    version: "1.0.0",
    permission: 0,
    prefix: false,
    credits: "OMOR ALVI",
    description: "Auto-reply for all messages",
    category: "fun",
    usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, Users }) {
    const userMessage = event.body; // Get the user's message
    const userName = await Users.getNameUser(event.senderID); // Get the user's name

    // Create a default reply based on the user message
    const reply = `ধন্যবাদ ${userName} আপনার মেসেজের জন্য! আপনি বলেছেন: "${userMessage}". আমি এখানে আছি, আরও কিছু জানতে চাইলে বলুন! 😊`;

    // Send the reply back to the user
    return api.sendMessage(reply, event.threadID, event.messageID);
};
