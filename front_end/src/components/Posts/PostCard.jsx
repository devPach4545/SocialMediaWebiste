import BookMarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  deleteCommentAction,
  deletePostAction,
  likePostAction,
} from "../../Redux/Post/post.action";
import { didUserLike } from "../../utils/didUserLikePost";

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = React.useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [comments, setComments] = React.useState(item.comments);
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: { content },
    };
    dispatch(createCommentAction(reqData));
    setComments([...comments, { content, user: auth.user }]);
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostAction(item.id)); // Dispatch the delete action with the post ID
      window.location.reload();
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentAction(item.id, commentId));
    setComments(comments.filter((comment) => comment.id !== commentId));
  };
  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>{item.user.firstName[0]}</Avatar>
        }
        action={
          auth.user.id === item.user.id && ( // Show delete button only if the current user is the post's owner
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon className="cursor-pointer" />
            </IconButton>
          )
        }
        title={`${item.user.firstName} ${item.user.lastName}`}
        subheader={`@${item.user.firstName.toLowerCase()}_${item.user.lastName.toLowerCase()}`}
      />

      <CardMedia
        component="img"
        image={item.image}
        alt="Post Image"
        
        sx={{ height: { xs: 250, md: 350 }, objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.caption}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className="flex justify-between">
        <div>
          <IconButton onClick={handleLikePost}>
            {didUserLike(auth.user.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>

          <IconButton onClick={handleShowComments}>
            <ChatBubbleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <BookMarkIcon />
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar />
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="Add a comment"
            />
          </div>

          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-5 flex-row "
              >
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                >
                  {comment.user.firstName[0]}
                </Avatar>
                <p className="flex-grow">{comment.content}</p>
                <div className="ml-auto">
                  <IconButton
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
                  >
                    <DeleteIcon className="cursor-pointer" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
