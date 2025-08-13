const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (context) => {
    return {
        mentionedJid: [context.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363318387454868@newsletter',
            newsletterName: 'WELCOME',
            serverMessageId: 143
        }
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png'
];

const GroupEvents = async (client, event) => {
    try {
        const isGroup = isJidGroup(event.id);
        if (!isGroup) return;

        const groupMetadata = await client.groupMetadata(event.id);
        const participants = event.participants;
        const groupDesc = groupMetadata.desc;
        const memberCount = groupMetadata.participants.length;

        let groupPp;
        try {
            groupPp = await client.profilePictureUrl(event.id, 'image');
        } catch {
            groupPp = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const participant of participants) {
            const user = participant.split('@')[0];
            const time = new Date().toLocaleString();

            if (event.action === 'add' && config.WELCOME === 'true') {
                const welcomeMsg = 
                    '*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────*\n' +
                    '*│   ̇─̣─̇─̣〘 ωєℓ¢σмє 〙̣─̇─̣─̇*\n' +
                    '*│❀ нєу* @' + user + '\n' +
                    '*│❀ gʀσᴜᴘ* ' + groupMetadata.subject + '\n' +
                    '*├▢ gʀσᴜᴘ :* ' + groupMetadata.subject + '\n' +
                    '*├▢ мємвєʀs :* ' + memberCount + '*\n' +
                    '*├▢ тιмє :* ' + time + '\n' +
                    '*│● ѕтαу ѕαfє αɴ∂ fσℓℓσω*\n' +
                    '*│● ©ᴘσωєʀє∂ ву IBRAHIMA-BARRY-1.0-.м∂⎯꯭̽👑*\n' +
                    '*╰────────────────────*';

                await client.sendMessage(event.id, {
                    image: { url: groupPp },
                    caption: welcomeMsg,
                    mentions: [participant],
                    contextInfo: getContextInfo({ sender: participant })
                });
            } 
            else if (event.action === 'remove' && config.GOODBYE === 'true') {
                const goodbyeMsg = 
                    '*╭────⬡ αᴄтισɴ-ѕтαтᴜs ⬡────*\n' +
                    '*│   ̇─̣─̇─̣〘 gσσ∂вує 〙̣─̇─̣─̇*\n' +
                    '*│❀ ᴜѕєʀ* @' + user + '\n' +
                    '*│● мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ*\n' +
                    '*│● мємвєʀs ' + memberCount + '*\n' +
                    '*│● ©ᴘσωєʀє∂ ву IBRAHIMA-BARRY-1.0-.м∂⎯꯭̽👑*\n' +
                    '*╰────────────────────*';

                await client.sendMessage(event.id, {
                    image: { url: groupPp },
                    caption: goodbyeMsg,
                    mentions: [participant],
                    contextInfo: getContextInfo({ sender: participant })
                });
            } 
            else if (event.action === 'promote' && config.ADMIN_STATUS === 'true') {
                const author = event.author.split('@')[0];
                const promoteMsg = 
                    '*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n' +
                    '*│● @' + author + ' нαѕ ᴘʀσмσтє∂ @' + user + ' тσ α∂мιɴ*\n' +
                    '*├▢ тιмє :* ' + time + '*\n' +
                    '*├▢ gʀσᴜᴏ : ' + groupMetadata.subject + '\n' +
                    '*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*';

                await client.sendMessage(event.id, {
                    text: promoteMsg,
                    mentions: [event.author, participant],
                    contextInfo: getContextInfo({ sender: event.author })
                });
            } 
            else if (event.action === 'demote' && config.ADMIN_STATUS === 'true') {
                const author = event.author.split('@')[0];
                const demoteMsg = 
                    '*╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──*\n' +
                    '*│● @' + author + ' нαѕ ∂ємσтє∂ @' + user + ' fʀσм α∂мιɴ*\n' +
                    '*├▢ тιмє :* ' + time + '*\n' +
                    '*├▢ gʀσᴜᴘ : ' + groupMetadata.subject + '*\n' +
                    '*╰┉┉┉┉┈┈┈┈┈┈┈┈┉┉┉᛫᛭*';

                await client.sendMessage(event.id, {
                    text: demoteMsg,
                    mentions: [event.author, participant],
                    contextInfo: getContextInfo({ sender: event.author })
                });
            }
        }
    } catch (error) {
        console.error('Group event error:', error);
    }
};

module.exports = GroupEvents;