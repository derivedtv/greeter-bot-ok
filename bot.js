const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const prefix = '!';
const ownerid =  "160140367554019329"
const Music = require('discord.js-musicbot-addon');
const snekfetch = require("snekfetch");
const setupCMD = "!createrolemessage"
const weather = require('weather-js');

let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Fortnite", "Rocket League", "Overwatch", "RotMG", "GTAV"];
const reactions = ["444914030709178378", "444914415133917184", "444914414433337355", "444914412395036685", "444914415100231690"];
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateMessages(){
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
  return messages;
}

client.on("message", message => {
  if (message.author.id == "160140367554019329" && message.content.toLowerCase() == setupCMD){
      var toSend = generateMessages();
      let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
      for (let mapObj of mappedArray){
          message.channel.send(mapObj[0]).then( sent => {
              if (mapObj[1]){
                sent.react(mapObj[1]);  
              } 
          });
      }
  }
})


client.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
      
      let channel = client.channels.get(event.d.channel_id);
      let message = channel.fetchMessage(event.d.message_id).then(msg=> {
      let user = msg.guild.members.get(event.d.user_id);
      
      if (msg.author.id == client.user.id && msg.content != initialMessage){
     
          var re = `\\*\\*"(.+)?(?="\\*\\*)`;
          var role = msg.content.match(re)[1];
      
          if (user.id != client.user.id){
              var roleObj = msg.guild.roles.find('name', role);
              var memberObj = msg.guild.members.get(user.id);
              
              if (event.t === "MESSAGE_REACTION_ADD"){
                  memberObj.addRole(roleObj)
              } else {
                  memberObj.removeRole(roleObj);
              }
          }
      }
      })

  }   
});

client.on('guildMemberAdd', member => {
  
client.channels.get("409362377126182922").send({embed: {
    color: 0xff040b,
    author: {
      name: `New User | ${member.user.tag}`,
      icon_url: member.user.avatarURL
    },
    fields: [{
        name: "__**Username:**__",
        value: `${member.user}`,
        inline: true,
      },
      {
        name: "__**Account Created:**__",
        value: `${member.user.createdAt}`,
        inline: true,
      }
    ],
    footer: {
      text: "© ok hand#6327",
    }
  }
  });

  var joinrole = member.guild.roles.find('name', 'Members');
  
  member.addRole(joinrole)
});

client.on('message', function(message) {
  var args = message.content.split(" ");
  var cmd = args[0];

  args = args.splice(1);

       switch(cmd) {

        case "!mute":
        var ehh = message.guild.roles.find("name", "Muted");
        var pp = message.mentions.members.first();
        let mreason = args.slice(1).join(" ");
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (pp.roles.has(ehh.id)) {
                message.channel.send("That person is already muted!");
            } else {
                pp.addRole(ehh.id);
                pp.send("**You have been muted in " + message.guild + " for:**  `` " + mreason + "``");
                message.channel.send(message.guild.member(pp) + " **has been successfully muted!**");
            }
        } else {
            message.channel.send("You do not have the permission to use that command!");
            
            if (pp == null) {
              message.channel.send("You need to provide someone to kick!");
              }
        }
        break;

    case "!unmute":
        var eh = message.guild.roles.find("name", "Muted");
        var ppp = message.mentions.members.first();
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (ppp.roles.has(eh.id)) {
                ppp.removeRole(eh.id);
                ppp.send("**You have been unmuted in " + message.guild + "**");
                message.channel.send(message.guild.member(ppp) + " **has been successfully unmuted!**");
            } else {
                message.channel.send("That person is not muted!");
            }
        } else {
            message.channel.send("You do not have the permission to do that!")
        }
        break;

           
case "!update":
message.delete();

if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
message.delete();

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: "Bot Update",
    icon_url: client.user.avatarURL
  },
  fields: [{
      name: "__**Version**__",
      value: "2.3",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "12/17/18",
      inline: true,
    },
    {
      name: "__**Recent Update:**__",
      value: "Overall command cleanup as well as new staff commands, and a Christmas update"
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: "https://cdn.discordapp.com/avatars/411277964723093504/2538c95bd13aebfd10ebf0351889ba18.png?size=2048",
    text: "© ok hand#6327"
  }
}
});
break;
           
case "!info":
message.delete();

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: "Ok Bot Info",
    icon_url: client.user.avatarURL
  },
  fields: [{
      name: "__**Version**__",
      value: "2.3",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "12/17/18",
      inline: true,
    },
    {
      name: "__**Information**__",
      value: "Ok Bot was coded using JavaScript and the project started in early January of 2018."
    },
    {
      name: "__**Contributors**__",
      value: "N7ckgakis#2959, Vincent#0007, Hindsight#2020, ⌬ iHack#2712"
    },
    {
      name: "__**Testing**__",
      value: "A private testing server of Ok Bot is in the works, and will be released soon. For more information on becoming a tester, ask <@160140367554019329>."
    },
    {
      name: "__**Ok Hand Invite**__",
      value: "Invite people to Ok Hand : https://discord.gg/pQtbFpA"
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: "https://cdn.discordapp.com/avatars/160140367554019329/86941cff5d6b12ac93b0941dea2056cb.png?size=2048",
    text: "© ok hand#6327"
  }
}
});
break;

case "!countdown":
message.channel.send("5");

setTimeout(function(){ 
  message.channel.send("4");
}), 3000

setTimeout(function(){ 
  message.channel.send("3");
}), 3000

setTimeout(function(){ 
  message.channel.send("2");
}), 3000

setTimeout(function(){ 
  message.channel.send("1");
}), 3000

setTimeout(function(){ 
  message.channel.send("Go");
}), 3000
break;
           
case "!eval":
if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
return message.reply("You don't have the required role to use this!");

console.log(eval(message.content.slice(5).trim()));
break;

case "!weather":
message.delete();
weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { 
  if (err) message.channel.send(err);

  if (result === undefined || result.length === 0) {
      message.channel.send('**Please enter a valid location.**')
      return;
  }

  var current = result[0].current;
  var location = result[0].location;

  const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86) 
      .addField('Timezone',`UTC${location.timezone}`, true)
      .addField('Degree Type',location.degreetype, true)
      .addField('Temperature',`${current.temperature} Degrees`, true)
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds',current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)

      message.channel.send({embed})
})
break;
        
case "!apply":
let appid = Math.floor(Math.random() * 10100)

client.channels.get("429930040403296266").send({embed: {
  color: 0xff040b,
  author: {
    name: `Application | ${message.author.tag} `,
    icon_url: message.author.avatarURL
  },
  fields: [{
      name: "User",
      value: `${message.author}`,
      inline: true,
    },
    {
      name: "Application ID",
      value: `${appid}`,
      inline: true,
    }
  ],
  timestamp: new Date(),
  footer: {
    text: `ID: ${message.author.id}`,
  }
}
});

message.author.send(`Hello ${message.author}, your form will be sent shortly.\nYour application ID is ${appid}. Send this to a staff member if you feel your application has not yet been checked over.`);
setTimeout(function(){ 
message.author.send({embed: {
  color: 0xff040b,
  author: {
    name: `Application Form | ${message.author.tag}`,
    icon_url: message.author.avatarURL,
  },
  fields: [{
    name: "Use the link below to apply.",
    value: "[Apply Here](https://docs.google.com/forms/d/e/1FAIpQLSeymZws8ttc6lxAy65KdfX2DW-vxhx1699_KD6YcB5B6CvKrg/viewform?usp=sf_link)"
  },
 ],
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/160140367554019329/86941cff5d6b12ac93b0941dea2056cb.png?size=2048"
  },
  timestamp: new Date(),
  }}
);
}), 3000
break;
           
case "!announce":
message.delete();

if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
return;

let announcement = args.slice(0).join(' ');

if(!announcement)
return;

if(announcement)
client.channels.get('328434536616689664').send("@everyone")
client.channels.get('328434536616689664').send({embed: {
  color: 0xff040b,
  title: announcement,
  author: {
    name: `Announcement | ${message.author.tag}`,
    icon_url: message.author.avatarURL
  },
  footer: {
    text: "Please contact the staff for any problems you may have.",
}
}
})
break;

case "!fnwin":
let winpic = args.slice(0).join(' ');
message.delete();

if(!message.member.roles.some(r=>["Fortnite"].includes(r.name)) )
return message.reply("You don't have the required role to use this!");

if(!winpic)
return message.reply("Please include a screenshot link or gfycat link.")

client.channels.get("424336735179374612").send("**Victory Royale! **\n" + winpic)
message.delete();
message.reply("Good job on the win! Check <#424336735179374612> to see it!")
break;

case "!scriminfo":
let screc = message.mentions.users.first();
let scinfo = args.slice(0).join(' ');

if(!screc)
return;
 
if(!scinfo)
return;

message.mentions.users.first().send({embed: {
  color: 0xff040b,
  author: {
    name: client.user.username,
    icon_url: 'https://d1u5p3l4wpay3k.cloudfront.net/fortnite_gamepedia/thumb/e/e5/BattleRoyaleSkin92.png/256px-BattleRoyaleSkin92.png?version=aca2636b45874ed0a80303153fecd9d7'
  },
  thumbnail: {
    url: 'https://i0.wp.com/fortniteskins.net/wp-content/uploads/2018/05/black-shield-image.png?fit=512%2C512&ssl=1'
  },
  title: "**Fortnite Scrims**",
  description: "Read up on the info for the upcoming Fortnite scrims!",
  fields: [{
      name: "__**Team 1:**__",
      value: "Mxrs_, KWA aidan, Deviation, Watermalons",
      inline: true
    },
    {
      name: "__**Team 2:**__",
      value: "KWA Froxin, KWA OB, KWA Elevenity, KWA Void",
      inline: true
    },
    {
      name: "__**Time:**__",
      value: "The scrims will begin @11:00 PM EST."
    },
  ],
  timestamp: new Date(),
  footer: {
    text: "Anybody on the roster can be replaced if necessary.",
    icon_url: client.user.avatarURL,
  }
}
});
break;
           
case "!owranks":
  message.delete();
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
      name: client.user.username,
      icon_url: 'https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/thumb/7/73/Badge_8_Top_500.png/32px-Badge_8_Top_500.png?version=8fa9c593427e57990da33f762710042f'
    },
    thumbnail: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png'
    },
    title: "**Overwatch Ranks**",
    description: "These are all of the current Overwatch Commands.",
    fields: [{
        name: "__**Bronze**__",
        value: "Bronze is acheived in the SR range 1-1499."
      },
      {
        name: "__**Silver**__",
        value: "Silver is acheived in the SR range 1500-1999."
      },
      {
        name: "__**Gold**__",
        value: "Gold is acheived in the SR range 2000-2499."
      },
      {
        name: "__**Platinum**__",
        value: "Platinum is acheived in the SR range 2500-2999."
      },
      {
        name: "__**Diamond**__",
        value: "Diamond is acheived in the SR range 3000-3499."
      },
      {
        name: "__**Master**__",
        value: "Master is acheived in the SR range 3500-3999."
      },
      {
        name: "__**Grandmaster**__",
        value: "Grandmaster is acheived in any SR at 4000+."
      },
      {
        name: "__**Top 500**__",
        value: "To get Top 500, you must be among the __**top 500**__ players in your region. "
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
break;

case "!christmas":
message.delete();
message.guild.member(message.author).addRole("524393146239680548");
message.channel.send("The user " + message.author + " was given the role ``Christmas`` Merry Christmas!");
break;
           
case "!fortnite":
message.delete();
message.guild.member(message.author).addRole("409198125828538378");
message.channel.send("The user " + message.author + " was given the role ``Fortnite``");
break;

case "!rotmg":
message.delete();
message.guild.member(message.author).addRole("409198191796289546");
message.channel.send("The user " + message.author + " was given the role ``RotMG``");
break;

case "!overwatch":
message.delete();
message.guild.member(message.author).addRole("409198136347721739");
message.channel.send("The user " + message.author + " was given the role ``Overwatch``");
break;

case "!gtav":
message.delete();
message.guild.member(message.author).addRole("409198078894014465");
message.channel.send("The user " + message.author + " was given the role ``GTAV``");
break;

case "!rleague":
message.delete();
message.guild.member(message.author).addRole("409198133327953930");
message.channel.send("The user " + message.author + " was given the role ``Rocket League``");
break;

case "!rfortnite":
message.delete();
message.guild.member(message.author).removeRole("409198125828538378");
message.channel.send("The user " + message.author + " got ``Fortnite`` removed.");
break;

case "!rdesc":
message.delete();
let rduser = args.slice(0).join("");
let rdapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + rduser + "&f=c;"

snekfetch.get(rdapi).then(h => {
  let brddesc = h.body.description;

  message.channel.send(brddesc);
})
break;

case "!find":
message.delete();
let users = client.users;
let searchTerm = args[0];

if(!searchTerm) 
return message.channel.send("Please provide a name to search for!")

let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()))
let foundppl = matches.map(users => users.tag)

if(!foundppl)
return message.channel.send("There is nobody that matches that username!")

message.channel.send(foundppl);
break;

case "!rrotmg":
message.delete();
message.guild.member(message.author).removeRole("409198191796289546");
message.channel.send("The user " + message.author + " got ``RotMG`` removed.");
break;

case "!roverwatch":
message.delete();
message.guild.member(message.author).removeRole("409198136347721739");
message.channel.send("The user " + message.author + " got ``Overwatch`` removed.");
break;

case "!rgtav":
message.delete();
message.guild.member(message.author).removeRole("409198078894014465");
message.channel.send("The user " + message.author + " got ``GTAV`` removed.");
break;

case "!rrleague":
message.delete();
message.guild.member(message.author).removeRole("409198133327953930");
message.channel.send("The user " + message.author + " got ``Rocket League`` removed.");
break;

case "!purge":
let messagenumber = args.slice(0).join(' ');

if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
return message.reply ("You do not have the required permissions to use this!")

if(!messagenumber)
return message.reply("**Please include a number of messages to delete! (1-99)**\nExample: ``!purge 1``\n__**Make sure to add 1 more than the original amount.**__")

message.delete();

let messagecount = parseInt(messagenumber);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
break;

case "!vote":
message.delete();
let pollresponse = args.slice(0).join(' ');

if(!pollresponse)
return message.reply("Please include a question:\n``!vote test``\n*Command, Question*")

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  title: pollresponse,
  description: "Vote 👍 or 👎 for the below questionarre.",
  timestamp: new Date(),
}
})

.then(function (message) {
message.react('👍') 
message.react('👎');
})
break;

case "!love":
message.delete();
let lover = message.mentions.members.first();

if(!lover)
return message.reply("Please mention somebody to love!")

message.delete();
message.channel.send({embed: {
    color: 0xff040b,
    author: {
      name: "Love is in the air!",
      icon_url: client.user.avatarURL,
    },
    thumbnail: {
      url: "https://vignette.wikia.nocookie.net/shipping/images/6/66/Pixel_heart_icon.png/revision/latest?cb=20151011174450"
    },
    title: "**Incoming Love!**",
    description: "**Love sent by:** " + message.author + "\n**Love sent to::** " + lover,
    },
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
);
break;

case "!userinfo":
message.delete();
let uiembed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setDescription("This is " + message.author.username + "'s info!")
.setThumbnail(message.author.avatarURL)
.setColor("0xff040b")
.addField("Full Username:", `${message.author.username}#${message.author.discriminator}`)
.addField("User ID:", message.author.id)
.addField("Created At:", message.author.createdAt);

message.channel.sendEmbed(uiembed)
break;

case "!suggest":
message.delete();
let suggestion = args.slice(0).join(' ');

if (!suggestion)
return message.reply("Please include a suggestion for the bot!")

message.delete();
message.reply("Thank you for the suggestion!")
client.channels.get("424791795923156993").send({embed: {
    color: 0xff040b,
    author: {
      name: "New Suggestion!",
      icon_url: client.user.avatarURL,
    },
    title: "**Suggestion:**",
    description: suggestion,
    fields: [{
        name: "*Idea Sent in by:*",
        value: "" + message.author + "\n*Vote whether or not this is a good suggestion.*",
    }],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
})
.then(message=>{
    message.react("✅")
    message.react("❎")
  })
break;

  case "!rotmgchars":
  message.delete();
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    thumbnail: {
      url: 'https://steamuserimages-a.akamaihd.net/ugc/615025248066186198/CCF7A2CA7AAC3180249A4C8E8346C0DA68A4D839/'
    },
    title: "**Realm Characters**",
    description: "These are all of the current Realm of the Mad God characters.",
    fields: [{
        name: "__**Rogue**__ : Uses a medium ranged dagger. Special ability is cloaking.",
        value: "\u200b"
      },
      {
        name: "__**Archer**__ : Uses a long ranged bow. Special ability is shooting debuffs.",
        value: "\u200b"
      },
      {
        name: "__**Wizard**__ : Uses a long ranged staff. Special ability is burst of damage within a range.",
        value: "\u200b"
      },
      {
        name: "__**Priest**__ : Uses a long ranged wand. Special ability is AoE healing.",
        value: "\u200b"
      },
      {
        name: "__**Warrior**__ : Uses a short ranged sword. Special ability is berserk mode.",
        value: "\u200b"
      },
      {
        name: "__**Knight**__ : Uses a short ranged sword. Special ability is shield bash.",
        value: "\u200b"
      },
      {
        name: "__**Paladin**__ : Uses a short ranged sword. Special ability is AoE buff.",
        value: "\u200b"
      },
      {
        name: "__**Assassin**__ : Uses a medium ranged dagger. Special ability is throwing poisons that damage over time.",
        value: "\u200b"
      },
      {
        name: "__**Necromancer**__ : Uses a long ranged staff. Special ability is lifesteal.",
        value: "\u200b"
      },
      {
        name: "__**Huntress**__ : Uses a long ranged bow. Special ability is placing damaging traps.",
        value: "\u200b"
      },
      {
        name: "__**Mystic**__ : Uses a long ranged staff. Special ability is stasising enemies.",
        value: "\u200b"
      },
      {
        name: "__**Trickster**__ : Uses a medium ranged dagger. Special ability is sending out decoys.",
        value: "\u200b"
      },
      {
        name: "__**Sorcerer**__ : Uses a long ranged wand. Special ability is damage dealt across enemies.",
        value: "\u200b"
      },
      {
        name: "__**Ninja**__ : Uses a medium ranged katana. Special ability is shooting damaging shuriken.",
        value: "\u200b"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
  break;

case "!ping":
message.delete();
message.reply("Pong!")
break;

  case "!commands":
  message.delete();
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
    },
    thumbnail: {
      url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
    },
    title: "__**Commands (Page 1)**__",
    fields: [{
        name: "__**!ping**__",
        value: "This command pongs the user, which is a way to test bot status."
      },
      {
        name: "__**!hello**__",
        value: "This command replies Hey there!. Another way to test bot status."
      },
      {
        name: "__**!commands**__",
        value: "This command displays all available commands."
      },
      {
        name: "__**!avatar**__",
        value: "This command mentions you with a link to your profile picture. You can also mention other users to see their avatar."
      },
      {
        name: "__**!suggest**__",
        value: "This command will send me your suggestions for the bot."
      },
      {
        name: "__**!roll**__",
        value: "This command will roll a random number for you."
      },
      {
        name: "__**!userinfo**__",
        value: "This command will display your Discord account information."
      },
      {
        name: "__**!love**__",
        value: "This command will send love to a mentioned user."
      }
    ],
    footer: {
      text: "To see the other commands, use `!commands2`."
    }
  }
});
break;

case "!commands2":
message.delete();
message.channel.send({embed: {
color: 0xff040b,
author: {
},
thumbnail: {
  url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
},
title: "__**Commands (Page 2)**__",
fields: [{
  name: "__**!owranks**__",
  value: "Provides a detailed list of all current Overwatch competitive ranks and their SR ranges."
},
{
  name: "__**!youtube**__",
  value: "When used, it displays a search with whatever aregument came after !youtube."
},
{
  name: "__**!okinvite**__",
  value: "Displays an invite for Ok Hand."
},
{
  name: "__**!rotmgchars**__",
  value: "Displays a list of all current RotMG characters with weapons and abilities."
},
{
  name: "__**!info**__",
  value: "This command will display information about the bot."
},
{
  name: "__**Role Commands**__",
  value: "All role commands are in <#325861081631293442>."
}
],
footer: {
  text: "To see the other commands, use `!commands3`."
}
}
});
break;

case "!youtube":
message.delete();
  let youtube = args.slice(0).join("+");
  message.channel.send("https://www.youtube.com/results?search_query=" + youtube);
break;

case "hello":
  message.channel.send("Hey there!");
break;

case "!okinvite":
message.delete();
  message.author.send("**If you want to invite people to ok hand, use this link:** https://discord.gg/pQtbFpA");
break;

case "!avatar":
message.delete();
let avataruser = message.mentions.users.first();

if(avataruser)
return message.reply(avataruser.avatarURL);

if(!avataruser)
return message.reply(message.author.avatarURL);

break;

case "!roll":
message.delete();
  message.channel.send("**You rolled a **`" + Math.floor(Math.random() * 100) + "`");
break;

case "!coinflip":
message.delete();
var flip = Math.floor(Math.random() * 2 + 1);
if (flip === 1) {
  message.reply({embed: {
    color: 0xff040b,
    author: {
      name: `Coinflip | ${message.author.tag}`,
      icon_url: message.author.avatarURL,
    },
    thumbnail: {
      url: "http://www.clker.com/cliparts/7/d/e/0/139362185558690588heads-md.png"
    },
    title: `**${message.author.tag}, the coin landed** __**heads!**__`,
    },
    timestamp: new Date(),
    }
);
}
else {
  message.reply({embed: {
    color: 0xff040b,
    author: {
      name: `Coinflip | ${message.author.tag}`,
      icon_url: message.author.avatarURL,
    },
    thumbnail: {
      url: "http://www.clker.com/cliparts/4/a/2/6/1393621733287511319tails-md.png"
    },
    title: `**${message.author.tag}, the coin landed** __**tails!**__`,
    },
    timestamp: new Date(),
    }
);
}
break;

case "!kick":
let kickid = Math.floor(Math.random() * 10100)

if(!message.member.roles.some(r=>["Administrator", "Moderator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();

    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

      let kreason = args.slice(1).join(" ");
    if(!kreason)
      return message.reply("Please indicate a reason for the kick!");

      let kkreason = args.slice(1).join(' ');
      member.kick(kreason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      client.channels.get("429930040403296266").send({embed: {
        color: 0xff040b,
        author: {
          name: `Kick | ${member.user.tag} `,
          icon_url: member.user.avatarURL
        },
        fields: [{
            name: "User",
            value: `${member.user}`,
            inline: true,
          },
          {
            name: "Moderator",
            value: `${message.author}`,
            inline: true,
          },
          {
            name: "Reason",
            value: `${kreason}`,
            inline: true,
          },
          {
            name: "Kick ID",
            value: `${kickid}`,
            inline: true,
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `ID: ${member.user.id}`,
        }
      }
    });
    message.channel.send(`***${member.user.tag} was kicked.***`);
break;

case "!ban":
let bmember = message.mentions.members.first();
let banid = Math.floor(Math.random() * 10100)

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!bmember)
    return message.reply("Please mention a valid member of this server");
  if(!bmember.bannable) 
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let breason = args.slice(1).join(' ');
  if(!breason)
    return message.reply("Please indicate a reason for the ban!");
  
  bmember.ban(breason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    client.channels.get("429930040403296266").send({embed: {
      color: 0xff040b,
      author: {
        name: `Ban | ${bmember.user.tag} `,
        icon_url: bmember.user.avatarURL
      },
      fields: [{
          name: "User",
          value: `${bmember.user}`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${message.author}`,
          inline: true,
        },
        {
          name: "Reason",
          value: `${breason}`,
          inline: true,
        },
        {
          name: "Ban ID",
          value: `${banid}`,
          inline: true,
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `ID: ${bmember.user.id}`,
      }
    }
  });
  message.channel.send(`***✅ ${bmember.user.tag} was banned!***`);
  message.mentions.users.first().send(`You were warned in :ok_hand:, ${reason}.\nYour warning ID is ${warnid}. Please contact the staff to appeal your warning using this ID.`);
break;

case "!warn":
let members = message.mentions.members.first();
let warnid = Math.floor(Math.random() * 10100)

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!members)
    return message.reply("Please mention a valid member of this server!");

  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the warn!");
  
  message.channel.send(`***✅ ${members.user.tag} has been warned.***`);
  client.channels.get("429930040403296266").send({embed: {
    color: 0xff040b,
    author: {
      name: `Warn | ${members.user.tag} `,
      icon_url: members.user.avatarURL
    },
    fields: [{
        name: "User",
        value: `${members.user}`,
        inline: true,
      },
      {
        name: "Moderator",
        value: `${message.author}`,
        inline: true,
      },
      {
        name: "Reason",
        value: `${reason}`,
        inline: true,
      },
      {
        name: "Warning ID",
        value: `${warnid}`,
        inline: true,
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `ID: ${members.user.id}`,
    }
  }
});
  message.mentions.users.first().send(`You were warned in :ok_hand:, ${reason}.\nYour warning ID is ${warnid}. Please contact the staff to appeal your warning using this ID.`);
break;

       }
    
});

client.login(process.env.BOT_TOKEN)
