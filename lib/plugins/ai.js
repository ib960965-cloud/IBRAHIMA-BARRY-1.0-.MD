const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "gpt",
    alias: "ai",
    desc: "Interact with ChatGPT using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("*⚠️ Veuillez fournir une question pour ChatGPT.*\n\n*Exemple:*\n*.gpt Qu'est-ce que l'IA ?*");

        const text = q;
        const encodedText = encodeURIComponent(text);

        const url = `https://api.dreaded.site/api/chatgpt?text=${encodedText}`;

        console.log('Requesting URL:', url);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
            }
        });

        console.log('Full API Response:', response.data);

        if (!response || !response.data || !response.data.result) {
            return reply("❌ Le bot ne répond pas. Réessayez plus tard.");
        }

        const gptResponse = response.data.result.prompt;

        if (!gptResponse) {
            return reply("❌ Format de réponse inattendu de l'API. Réessayez plus tard.");
        }

        const ALIVE_IMG = 'https://files.catbox.moe/l992li.jpeg';

        const formattedInfo = `*🤖 ʀᴇ́ᴘᴏɴsᴇ ᴅᴇ ᴄʜᴀᴛɢᴘᴛ:*\n\n${gptResponse}`;

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'IBRAHIMA-BARRY-1.0-.𝐌ᴅ 𝐀𝐈 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Erreur dans la commande GPT:", error);

        if (error.response) {
            console.log("Réponse d'erreur:", error.response.data);
        } else {
            console.log("Détails de l'erreur:", error.message);
        }

        const errorMessage = `
❌ Une erreur est survenue lors de la commande GPT.
🛠 *Détails :*
${error.message}

Veuillez réessayer plus tard.
        `.trim();
        return reply(errorMessage);
    }
});

cmd({
    pattern: "llama3",
    desc: "Get a response from Llama3 AI using the provided prompt.",
    category: "ai",
    react: "🤖",
    filename: __filename,
    use: ".llama3 <your prompt>"
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ Veuillez fournir une requête pour Llama3 AI.");

        await reply("> *IBRAHIMA BARRY traite votre requête...*");

        const apiUrl = `https://api.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;

        const response = await axios.get(apiUrl);
        console.log("Réponse de l'API Llama3 :", response.data);

        let llamaResponse;
        if (typeof response.data === "string") {
            llamaResponse = response.data.trim();
        } else if (typeof response.data === "object") {
            llamaResponse = response.data.response || response.data.result || JSON.stringify(response.data);
        } else {
            llamaResponse = "Impossible de traiter la réponse de l'IA.";
        }

        const AI_IMG = 'https://files.catbox.moe/rk78tl.jpg';

        const formattedInfo = `*🤖 ʀᴇ́ᴘᴏɴsᴇ ᴅᴇ ʟʟᴀᴍᴀ3:*\n\n${llamaResponse}`;

        await conn.sendMessage(from, {
            image: { url: AI_IMG },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'IBRAHIMA-BARRY-1.0-.𝐌ᴅ 𝐀𝐈 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Erreur dans la commande llama3:", error);
        return reply(`❌ Une erreur est survenue : ${error.message}`);
    }
});

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Veuillez fournir une question pour OpenAI.\nExemple : `.openai Bonjour`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("Le bot ne répond pas pour le moment. Veuillez réessayer.");
        }

        await reply(`🧠 *Réponse OpenAI :*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Erreur dans la commande OpenAI:", e);
        await react("❌");
        reply("Une erreur est survenue avec OpenAI.");
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Veuillez fournir une requête pour DeepSeek AI.\nExemple : `.deepseek Bonjour`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI ne répond pas pour le moment. Veuillez réessayer.");
        }

        await reply(`🧠 *Réponse DeepSeek :*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("Erreur dans la commande DeepSeek:", e);
        await react("❌");
        reply("Une erreur est survenue avec DeepSeek AI.");
    }
});