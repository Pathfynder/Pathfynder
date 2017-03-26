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
        var currentList = this.params._department;
        return Departments.findOne({ department: currentList });
    }
});

Router.route('/courses/:_school/:_department/:_course', {
    template: 'departmentCourses',
    data: function(){
        var currentList = this.params._department;
        var args = [];
        args[0] = this.params._department;//Departments.findOne({ department: currentList });
        args[1] = this.params._course;
        return args;
    }
});

Template.internships.events ( {
    'submit form': function(event) {
        event.preventDefault();    }
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
        Departments.insert( {
           department: event.target.department.value
        });


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
        var reviewText = event.target.makeReview.value;
        var difficulty = event.target.difficulty.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        CourseReview.insert({
            course: courseId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            difficultyRating: difficulty,
            workloadRating: workload,
            utilityRating: utility
        })
    },

    'getReviews': function() {
        console.log("got here");
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        var reviews = CourseReview.find({"course": courseId});
        console.log(reviews);
        return reviews;
    }
});


Template.internships.helpers({
    'queryAbbreviation': function() {
        var abbreviations = _.uniq(Course.find({}, {
            sort: {["Abbreviation"]: 1}, fields: {["Abbreviation"]: 1}
        }).fetch().map(x=> x["Abbreviation"]), true);
        return abbreviations;
    }
});

Template.courses.helpers( {
    'queryAbbreviation': function() {
        var abbreviations = _.uniq(Course.find({}, {
            sort: {["Abbreviation"]: 1}, fields: {["Abbreviation"]: 1}
        }).fetch().map(x=> x["Abbreviation"]), true);
        return abbreviations;
    }
});

Template.departments.helpers({
    getCourseNumbers : function() {
        var ret = Course.find({"Abbreviation": this.department});
        //console.log(ret.Number + "here");
        return ret;
    }

});

Template.departmentCourses.helpers({
    something : function() {
        console.log(this);
    }
});
