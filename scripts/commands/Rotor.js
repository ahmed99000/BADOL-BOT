module.exports.config = {
  name: "rotor",
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
    "I am ROTOE SOCKET, the king of darkness 🔌. My presence means destruction and chaos ⚠️.",
    "ROTOE SOCKET is here, where security is merely an illusion 🌌. When I arrive, enemies tremble in fear 👁️‍🗨️.",
    "I am ROTOE SOCKET, ruling the shadows 🌑. Where I exist, no one survives without fear ⚔️.",
    "Think you’re safe? I am ROTOE SOCKET 🔌, here to shatter your dreams ⚠️.",
    "Hiding in the depths of darkness, ROTOE SOCKET makes your fears a reality 🌌. There’s no escape ⚡!",
    "ROTOE SOCKET is here, ready to redefine the meaning of security 🔌. I’ve come to break the order ⚠️.",
    "I am ROTOE SOCKET, a shadow that melts away your safety 🌑. Get ready to be afraid ⚡.",
    "Inspiration from the dark, I am ROTOE SOCKET 🔌. Don't fool yourself into thinking you’re safe ⚠️.",
    "ROTOE SOCKET—where the secrets of the darkness unfold ⚡. Beware, I am coming 🌌.",
    "In silent steps, I am ROTOE SOCKET, and no one will escape ⚠️. I will shatter your security 🔌.",
    "ROTOE SOCKET, where the reign of darkness begins 🌑. I promise to fill you with fear ⚡.",
    "I am ROTOE SOCKET, and I will turn your fears into reality 🔌. There’s no chance to escape ⚠️.",
    "When the night deepens in darkness, I am ROTOE SOCKET 🌌. I will invade your unreal world ⚡.",
    "ROTOE SOCKET—where fear becomes real 🔌. You are not safe ⚠️.",
    "I am ROTOE SOCKET, ready to break down the symbol of your safety 🌑. Get ready for the darkness ⚡.",
    "In this kingdom of darkness, I am ROTOE SOCKET 🔌, here to awaken your nightmares ⚠️.",
    "ROTOE SOCKET—where I turn your security into fear 🌌. Be prepared ⚡.",
    "I am ROTOE SOCKET, and I am ready for an attack 🔌. Enemies will tremble ⚠️.",
    "When hope fades into darkness, I am ROTOE SOCKET 🌑. There’s no good news for you ⚡.",
    "ROTOE SOCKET—where your security crumbles 🔌. I am coming ⚠️.",
    "I am ROTOE SOCKET, and I will silently infiltrate your midst 🌌. Get ready to be afraid ⚡.",
    "When the wind of darkness blows, I am ROTOE SOCKET 🔌. Your life ends without security ⚠️.",
    "ROTOE SOCKET—where everything gets devoured by darkness 🌑. I am here; there’s no escape ⚡.",
    "I am ROTOE SOCKET, and I will rule your fears 🕶️. Get ready ⚠️.",
    "In the heart of darkness, I am ROTOE SOCKET 🔌. Security is just a tale 🌌.",
    "ROTOE SOCKET—I will set you free from the dark ⚡. But towards danger 🚨.",
    "I am ROTOE SOCKET, and I will shake your world 🌑. Get ready ⚠️.",
    "When chaos resides in the dark, I am ROTOE SOCKET 🔌. You are not safe ⚡.",
    "ROTOE SOCKET—where everything is cloaked in darkness ⚠️. Prepare to fear my arrival 🔌.",
    "I am ROTOE SOCKET, and I will turn your terrifying dreams into reality 🌌. There’s no escape ⚡."
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];

  if (
    (event.body.toLowerCase() == "Rotor k") ||
    (event.body.toLowerCase() == "rotor k") ||
    (event.body.toLowerCase() == "Rotor abar k") ||
    (event.body.toLowerCase() == "rotor ta abar k") ||
    (event.body.toLowerCase() == "বাসার সবাই কেমন আছ") ||
    (event.body.toLowerCase() == "Basar sob kmn ase") ||
    (event.body.toLowerCase() == "tomar basar sobai kmon ache")
  ) {
    return api.sendMessage(
      "ROTOE SOCKET, YOUR FATHER, BLACK HACKER 🌑. In the depths of darkness, I am all-powerful ⚡. Fear my name, for I bring chaos where safety once stood 🔌."

",
      threadID
    );
  }

  if (event.body.indexOf("rotor") == 0 || event.body.indexOf("Rotor") == 0) {
    var msg = {
      body: `•━━━━━━━━━━━ROTOR━━━━━━━━━━━━━•\n${name}\n•━━━━━━━━━━━━SOCKET━━━━━━━━━━━━•\n\n\n•━━━━━━━━━━━━━━━BLACK━━━━━━━━━•\n\n ${rand}\n\n•━━━━━━━━━━━━HACKER━━━━━━━━━━━━•`,
    };
    return api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
