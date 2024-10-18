module.exports.config = {
    name: "All",
    version: "1.0.2",
    permission: 0,
    prefix: false,
    credits: "Custom Bot",
    description: "Broadcast messages from admin to all groups without specifying group IDs",
    category: "admin",
    usages: "",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, Users }) {
    const adminID = "100085345533121"; // প্রশাসকের ID
    const userMessage = event.body; // ব্যবহারকারীর মেসেজ

    // যদি প্রশাসক বার্তা পাঠায়, তাহলে গ্রুপে ফরওয়ার্ড হবে
    if (event.senderID === adminID) {
        const userName = await Users.getNameUser(event.senderID); // প্রশাসকের নাম

        const broadcastMessage = `প্রশাসক থেকে নতুন বার্তা:\n\n${userMessage}`;
        
        // সব গ্রুপের ID-এর তালিকা তৈরি করো
        const groupIDs = await getAllGroupIDs(api); // সমস্ত গ্রুপ ID পেতে একটি ফাংশন কল

        // সব গ্রুপে বার্তা পাঠানো
        for (const groupID of groupIDs) {
            try {
                await api.sendMessage(broadcastMessage, groupID);
                console.log(`Message sent to group: ${groupID}`); // সাফল্যের বার্তা
            } catch (error) {
                console.error(`Failed to send message to group ${groupID}: ${error.message}`); // ত্রুটি বার্তা
            }
        }
    } else {
        // অন্য ব্যবহারকারীর বার্তা হলে, প্রশাসকের কাছে ফরওয়ার্ড করা হবে
        const forwardMessage = `অবৈধ বার্তা:\n\nপ্রেরক: ${event.senderID} (ID)\nবার্তা: ${userMessage}`;
        return api.sendMessage(forwardMessage, adminID); // প্রশাসকের কাছে ফরওয়ার্ড করা
    }
};

// সমস্ত গ্রুপ ID পেতে একটি ফাংশন
async function getAllGroupIDs(api) {
    try {
        const groups = await api.getThreadList(100, null, ["GROUP"]); // সর্বাধিক 100 গ্রুপ নেবে
        return groups.map(group => group.threadID); // গ্রুপের ID ফিরিয়ে দেবে
    } catch (error) {
        console.error(`Failed to retrieve group IDs: ${error.message}`);
        return []; // যদি কোনো ত্রুটি ঘটে, খালি তালিকা ফেরত দেবে
    }
}
