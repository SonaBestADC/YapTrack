import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  {
    name: "check",
    description: "This shows the running count for a topic",
    options: [
      {
        name: "topic",
        description: "Which topic do you want to display",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: "reset",
    description: "This resets the count for a topic",
    options: [
      {
        name: "topic",
        description: "Which topic do you want to reset",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: "add",
    description: "Adds a yap to yap about",
    options: [
      {
        name: "topic",
        description: "Which topic do you want to add",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: "remove",
    description: "Removes yap",
    options: [
      {
        name: "topic",
        description: "Which topic do you want to remove",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands...");

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log("Commands registered successfully.");
  } catch (err) {
    console.error("Error registering commands:", err);
  }
})();
