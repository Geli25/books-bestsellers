import React from "react";
import StarRating from "react-star-ratings";
import { Box, Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const ReviewForm = ({
  asin,
  classes,
  onAddSubmit,
  onEditSubmit,
  onCancel,
  hasInitialValues,
  username
}) => {
  const initialValues = {
    author_name: username,
    review_title: "",
    review_text: "",
    rating: "0.0",
    isMe: true
  };
  const handleSubmit = values => {
    if (hasInitialValues) {
      onEditSubmit(asin, values);
    } else {
      onAddSubmit(asin, values);
    }
    onCancel();
  };

  return (
    <Formik
      initialValues={hasInitialValues || initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <Box mt={2} mb={5}>
            <Form>
              <Field name="author_name">
                {({ field }) => (
                  <TextField
                    autoFocus
                    color="secondary"
                    disabled={!!username}
                    fullWidth
                    label="What is your name?"
                    required
                    {...field}
                  />
                )}
              </Field>
              <Box mt={2}>
                What would you rate this book?
                <Box mt={1}>
                  <StarRating
                    numberOfStars={5}
                    rating={Number(values.rating)}
                    starHoverColor="#CC444B"
                    starRatedColor="#CC444B"
                    starDimension="30"
                    starSpacing="5px"
                    changeRating={(rating, name) =>
                      setFieldValue(name, rating.toString() + ".0")
                    }
                    name="rating"
                  />
                </Box>
              </Box>
              <Box mt={2}>
                <Field name="review_title">
                  {({ field }) => (
                    <TextField
                      color="secondary"
                      fullWidth
                      label="What is the headline of your review?"
                      required
                      variant="outlined"
                      {...field}
                    />
                  )}
                </Field>
              </Box>
              <Box mt={2}>
                <Field name="review_text">
                  {({ field }) => (
                    <TextField
                      color="secondary"
                      fullWidth
                      id="outlined"
                      label="What do you think about the book?"
                      multiline
                      name="review_text"
                      required
                      rows={4}
                      variant="outlined"
                      {...field}
                    />
                  )}
                </Field>
              </Box>
              <Box className={classes.centerAlign} mt={2}>
                <Button color="secondary" type="submit" variant="contained">
                  <b>Submit your review</b>
                </Button>
                <Box ml={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onCancel}
                  >
                    <b>Cancel</b>
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

export default withStyles(styles)(ReviewForm);
