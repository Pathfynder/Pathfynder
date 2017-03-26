//The Collections
Course = new Mongo.Collection('course');
CourseReview = new Mongo.Collection('courseReview');
Internship = new Mongo.Collection('internship');
InternReview = new Mongo.Collection('internReview');
ResHall = new Mongo.Collection('resHall');
ResReview = new Mongo.Collection('resReview');
Dining = new Mongo.Collection('dining');
DiningReview = new Mongo.Collection('diningReview');
Club = new Mongo.Collection('club');
ClubReview = new Mongo.Collection('clubReview');
Departments = new Meteor.Collection('departments');
Courses = new Meteor.Collection('courses');

testCourse = new Mongo.Collection('testCourse');


//Schemas

Course.schema = new SimpleSchema({
    Title: {type: String},
    Number: {type: Number},
    Abbreviation: {type: String},
    AvgWorkloadRating: {type: Number},
    AvgDifficultyRating: {type: Number},
    AvgUtilityRating: {type: Number}
});

CourseReview.schema = new SimpleSchema({
    course: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    difficultyRating: {type: Number},
    workloadRating: {type: Number},
    utilityRating: {type: Number}
});
