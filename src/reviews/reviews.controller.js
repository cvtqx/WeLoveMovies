const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { getReviewWithCritic } = require("./reviews.service");



async function reviewExists(req, res, next){
    const review = await reviewsService.read(req.params.reviewId);

    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: "Review cannot be found"});
}


async function destroy(req, res, next){
    const {review} = res.locals;

    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}


async function update(req, res){
    const review_id = req.params.reviewId;

    const updatedReview ={
        ...req.body.data, 
        review_id: review_id  
    };
    
    const review = await reviewsService.update(updatedReview);
    const critic = await getReviewWithCritic(review_id);
    res.json({data: {...review, ...critic}});
}

module.exports ={
    update:[asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}