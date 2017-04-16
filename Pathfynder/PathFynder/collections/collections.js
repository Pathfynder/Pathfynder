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
    utilityRating: {type: Number},
    upvotes: {type: Number}
});

Internship.schema = new SimpleSchema({
    name: {type: String},
    avgInterviewRating: {type: Number},
    avgDifficultyRating: {type: Number},
    avgUtilityRating: {type: Number}
});

InternReview.schema = new SimpleSchema({
    internship: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    interviewRating: {type: Number},
    workloadRating: {type: Number},
    utilityRating: {type: Number}
});

ResHall.schema = new SimpleSchema({
    name: {type: String},
    location: {type: String},
    avgStarRating: {type: Number}
});

ResReview.schema = new SimpleSchema({
    resHall: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    starRating: {type: Number}
});

Club.schema = new SimpleSchema({
    name: {type: String},
    avgTimeRating: {type: Number},
    avgUtilRating: {type: Number}
});

ClubReview.schema = new SimpleSchema({
    club: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    timeRating: {type: Number},
    utilityRating: {type: Number}
});

Dining.schema = new SimpleSchema({
    name: {type: String},
    location: {type: String},
    avgStarRating: {type: Number},
    avgFoodQualityRating: {type: Number},
    avgHealthRating: {type: Number}
});

DiningReview.schema = new SimpleSchema({
    diningId: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    foodQualityRating: {type: Number},
    healthRating: {type: Number},
    starRating: {type: Number}
});
