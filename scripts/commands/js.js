module.exports.config = {
    name: "emoji-react",
    version: "1.0.0",
    permission: 0,
    prefix: false,
    credits: "Custom Bot",
    description: "React to every message with a random emoji",
    category: "fun",
    usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
    // Complete list of emojis
    const allEmojis = [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😇", "😉",
        "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓",
        "😔", "😕", "😖", "😗", "😙", "😚", "😜", "😝", "😞", "😟",
        "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩",
        "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳",
        "😵", "😶", "😷", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻",
        "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "👻", "💩",
        "🍏", "🍎", "🍌", "🍉", "🍇", "🍓", "🌹", "🌻", "🌼", "🌸",
        "✨", "🔥", "💖", "💕", "💞", "💘", "💝", "💗", "💓", "💔",
        "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
        "🌍", "🌎", "🌏", "🌌", "🌈", "🌠", "🌙", "⭐", "✨", "🔥"
    ];

    // Check if the event has a message ID
    if (!event.messageID) return;

    const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)]; // Select a random emoji
    const messageId = event.messageID; // Get the message ID

    try {
        // React to the message with the selected emoji
        await api.react(messageId, randomEmoji);
        console.log(`Reacted to message ID ${messageId} with emoji ${randomEmoji}`);
    } catch (error) {
        console.error(`Failed to react to message ID ${messageId}:`, error);
    }
};
