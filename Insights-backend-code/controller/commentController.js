import Comment from "../models/Comment.js";

var commentController = {};

//Add comments
commentController.createComment = async (req, res, next) => {
    try {
        var newComment = new Comment({
            type: req.body.type,
            comment: req.body.comment,
            username: req.user.username
        });

        await Comment.addComment(newComment, (err, comment) => {
            if (err) {
                let message = "";
                if (err.errors.comment) message = "Cannnot add comments! please try again ";
                next(new AppError(message, 403));
                return res.json({
                    success: false,
                    message: `${message} - Something went wrong :(`
                });

            } else {
                return res.json({
                    success: true,
                    message: `comment added successfully! ==> ${comment}`
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error
        })
    }
}

//View comments on Post
commentController.getComments = async(req, res) => {
    try {
        let commentId = req.user.videos.comments._id;
       await Comment.getCommentsById(commentId, (err, comment) => {
           if(!comment){
            return res.json({
                success: false,
                message: "No comments!"
            });
           }
           else{
               res.json({
                   success:true,
                   comments:[comment]
               })
           }
       })
    } catch (error) {
        console.log(error);
    }
};

//Edit comments
commentController.updateOneComment = async (req, res) => {
    try {
        var Id = req.user.videos.comments._id;
        console.log(req.body);
        await comment.updateOne({
            _id: Id,
        }, {
            $set: {
                type: req.body.type,
                comment: req.body.comment,
                username: req.user.username
            },
        });

        return res.json({
            success: true,
            message: "comment updated successfully!"
        });
    } 
    
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error
        })
    }
};


//Delete comments
commentController.deleteComment = (req, res) => {
    try {
        var Id = req.user.videos.comments._id;
        comment.deleteOne({
            _id: Id,
        }).then(function () {
            return res.json({
                success: true,
                message: "comment deleted successfully!"
            });
        });
    } 

    catch (error) {
        console.log(error);
          res.json({
            success: false,
            message: error
        })
    }
};

export default commentController;