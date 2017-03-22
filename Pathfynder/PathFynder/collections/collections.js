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


//Schemas

Course.schema = new SimpleSchema({
    name: {type: String},
    abrev: {type: String},
    number: {type: Number},
    avgWorkloadRating: {type: Number},
    avgDifficultyRating: {type: Number},
    avgUtilityRating: {type Number}
});

CourseReview.schema = new SimpleSchema({
    date: {type: Date},
    review: {type: String},
    difficutlyRating: {type: Number},
    workloadRating: {type: Number},
    utilityRating: {type: Number}
});
