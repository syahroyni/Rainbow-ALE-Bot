let RainbowSDK = require('rainbow-node-sdk');
let request = require('ajax-request');
let options = {
    "rainbow": {
        "host": "official",
    },
    "credentials": {
        "login": "alfred.bot.ale@gmail.com",
        "password": "Alcatel123!" 
    },

    "application": {
        "appID": "cff0b110a37c11e89c53193b3dce7a4b",
        "appSecret": "tP5rF8hktRdDlIS8J8JOdHGgcqgaCgSPKwjjxPDNWjMvKKFLmdjjGQ940uyLHAfh",
    },

    "logs": {
        "enableConsoleLogs": false,              
        "enableFileLogs": false,                
        "file": {
            "path": '/var/tmp/rainbowsdk/',     
            "level": 'debug'                 
        }
    },
    "im": {
        "sendReadReceipt": true
    }
};

let rainbowSDK = new RainbowSDK(options);
rainbowSDK.start();

let cacheCommand = {};

var user = [];
var userQuestion = [];
var question = ["Please rate the event : \n1. I'm enjoying the event, though I think there is some area that can be better\n2. It's good enough for me, I'm having fun tonight\n3. Excellent job !! I don't have any idea how you arrange this amazing event",
"What is your favorite session : \n1. The opening..It's soooo awesome\n2. ALE Welcome Note, so visionary !\n3. ALE Roadmap, it's really add my knowledge\n4. Partner Program, we love this kind of stuff\n5. Awarding, who don't love an award...MORE AWARD PLEASE\n6. I can't say much..I looooveeee it all",
"One last question, what is the support you need from ALE as a partner : \n1. Product Update and enablement \n2. Good discount level and insentive \n3. Demo Unit \n4. I think I will discuss with ALE personally"];
var answer = ["Perfect","Great to know you enjoy the event","That's it. Thank you for your time and don't forget to type #REDEEM to collect your exclusive souvenirs in registration desk."];
var feedback = [];
var redeem = [];


function getContact(jid){
    console.log("GET CONTACT");
    rainbowSDK.contacts.getContactByJid(jid).then((contact)=>{
        if (contact){
            console.log("CONTACT FOUND : "+contact.displayName);
            postData(contact);
        }else{
            console.log("CONTACT NOT FOUND");
        }
    }).catch((err) => {
        console.log(err)
    })
}
function sendMessage(message,jid){
    rainbowSDK.im.sendMessageToJid(message, jid);
}

rainbowSDK.events.on('rainbow_onstarted', () => {
    console.log("Rainbow Start");
});

rainbowSDK.events.on('rainbow_onconnected', () => {
   console.log("Rainbow Connected");
});

rainbowSDK.events.on('rainbow_onready', () => {
    console.log("Rainbow Ready");
});

rainbowSDK.events.on('rainbow_oncontactinformationchanged', function(contact){
    console.log("Contact Information Changed : "+contact.displayName);
});

rainbowSDK.events.on('rainbow_onmessagereceived', function(message) {
           console.log(message.content);
           console.log(message.fromJid);
          var response = "Balasan dari bot";
        if (message.content.toUpperCase() == "HAI" || message.content.toUpperCase() == "HI" || message.content.toUpperCase() == "HALO" || message.content.toUpperCase() == "HELLO"){
            response = "Hi, Welcome to ALE – Teledata Event. For more information regarding this event please choose : \n1. Agenda \n2. Feedback Form \n3. Asking Question \n4. Help to back to home menu";
            rainbowSDK.im.sendMessageToJid(response, message.fromJid);
        }else if(message.content.toUpperCase() == "#AGENDA" || message.content.toUpperCase() == "1"){
            response = "11.00 - 12.00 :\nLunch & Registration\n\n12.00 - 12.15 : \nOpening by Teledata \n\n12.15 - 12.30 : \nWelcome Speech By Kit Andal, Country Manager ALE Philippines \n\n12.30 - 13.15 : \nKeynote : Digital by Design \nAs we are entering the digital age, everything now designed to be survive in this digital era. From the way we live, to the way we communicate each other. To become competitive in this world, organizations have to designed the roadmap to fit with digital era. \n\n13.15 - 13.45 : \nEverything is Connected - The Rise of Hybrid Communication \n\n13.45 - 14.15 : \nDigital Age Networking - Foundation of IoT Era \n\n14.15 - 15.15 : \nPrivacy By Design - How Important Security on This Digital Age";
            rainbowSDK.im.sendMessageToJid(response, message.fromJid);
        }
        else if(message.content.toUpperCase() == "#FEEDBACK" || message.content.toUpperCase() == "2"){
            response = "Please go to this link, https://www.surveymonkey.com/r/SPYDCS6"
            rainbowSDK.im.sendMessageToJid(response, message.fromJid);
        }
        else if(message.content.toUpperCase() == "#QUESTION" || message.content.toUpperCase() == "3"){
            response = "Please go to this link, https://www.surveymonkey.com/r/SPYDCS6"
            rainbowSDK.im.sendMessageToJid(response, message.fromJid);
        }
        else if (message.content.toUpperCase() == "#HELP")
        {
            response = "I know you gonna lost without me, these are several things that I can help you with, please type :\n\n#Agenda to have a view on what we're doing tonight\n#HELP if you need me to repeat all the command";
            rainbowSDK.im.sendMessageToJid(response, message.fromJid);
        }
        
  		
   });