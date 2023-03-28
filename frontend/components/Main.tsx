import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FunctionComponent as FC } from "react";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Main: FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ bgcolor: "#000000", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: "300px" }}
            image="/images/logo3.png"
          />
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container mt={15} spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/images/pigeon2.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ fontSize: "1.2rem" }}
                    >
                      The Time-travelling Pigeon
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "1.0rem" }}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ p: 12 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Nextflix
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright © Nextflix 2023
        </Typography>
      </Box>
    </>
  );
};

export default Main;
