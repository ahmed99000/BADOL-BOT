module.exports.config = {
    name: "auto-reply-bangla",
    version: "1.0.0",
    permission: 0,
    prefix: false,
    credits: "OMOR-ALVI",
    description: "বাংলা ভাষায় অটো-রিপ্লাই ফিচার",
    category: "fun",
    usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require('axios');
    const prompt = args.join(" ");
    const userName = await Users.getNameUser(event.senderID);

    if (!prompt) return api.sendMessage("দয়া করে একটি প্রশ্ন বা ইনপুট প্রদান করুন!", event.threadID, event.messageID);

    // OpenAI API call
    const openaiApiKey = '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';
    const gptResponse = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: "text-davinci-003",
            prompt: prompt,  // User input
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

    // Response from ChatGPT
    const gptReply = gptResponse.data.choices[0].text.trim();

    // বাংলা ভাষায় রিপ্লাই করুণ
    const banglaReply = await translateToBangla(gptReply);

    // Send the reply with the user's name in Bengali
    return api.sendMessage(`"${userName}"\n\n${banglaReply}`, event.threadID, event.messageID);
};

// Helper function to translate English to Bengali
async function translateToBangla(text) {
    const translateResponse = await axios.post(
        'https://api.mymemory.translated.net/get',
        null,
        {
            params: {
                q: text,
                langpair: 'en|bn'
            }
        }
    );
    return translateResponse.data.responseData.translatedText;
}
