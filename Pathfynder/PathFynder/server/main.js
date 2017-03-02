import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL='smtp://allenkenobi2@sandboxe19a2b27f9c341a88a7a405dbb68cf95.mailgun.org:cookies@smtp.mailgun.org:587';
    console.log(process.env);
    Accounts.urls.verifyEmail = function (token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url){
        var token = url.substring(url.lastIndexOf('/')+1, url.length);
        var newUrl = Meteor.absoluteUrl('reset-password/' + token);
        var str = 'Hello,\n';
        str+= 'To reset your password, please click follow link...\n';
        str+= newUrl;
        return str;
    }
});
//Accounts.urls.verifyEmail = function (token) {
//   return Meteor.absoluteUrl('verify-email/' + token);
//}
//Accounts.urls.resetPassword = function(token) {
//    return Meteor.absoluteUrl('reset-password/' + token);
//};
Meteor.methods({
    serverVerifyEmail: function(email, userId, callback) {
        console.log("Email to verify:" +email + " | userId: "+userId);
        // this needs to be done on the server.
        Accounts.sendVerificationEmail(userId, email);
        if (typeof callback !== 'undefined') {
            callback();
        }
    }
});