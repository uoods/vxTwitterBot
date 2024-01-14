const { Client, GatewayIntentBits, WebhookClient } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Ensure this intent is enabled in your Discord Developer Portal
    ]
});

const webhookURLs = {
    '521434568176435266': 'https://discord.com/api/webhooks/1195854699547611332/uu_NkyKvjk7aqEmrOufEo-RtgTSA2qi6mrZqM3X1FtltidaVv6nMBHQZ01tE8CJyq_yP',
    '1193469681110106176': 'https://discord.com/api/webhooks/1195853875320725575/bevmRYuDbJUGk8JqIaGAxAD_FY_XHZ8kuzeQRBItZvtNHfjJrmGRvXEfutFzKE97P-wX'
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore bot messages
  
    const linkRegex = /https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/g;
    if (linkRegex.test(message.content)) {
      // Determine which webhook URL to use based on the channel ID
      const webhookUrl = webhookURLs[message.channel.id];
      
      if (webhookUrl) {
          const webhookClient = new WebhookClient({ url: webhookUrl });
  
          let newText = message.content.replace(linkRegex, (matched) => {
            // Replace both 'twitter.com' and 'x.com' with 'vxtwitter.com'.
            return matched.replace(/twitter\.com|x\.com/, 'vxtwitter.com');
          });
  
          try {
              await webhookClient.send({
                content: newText,
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL()
              });
  
              // Optional: Delete the original message
              await message.delete();
          } catch (error) {
              console.error('Error sending message with webhook:', error);
          }
      }
    }
  });
client.login('MTE5NTg0NjQ2Njc3ODk3NjM2Nw.G-X20L.3MLvDmHK8iJ2uLTUzNNiSj9k07GLF9kzSUpbNA');
