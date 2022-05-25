import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export const OverlayPreview = ({ name, route, image }) => {
  return (
    <Card square={true}>
      <CardMedia
        component="img"
        height="270"
        width="270"
        image={image}
        alt={name}
        sx={{ backgroundColor: "black" }}
      />
      <CardActions>
        <Typography variant="h6" component="div" align="left">
          {name}
        </Typography>
      </CardActions>
    </Card>
  );
};
