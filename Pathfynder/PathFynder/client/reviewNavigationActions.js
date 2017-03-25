/**
 * Created by Brad on 3/22/2017.
 */
Router.route('/courses', {
    name: 'courses',
    template: 'courses'
});

Router.route('/internships', {
    name: 'internships',
    template: 'internships'
});

Router.route('/clubs', {
    name: 'clubs',
    template: 'clubs'
});

Router.route('/residential', {
    name: 'residential',
    template: 'residential'
});

Router.route('/dining', {
    name: 'dining',
    template: 'dining'
});

Router.route('/courses/:_school/:_department/', {
    template: 'departments',
    data: function(){
        console.log(this.params._department);
        var currentList = this.params._department;
        return Departments.findOne({ department: currentList });
    }
});

Router.route('/courses/:_school/:_department/:_course', {
    template: 'departmentCourses',
    data: function(){
        console.log(this.params._department);
        var currentList = this.params._department;
        return Departments.findOne({ department: currentList });
    }
});

Template.internships.events ( {
    'submit form': function(event) {
        event.preventDefault();
        Departments.insert( {
           department: event.target.department.value
        });
    }
});

Template.courses.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        var departmentName = event.target.department.value;
        console.log('/courses/' + schoolName +'/' + departmentName);
        Router.go('/courses/' + schoolName +'/' + departmentName);
    }
});

Template.internships.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.clubs.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.residential.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.dining.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.departments.events( {
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var courseName = event.target.course.value;
        console.log(Router.current().url + '/' + courseName);
        Router.go(Router.current().url + '/' + courseName);
    }
});

Template.departmentCourses.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
    }
});

Template.reviews.helpers({
   'reviews': function() {
       return CourseReview.find({}, {sort: {createdAt: -1}});
   }
});

