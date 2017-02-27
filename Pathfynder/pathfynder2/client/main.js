/**
 * Created by Brad on 2/26/2017.
 */
var isSignedIn = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        Router.go("login");
    }
    else {
        this.next();
    }
}

Router.onBeforeAction(isSignedIn, {except: ['register', 'login']});

Router.route('/register', {
    name: 'register',
    template: 'register'
});

Router.route('/login', {
    name: 'login',
    template: 'login'
});

Router.route('/', {
    name: 'home',
    template: 'home',
});

Router.route('/faq' , {
    name: 'faq',
    template: 'faq'
});

Template.register.events ({
    'submit form': function() {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('home');
    }
})

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
        Router.go('home');
    }
})

Template.home.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
})

Template.faq.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
})

Meteor.loginWithPassword(email, password, function(error) {
    //this will be where we can check .edu
    if (error) {
        console.log(error.reason);
    }
    else {
        Router.go("home");
    }
})

Accounts.createUser({
    email: email,
    password: password
},  function(error) {
    if (error) {
        console.log(error.reason);
    }
    else {
        Router.go("home");
    }
});

