const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'imgsearch',
  alias: ['img','pin','image'],
  react: '🔍',
  desc: 'Search for images on Google',
  category: 'image',
  filename: __filename
}, async (conn, mek, m, { body, reply }) => {
    const text = body.trim().replace(/^\.\w+\s?/, '').trim();
    if (!text) return reply(`╔════════════════════╗
║
║  ❗ *MANQUE DE TEXTE* ❗
║  Ex: .image chats
║
╚════════════════════╝`);

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        const apiResponse = await axios.get(`https://apis.davidcyriltech.my.id/googleimage`, {
            params: { query: text }
        });

        const { success, results } = apiResponse.data;

        if (!success || !results || results.length === 0) {
            return reply(`╔════════════════════╗
║
║  ❌ *AUCUN RÉSULTAT* ❌
║  "${text}"
║
╚════════════════════╝`);
        }

        const maxImages = Math.min(results.length, 5);
        for (let i = 0; i < maxImages; i++) {
            await conn.sendMessage(m.chat, {
                image: { url: results[i] },
                caption: `╔════════════════════╗
║  🖼️ *KYOTAKA IMAGE SEARCH*
║
║  🔍 *Recherche:* "${text}"
║  📌 *Résultat:* ${i + 1}/${maxImages}
║
╚════════════════════╝`
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        reply(`╔════════════════════╗
║
║  ❌ *ERREUR* ❌
║  Problème de recherche
║
╚════════════════════╝`);
    }
});

cmd({
  pattern: "img2",
  alias: ["image2", "pinterest2", "pinimg2"],
  react: '🖼️',
  desc: "Search images from Pinterest",
  category: "image",
  use: ".img2 <keywords>",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) return reply(`╔════════════════════╗
║
║  ❗ *MANQUE DE TEXTE* ❗
║  Ex: .img2 paysages
║
╚════════════════════╝`);

    reply(`╔════════════════════╗
║
║  🔍 *Recherche:* ${query}...
║
╚════════════════════╝`);

    const apiUrl = 'https://apis.davidcyriltech.my.id/googleimage?query=' + encodeURIComponent(query);
    const response = await axios.get(apiUrl);

    if (!response.data?.result?.length) {
      return reply(`╔════════════════════╗
║
║  ❌ *AUCUN RÉSULTAT* ❌
║  "${query}"
║
╚════════════════════╝`);
    }

    const images = response.data.result;
    let sentCount = 0;

    for (let i = 0; i < Math.min(images.length, 5); i++) {
      if (images[i].images_url) {
        await conn.sendMessage(m.chat, {
          image: { url: images[i].images_url },
          caption: `╔════════════════════╗
║  🖼️ *KYOTAKA PINTEREST*
║
║  📌 *Résultat:* ${sentCount + 1}/5
║
╚════════════════════╝`
        }, { quoted: mek });
        sentCount++;
      }
    }

    if (sentCount === 0) {
      reply(`╔════════════════════╗
║
║  ❌ *IMAGES INVALIDES* ❌
║
╚════════════════════╝`);
    }

  } catch (error) {
    reply(`╔════════════════════╗
║
║  ❌ *ERREUR* ❌
║  ${error.message}
║
╚════════════════════╝`);
  }
});