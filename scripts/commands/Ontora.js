module.exports.config = {
  name: "ontora",
  version: "1.0.1",
  permission: 0,
  credits: "★OMOR-ALVI★",
  prefix: false,
  description: "goibot",
  category: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  // Updated message list
  var tl = [
    "তুমি আমার জীবনের আলো, অন্তরা। 🌟💖",
    "প্রতিটি মুহূর্ত তোমার সাথে কাটাতে চাই, অন্তরা। ❤️✨",
    "তোমার হাসিতে আমার হৃদয় জয় হয়, অন্তরা। 😊💞",
    "তুমি যে রঙে আমার স্বপ্নগুলো রাঙিয়ে দাও, অন্তরা। 🎨💗",
    "তুমি আমার হৃদয়ের সুর, অন্তরা। 🎶💕",
    "তোমার ভালোবাসায় আমি হারিয়ে যাই, অন্তরা। 🌹💘",
    "যখন তুমি পাশে থাকো, তখন সব কিছু সম্ভব মনে হয়, অন্তরা। 🌈😍",
    "তুমি আমার জীবনের সেরা উপহার, অন্তরা। 🎁💓",
    "তোমার সাথে সময় কাটানো মানে একটি নতুন পৃথিবী আবিষ্কার করা। 🌍💖",
    "অন্তরা, তুমি আমার গল্পের সেরা অধ্যায়। 📖❤️",
    "তুমি আমার পৃথিবীকে ফুলের মত রাঙিয়ে দাও, অন্তরা। 🌸💖",
    "তুমি ছাড়া এই জীবন অসম্পূর্ণ, অন্তরা। 🌌💘",
    "তোমার ভালোবাসা আমার হৃদয়ের প্রতিটি ধড়কন। 💓🌟",
    "তুমি আমার স্বপ্নের রানী, অন্তরা। 👑❤️",
    "তুমি যখন হাসো, তখন পুরো পৃথিবী হাসে, অন্তরা। 😊🌼",
    "তোমার সাথে কাটানো প্রতিটি মুহূর্ত যেন একটি নতুন গান। 🎵💞",
    "তুমি আমার জীবনের সঙ্গীত, অন্তরা। 🎶💗",
    "তুমি আমার হৃদয়ের চাবি, অন্তরা। 🗝️❤️",
    "তুমি আমার প্রেমে আমি আবদ্ধ, অন্তরা। 🔒💘",
    "তুমি আমার প্রেমের রাজ্যে একমাত্র সম্রাজ্ঞী, অন্তরা। 👸💖",
    "তোমার চোখের দীপ্তিতে হারিয়ে যাই, অন্তরা। ✨💖",
    "তুমি আমার জীবনের জাদু, অন্তরা। 🪄❤️",
    "তুমি ছাড়া প্রতিটি দিন যেন শূন্য, অন্তরা। ☁️💘",
    "আমাদের ভালোবাসা যেন একটি অমর কাহিনী। 📖💞",
    "তুমি আমার প্রতিটি স্বপ্নের সঙ্গী, অন্তরা। 🌠💗",
    "তোমার স্নেহে আমি পরিপূর্ণ, অন্তরা। 🌹💕",
    "তুমি আমার হৃদয়ের স্পন্দন, অন্তরা। 💓🎶",
    "তোমার জন্য আমার প্রেমের সমুদ্র গভীর। 🌊💖",
    "তোমার ভালোবাসায় আমি জয়ী, অন্তরা। 🏆❤️",
    "তুমি আমার প্রতিটি নক্ষত্রের মধ্যে ছড়িয়ে আছো, অন্তরা। 🌌💘",
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];

  if (
    (event.body.toLowerCase() == "basar sobai kmon ache") ||
    (event.body.toLowerCase() == "Basar sobai kmon ache") ||
    (event.body.toLowerCase() == "Bsar sobi kmn ase") ||
    (event.body.toLowerCase() == "Basar sobay kamon ase") ||
    (event.body.toLowerCase() == "বাসার সবাই কেমন আছ") ||
    (event.body.toLowerCase() == "Basar sob kmn ase") ||
    (event.body.toLowerCase() == "tomar basar sobai kmon ache")
  ) {
    return api.sendMessage(
      "-আলহামদুলিল্লাহ-🌺-অনেক অনেক ভালো আছে তোমার বাসার সবাই কেমন আছে-💝🌻",
      threadID
    );
  }

  if (event.body.indexOf("অন্তরা") == 0 || event.body.indexOf("Ontora") == 0) {
    var msg = {
      body: `•━━━━━━━━━━━━━━━━━━━━━━━━━━━━━•\n${name}\n•━━━━━━━━━━━━━━━━━━━━━━━━━━━━━•\n\n\n•━━━━━━━━━━━━━━━━━━━━━━━━━━━━━•\n\n ${rand}\n\n•━━━━━━━━━━━━━━━━━━━━━━━━━━━━━•`,
    };
    return api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
