import React, { Fragment } from "react";
import StarRating from "react-star-ratings";

import { Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import styles from "./styles";

const BookReview = ({ classes, onDelete, review, reviewFor }) => {
  return (
    <Fragment>
      <Box mt={1}>
        {review.isMe && (
          <IconButton
            className={classes.closeButton}
            color="primary"
            onClick={() => onDelete(reviewFor)}
          >
            <Delete />
          </IconButton>
        )}
        <Box alignItems="center" display="flex" mt={2}>
          <Avatar color="secondary" size="small">
            {review.author_name.charAt(0).toUpperCase()}
          </Avatar>
          <Box display="inline" ml={2}>
            <Typography>{`${review.author_name}${
              review.isMe ? " (You)" : ""
            }`}</Typography>
            <StarRating
              numberOfStars={5}
              rating={Number(review.rating) || 5}
              starRatedColor="#CC444B"
              starDimension="10"
              starSpacing="1"
            />
            - {review.rating}
          </Box>
        </Box>
        <Box mt={2}>
          <Typography>
            <b>{review.review_title}</b>
          </Typography>
          <Typography variant="subtitle2">
            <i>{review.reviewed_date}</i>
          </Typography>
          <Box mt={1}>{review.review_text}</Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default withStyles(styles)(BookReview);
