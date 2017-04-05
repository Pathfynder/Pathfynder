import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL="smtp://postmaster@pathfynder.ltd:cookies@smtp.mailgun.org:587";
    console.log(process.env);
    Accounts.urls.verifyEmail = function (token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url){
        var token = url.substring(url.lastIndexOf('/')+1, url.length);
        var newUrl = Meteor.absoluteUrl('reset-password/' + token);
        var str = 'Hello,\n';
        str+= 'To reset your password, please click the following link...\n';
        str+= newUrl;
        return str;
    }
    Accounts.emailTemplates.resetPassword.from = function () {
        // Overrides value set in Accounts.emailTemplates.from when resetting passwords
        return "PathFynder Support <no-reply@pathfynder.ltd>";
    };
    Accounts.emailTemplates.verifyEmail.from = function () {
        // Overrides value set in Accounts.emailTemplates.from when resetting passwords
        return "PathFynder Support <no-reply@pathfynder.ltd>";
    };
    Accounts.emailTemplates.verifyEmail.subject = function () {
        return "Verification Email for PathFynder"
    };
    Accounts.emailTemplates.resetPassword.subject = function () {
        return "Reset Password for PathFynder"
    };

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
    },
    checkEmailVerification: function(email) {
        var found_user = Meteor.users.findOne({ 'emails.address' : email });
        if(found_user){
            if(found_user.emails[0].verified == true){
                return "verified";
            }else{
                return "unverified";
            }
        }else{
            return "notfound";
        }
    },
    remove: function(userId, error) {
        console.log(userId);
        try {
            Meteor.users.remove(userId);
        } catch (e) {
            console.log('Something went wrong trying to delete account');
        }
    },
    setPassword: function(userId, newPassword, error) {
        console.log(newPassword);
        try {
            Accounts.setPassword(userId, newPassword);
        } catch (e) {
            console.log('Something went wrong trying to change password.');
        }
    }
});
Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    } else {
        user.profile = {};
    }
    user.profile.username = 'Anonymous';
    user.profile.university = '';
    user.profile.gradDate = '';
    user.profile.major = '';
    user.profile.majorBool = 1;
    user.profile.usernameBool = 1;
    user.profile.gradDateBool = 1;
    return user;
});
