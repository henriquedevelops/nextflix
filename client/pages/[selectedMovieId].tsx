import axios from "@/utils/axios";
import { Movie } from "@/utils/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, CardMedia, Toolbar, Typography } from "@mui/material";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FunctionComponent as FC, useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const { ["accessToken-Nextflix"]: accessToken } = parseCookies(context);

  if (!accessToken) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const MoviePlayer: FC = () => {
  const nextRouter = useRouter();
  const { selectedMovieId } = nextRouter.query;
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/movies/${selectedMovieId}`);

        if (response.status === 204 || !response.data) nextRouter.push("/");
        setMovie(response.data);
      } catch (error) {
        console.error(error);
        nextRouter.push("/");
      }
    };

    fetchMovie();
  }, [nextRouter, selectedMovieId]);

  const handleGoBackClick = () => {
    nextRouter.push("/");
  };

  return (
    <>
      <Head>
        <title>{`Watching: ${movie?.title} - Nextflix`}</title>
      </Head>

      <Toolbar
        sx={{
          position: "fixed",
          zIndex: 1,
          width: "100vw",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
        }}
      >
        <Button disableRipple sx={{ mr: 2 }}>
          <ArrowBackIcon
            onClick={handleGoBackClick}
            sx={{ fontSize: 25, color: "white" }}
          />
        </Button>
        <Typography fontSize={25}>{movie?.title}</Typography>
      </Toolbar>
      <CardMedia
        component="video"
        autoPlay
        controls
        sx={{ height: "100vh", width: "100%" }}
        src={movie?.url}
      />
    </>
  );
};

export default MoviePlayer;
