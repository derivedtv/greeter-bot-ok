const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const prefix = '!';
const ownerid =  "160140367554019329"
const Music = require('discord.js-musicbot-addon');
const snekfetch = require("snekfetch");
const setupCMD = "!createrolemessage"
const weather = require('weather-js');

//const music = new Music(client, {
 // prefix: "!",
 // maxQueueSize: "100",
 // disableLoop: true,
 // leaveHelp: "Bad help text.",
 // leaveAlt: ["lve","leev","un1c0rns"],
 // helpCmd: 'mhelp',
 // leaveCmd: 'begone',
//  ownerOverMember: true,
 // botOwner: '160140367554019329',
 // youtubeKey: 'AIzaSyCNWoy8GsBCwu1A0TpC6SCE9xIQDE50kgI'
//});

let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Fortnite", "Rocket League", "Overwatch", "RotMG", "GTAV", "Minecraft"];
const reactions = ["444914030709178378", "444914415133917184", "444914414433337355", "444914412395036685", "444914415100231690", "541381125881331722"];
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
      text: "© ok hand #1903",
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
           
case "!update":
message.delete();

if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
message.delete();

client.channels.get("430525498968506368").send({embed: {
  color: 0xff040b,
  author: {
    name: "Bot Update",
    icon_url: client.user.avatarURL
  },
  fields: [{
      name: "__**Version**__",
      value: "2.4",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "2/2/19",
      inline: true,
    },
    {
      name: "__**Recent Update:**__",
      value: "Music commands brought back after months of technical difficulty! Cleaned some commands, added !say command for everyone, added new staff commands, changed permissions and cleaned channel permissions for staff."
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: "https://cdn.discordapp.com/avatars/160140367554019329/11aeeb672d6350f17109df860ba849fc.png?size=2048",
    text: "© ok hand#1903"
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
      value: "2.4",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "2/2/19",
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
    icon_url: "https://cdn.discordapp.com/avatars/160140367554019329/11aeeb672d6350f17109df860ba849fc.png?size=2048",
    text: "© ok hand#1903"
  }
}
});
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

//case "!christmas":
//message.delete();
//message.guild.member(message.author).addRole("524393146239680548");
//message.channel.send("The user " + message.author + " was given the role ``Christmas`` Merry Christmas!");
//break;
           
case "!fortnite":

if(message.member.roles.some(r=>["Fortnite"].includes(r.name)) )
return message.reply ("You already have the Fortnite role!")

message.delete();
message.guild.member(message.author).addRole("409198125828538378");
message.channel.send("The user " + message.author + " was given the role ``Fortnite``");
break;

case "!minecraft":

if(message.member.roles.some(r=>["Minecraft"].includes(r.name)) )
return message.reply ("You already have the Minecraft role!")

message.delete();
message.guild.member(message.author).addRole("541380629053571082");
message.channel.send("The user " + message.author + " was given the role ``Minecraft``");
break;

case "!rotmg":

if(message.member.roles.some(r=>["RotMG"].includes(r.name)) )
return message.reply ("You already have the RotMG role!")

message.delete();
message.guild.member(message.author).addRole("409198191796289546");
message.channel.send("The user " + message.author + " was given the role ``RotMG``");
break;

case "!overwatch":

if(message.member.roles.some(r=>["Overwatch"].includes(r.name)) )
return message.reply ("You already have the Overwatch role!")

message.delete();
message.guild.member(message.author).addRole("409198136347721739");
message.channel.send("The user " + message.author + " was given the role ``Overwatch``");
break;

case "!gtav":

if(message.member.roles.some(r=>["GTAV"].includes(r.name)) )
return message.reply ("You already have the Grand Theft Auto V role!")

message.delete();
message.guild.member(message.author).addRole("409198078894014465");
message.channel.send("The user " + message.author + " was given the role ``GTAV``");
break;

case "!rleague":

if(message.member.roles.some(r=>["Rocket League"].includes(r.name)) )
return message.reply ("You already have the Rocket League role!")

message.delete();
message.guild.member(message.author).addRole("409198133327953930");
message.channel.send("The user " + message.author + " was given the role ``Rocket League``");
break;

case "!rminecraft":

if(!message.member.roles.some(r=>["Minecraft"].includes(r.name)) )
return message.reply ("You don't have the Minecraft role!")

message.delete();
message.guild.member(message.author).removeRole("541380629053571082");
message.channel.send("The user " + message.author + " got ``Minecraft`` removed.");
break;

case "!rfortnite":

if(!message.member.roles.some(r=>["Fortnite"].includes(r.name)) )
return message.reply ("You don't have the Fortnite role!")

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

if(!message.member.roles.some(r=>["RotMG"].includes(r.name)) )
return message.reply ("You don't have the RotMG role!")

message.delete();
message.guild.member(message.author).removeRole("409198191796289546");
message.channel.send("The user " + message.author + " got ``RotMG`` removed.");
break;

case "!roverwatch":

if(!message.member.roles.some(r=>["Overwatch"].includes(r.name)) )
return message.reply ("You don't have the Overwatch role!")

message.delete();
message.guild.member(message.author).removeRole("409198136347721739");
message.channel.send("The user " + message.author + " got ``Overwatch`` removed.");
break;

case "!rgtav":

if(!message.member.roles.some(r=>["GTAV"].includes(r.name)) )
return message.reply ("You don't have the Grand Theft Auto V role!")

message.delete();
message.guild.member(message.author).removeRole("409198078894014465");
message.channel.send("The user " + message.author + " got ``GTAV`` removed.");
break;

case "!rrleague":

if(!message.member.roles.some(r=>["Rocket League"].includes(r.name)) )
return message.reply ("You don't have the Rocket League role!")

message.delete();
message.guild.member(message.author).removeRole("409198133327953930");
message.channel.send("The user " + message.author + " got ``Rocket League`` removed.");
break;

case "!purge":
let messagenumber = args.slice(0).join(' ');

if(!messagenumber)
return message.reply("**Please include a number of messages to delete! (1-99)**\nExample: ``!purge 1``\n__**Make sure to add 1 more than the original amount.**__")

message.delete();
client.channels.get("429930040403296266").send({embed: {
    color: 0xff040b,
    author: {
      name: `Purge | ${message.author.tag} `,
      icon_url: message.author
    },
    fields: [{
        name: "Purge Amount",
        value: `${messagenumber}`,
        inline: true,
      },
      {
        name: "Moderator",
        value: `${message.author}`,
        inline: true,
      },
      {
        name: "Purge ID",
        value: `${purgeid}`,
        inline: true,
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `ID: ${message.author.id}`,
    }
  }
});
           
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
  description: "Vote 👍 or 👎 for the above questionarre.",
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

case "!ping":
message.delete();
message.channel.send(`Pong! Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
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

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader", "Security", "Moderator"].includes(r.name)) )
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

case "!mute":
let mmembers = message.mentions.members.first();
let muteid = Math.floor(Math.random() * 10100)

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader", "Security", "Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!mmembers)
    return message.reply("Please mention a valid member of this server!");

  let mreason = args.slice(1).join(' ');
  if(!mreason)
    return message.reply("Please indicate a reason for the mute!");
  
  mmembers.addRole("411288455201423361")
  message.channel.send(`***✅ ${mmembers.user.tag} has been muted.***`);
  client.channels.get("429930040403296266").send({embed: {
    color: 0xff040b,
    author: {
      name: `Mute | ${mmembers.user.tag} `,
      icon_url: mmembers.user.avatarURL
    },
    fields: [{
        name: "User",
        value: `${mmembers.user}`,
        inline: true,
      },
      {
        name: "Moderator",
        value: `${message.author}`,
        inline: true,
      },
      {
        name: "Reason",
        value: `${mreason}`,
        inline: true,
      },
      {
        name: "Mute ID",
        value: `${muteid}`,
        inline: true,
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `ID: ${mmembers.user.id}`,
    }
  }
});
  message.mentions.users.first().send(`You were muted in :ok_hand:, ${mreason}.\nYour mute ID is ${muteid}. Please contact the staff to appeal your mute using this ID.`);
break;

case "!say":
message.delete();

let saidmessage = args.slice(0).join(" ");

if(!saidmessage)
return message.reply("You forgot to include something after `!say`.")

if(saidmessage.includes("nigger", "faggot", "nigga", "n igga", "n igger", "ni gger", "gay", "gey", "fag", "fagg", "faggo t"))
return message.reply("Using that language will result in a ban if used further");

const sayembed = new Discord.RichEmbed()
      .setDescription(`**${saidmessage}**`)
      .setAuthor(`${message.author.tag}`)
      .setThumbnail(`${message.author.avatarURL}`)
      .setColor(0x00AE86) 

      message.channel.sendEmbed(sayembed)
break;

case "!warnmute":
let wmid = Math.floor(Math.random() * 10100)
let wmmembers = message.mentions.members.first();
let wmreason = args.slice(1).join(" ");

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader", "Security", "Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

  if(!wmmembers)
    return message.reply("Please mention a valid member of this server!");
 
  if(!wmreason)
    return message.reply("Please include a reason for the warn/mute!")

wmmembers.addRole("411288455201423361");

message.channel.send(`***✅ ${wmmembers.user.tag} has been warned and muted.***`);
    
client.channels.get("429930040403296266").send({embed: {
  color: 0xff040b,
      author: {
        name: `Warn/Mute | ${wmmembers.user.tag} `,
        icon_url: wmmembers.user.avatarURL
      },
      fields: [{
          name: "User",
          value: `${wmmembers.user}`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${message.author}`,
          inline: true,
        },
        {
          name: "Reason",
          value: `${wmreason}`,
          inline: true,
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `ID: ${wmmembers.user.id}`,
      }
    }
  });

    message.mentions.users.first().send(`You were warned and muted in :ok_hand:, ${wmreason}`);
break;

case "!unmute":
let mmmembers = message.mentions.members.first();

  if(!message.member.roles.some(r=>["Administrator", ":ok_hand:", "Officer", "Admin", "Head Raid leader", "Security", "Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!mmmembers)
    return message.reply("Please mention a valid member of this server!");
  
  mmmembers.removeRole("411288455201423361");

  message.channel.send(`***✅ ${mmmembers.user.tag} has been unmuted.***`);
  client.channels.get("429930040403296266").send({embed: {
    color: 0xff040b,
    author: {
      name: `Unmute | ${mmmembers.user.tag} `,
      icon_url: mmmembers.user.avatarURL
    },
    fields: [{
        name: "User",
        value: `${mmmembers.user}`,
        inline: true,
      },
      {
        name: "Moderator",
        value: `${message.author}`,
        inline: true,
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `ID: ${mmmembers.user.id}`,
    }
  }
});
  message.mentions.users.first().send(`You were unmuted in :ok_hand:`);
break;

       }
    
});

client.login(process.env.BOT_TOKEN)
