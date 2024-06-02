import { Client, IntentsBitField } from "discord.js";
import topics from "./topics.json" assert { type: "json" };
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const token = process.env.TOKEN;

client.on("ready", (e) => {
  console.log(`${e.user.tag} is online`);
});

client.on("interactionCreate", (e) => {
  if (!e.isChatInputCommand()) return;

  // add a yap
  if (e.commandName === "add") {
    const topic = e.options.get("topic").value;
    if (Object.keys(topics).includes(topic)) {
      e.reply({ content: "Already exists", ephemeral: true });
      return;
    }
    topics[topic] = new Date();
    // TODO: do forloop to make it not look cancer?
    fs.writeFileSync("./topics.json", JSON.stringify(topics), { utf8: true });
    e.reply(`${topic} has been added`);
  }

  // remove a yap
  if (e.commandName === "remove") {
    const topic = e.options.get("topic").value;
    if (!Object.keys(topics).includes(topic)) {
      e.reply({ content: "Does not exist", ephemeral: true });
      return;
    }
    // I LOVE JAVASCRIPT
    delete topics[topic];
    fs.writeFileSync("./topics.json", JSON.stringify(topics), { utf8: true });
    e.reply(`${topic} has been removed`);
  }

  // check current yap
  if (e.commandName === "check") {
    const topic = e.options.get("topic").value;
    const now = new Date();
    // Checks if key is there
    if (!Object.keys(topics).includes(topic)) {
      e.reply({ content: "Does not exist", ephemeral: true });
      return;
    }
    // yap is unset
    if (topics[topic] == null) {
      e.reply(`0 days since last yap about ${topic}`);
      topics[topic] = now;
      fs.writeFileSync("./topics.json", JSON.stringify(topics), { utf8: true });
    }
    const daysWhen = new Date(topics[topic]);
    const diffInMillis = Math.abs(daysWhen - now);
    const millisInDays = 24 * 60 * 60 * 1000;
    const diffInDays = diffInMillis / millisInDays;

    e.reply(`${diffInDays.toFixed(2)} days since last yap about ${topic}`);
  }

  // resets yap counter
  if (e.commandName === "reset") {
    const topic = e.options.get("topic").value;
    const now = new Date();
    // Checks if key is there
    if (!Object.keys(topics).includes(topic)) {
      e.reply({ content: "Does not exist", ephemeral: true });
      return;
    }
    // yap is unset
    if (topics[topic] == null) {
      e.reply(`0 days since last yap about ${topic}`);
      topics[topic] = now;
      fs.writeFileSync("./topics.json", JSON.stringify(topics), { utf8: true });
    }
    const daysWhen = new Date(topics[topic]);
    const diffInMillis = Math.abs(daysWhen - now);
    const millisInDays = 24 * 60 * 60 * 1000;
    const diffInDays = diffInMillis / millisInDays;

    topics[topic] = now;
    fs.writeFileSync("./topics.json", JSON.stringify(topics), { utf8: true });
    e.reply(`${diffInDays.toFixed(2)} days since last yap about ${topic}\n${topic} has been reset`);
  }
});

client.login(token);
