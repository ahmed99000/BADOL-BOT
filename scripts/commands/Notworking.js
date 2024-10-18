module.exports.config = {
    name: "jan",
    version: "1.0.0",
    permission: 0,
    prefix: false,
    credits: "OMOR-ALVI",
    description: "যে কোনো ইনপুট দিলে OpenAI-এর মাধ্যমে বাংলায় স্বয়ংক্রিয় উত্তর দেওয়ার জন্য সিস্টেম",
    category: "fun",
    usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require('axios');
    const prompt = event.body; // পুরো বার্তা ক্যাপচার করার জন্য event.body ব্যবহার করা হয়েছে
    const userName = await Users.getNameUser(event.senderID);

    if (!prompt || prompt.length === 0) return api.sendMessage(" কি জানতে চাও বলো !", event.threadID, event.messageID);

    // OpenAI API call
    const openaiApiKey = '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';
    const gptResponse = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: "text-davinci-003",
            prompt: `Please reply in Bengali to the following: ${prompt}`,  // বাংলা ভাষায় সঠিক উত্তর পেতে প্রম্পট
            max_tokens: 100,
            temperature: 0.7
        },
        {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );

    // ChatGPT থেকে প্রাপ্ত উত্তর
    const gptReply = gptResponse.data.choices[0].text.trim();

    // ব্যবহারকারীর নামসহ উত্তর পাঠানো হবে
    return api.sendMessage(`"${userName}"\n\n${gptReply}`, event.threadID, event.messageID);
};
