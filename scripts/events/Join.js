module.exports.config = {
    name: "joinnoti",
    eventType: ['log:subscribe'],
    version: "1.0.0",
    credits: "Mirai-Team", // FIXED BY YAN Nayan
    description: "GROUP UPDATE NOTIFICATION"
};

const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const axios = require('axios');
const jimp = require("jimp");
const fontlink = 'https://drive.google.com/u/0/uc?id=10XFWm9F6u2RKnuVIfwoEdlav2HhkAUIB&export=download';
let PRFX = `${global.config.PREFIX}`;

module.exports.circle = async (image) => {
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

let suffix;

module.exports.run = async function({ api, event, Users }) {
    const moment = require("moment-timezone");
    var thu = moment.tz('Asia/Dhaka').format('dddd');
    const time = moment.tz("Asia/Dhaka").format("HH:mm:ss - DD/MM/YYYY");
    const { threadID } = event;

    if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
        return;
    }

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        let gifUrl = 'https://i.postimg.cc/SNQXkB0y/lv-0-20231018174834.gif';
        let gifPath = __dirname + '/Nayan/join/join.gif';

        try {
            const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(gifPath, response.data);

            api.changeNickname(`[ ${global.config.PREFIX} ] • ➠${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
            return api.sendMessage({
                body: `${global.config.BOTNAME} CONNECTED«\n\nAssalamualaykum☘️
                <------------------------------>  
                BOT CONNECTED SUCCESFUL !!! 

                APPROVAL ALLOW IN THIS GROUP!!!
                <------------------------------>\n\nTO VIEW ANY COMMAND Use👉${global.config.PREFIX}help\nSee command👉 ${global.config.PREFIX}command
                \n\EXAMPLE:👇\n${global.config.PREFIX}admin (information)\n${global.config.PREFIX}islam (video)\n${global.config.PREFIX}tik (link)\n${global.config.PREFIX}fbvideo (link)
                <------------------------------>
                AND FOR ANY COMPLAINTS OR CONTACT BOT OPERATOR 

                DEVELOPER :𝐎𝐌𝐎𝐑 𝐀𝐋𝐕𝐈 

                🟣Facebook Account Link: 
                https://www.facebook.com/nesha.jogoter.badsh.omor.alvi

                🔵WHATSAPP NUMBER: wa.me/+8801581033393

                🟢SUPPORT EMAIL: www.omoralvi01919@gmail.com`,
                attachment: fs.createReadStream(gifPath)
            }, threadID);
        } catch (error) {
            console.error("GIF Download Error:", error);
        }
    } else {
        try {
            if (!fs.existsSync(__dirname + `/Nayan/font/Semi.ttf`)) {
                const getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
                fs.writeFileSync(__dirname + `/Nayan/font/Semi.ttf`, Buffer.from(getfont, "utf-8"));
            }

            let { participantIDs, threadName } = await api.getThreadInfo(threadID);
            var abx = [];

            for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
                let pathImg = __dirname + `/Nayan/join/${o}.png`;
                let pathAva = __dirname + `/Nayan/join/avt.png`;
                let avtAnime = (await axios.get(`https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;

                var ok = [
                    'https://i.imgur.com/91gYp7B.jpeg',
                    'https://i.imgur.com/91gYp7B.jpeg',
                    'https://i.imgur.com/91gYp7B.jpeg',
                    'https://i.imgur.com/91gYp7B.jpeg',
                    'https://i.imgur.com/91gYp7B.jpeg'
                ];
                let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer" })).data;
                fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
                fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
                
                var avatar = await this.circle(pathAva);
                let baseImage = await loadImage(pathImg);
                let baseAva = await loadImage(avatar);
                registerFont(__dirname + `/Nayan/font/Semi.ttf`, { family: "Semi" });

                let canvas = createCanvas(1902, 1082);
                let ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
                ctx.fillStyle = "#FFF";
                ctx.textAlign = "center";
                ctx.font = `155px Semi`;
                ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20, canvas.height / 2 + 100);
                ctx.save();
                ctx.font = `75px Semi`;
                ctx.fillText(`Welcome to ${threadName}`, canvas.width / 2 - 15, canvas.height / 2 + 235);

                const number = participantIDs.length - o;
                suffix = (number === 11 || number === 12 || number === 13) ? "th" : ["st", "nd", "rd"][((number % 10) - 1 + 3) % 3] || "th";
                ctx.fillText(`You are the ${number}${suffix} member of this group`, canvas.width / 2 - 15, canvas.height / 2 + 350);
                ctx.restore();

                const imageBuffer = canvas.toBuffer();
                fs.writeFileSync(pathImg, imageBuffer);
                abx.push(fs.createReadStream(pathImg));
            }

            const msg = `Hello {name}\nWelcome to {threadName}\nyou're the {soThanhVien}th member on this group please enjoy"\n─────────────────\n[ {time} - {thu} ]`;
            const nameAuthor = await Users.getNameUser(event.author);
            const finalMsg = msg
                .replace(/\{name}/g, event.logMessageData.addedParticipants.map(participant => participant.fullName).join(', '))
                .replace(/\{threadName}/g, threadName)
                .replace(/\{time}/g, time)
                .replace(/\{thu}/g, thu);

            api.sendMessage({ body: finalMsg, attachment: abx }, threadID);
            for (let ii = 0; ii < event.logMessageData.addedParticipants.length; ii++) {
                fs.unlinkSync(__dirname + `/Nayan/join/${ii}.png`);
            }
        } catch (e)
