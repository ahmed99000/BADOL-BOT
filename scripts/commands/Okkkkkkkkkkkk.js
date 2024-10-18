module.exports.config = {
  name: "been",
  version: "1.0.1",
  permission: 0,
  credits: "★OMOR-ALVI★",
  prefix: false,
  description: "Stops the bot from responding after 'been' is triggered for a specific user, and 'unbeen' will activate it again.",
  category: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, senderID } = event; // senderID যুক্ত করা হয়েছে

  // যদি "been" চালু থাকে এবং মেসেজ "unbeen" হয়
  if (isBeenActivated && senderID === blockedUserID && event.body.toLowerCase() === "unbeen") {
    isBeenActivated = false; // "unbeen" দিয়ে বট পুনরায় চালু
    blockedUserID = null; // ব্লক করা ইউজার রিসেট
    return api.sendMessage("বট পুনরায় চালু হয়ে গেছে এবং আবার কাজ করবে।", threadID, messageID);
  }

  // যদি "been" চালু থাকে, এবং ব্লক করা ইউজার থেকে মেসেজ আসলে কিছু করবে না
  if (isBeenActivated && senderID === blockedUserID) return;

  // যদি মেসেজ "been" হয়
  if (event.body.toLowerCase() === "been") {
    isBeenActivated = true; // "been" দিয়ে বট বন্ধ করা হচ্ছে
    blockedUserID = senderID; // যে ইউজারকে ব্লক করা হচ্ছে তার UID সংরক্ষণ
    return api.sendMessage("বট " + senderID + " এর জন্য বন্ধ হয়ে গেছে এবং আর কোনো কমান্ড শুনবে না।", threadID, messageID);
  }

  // অন্যান্য মেসেজ বা কমান্ড হ্যান্ডেল করার লজিক
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
  // এখানে কোনো কোড দরকার নেই
};
