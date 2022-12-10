import React, { useEffect, useState } from "react";
import View from "../Components/View";
import { img, movieUrl, token, url } from "../config";
import { Link, useHistory, useParams } from "react-router-dom";

import { FaVideo } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { Avatar, Skeleton } from "@mui/material";
import Ratings from "../Components/Ratings";
import HeaderForWatch from "./HeaderForWatch";
import CardsForMovie from "./Components/CardsForMovie";
import CurvedBoxesWithShadows from "../Components/CurvedBoxesWithShadows";

const MovieWatch = () => {
  const { movieId } = useParams();

  const [details, updateDetails] = useState();
  const [recommendations, updateRecommendations] = useState();
  const [reviews, updateReviews] = useState();
  const [similar, updateSimilar] = useState();

  useEffect(() => {
    //   const DetailMovie = https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    //   const RecommendedMovie = https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
    //   const SimilarMovies = https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
    //   const MovieReviews = https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

    // fetch for movie details
    fetch(`${url}/movie/${movieId}?api_key=${token}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        console.log("details", data);
        updateDetails(data);
      });

    // fetch for recommendations
    fetch(
      `${url}/movie/${movieId}/recommendations?api_key=${token}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("recommendations", data.results);
        updateRecommendations(data.results);
      });

    // fetch for reviews
    fetch(
      `${url}/movie/${movieId}/reviews?api_key=${token}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("reviews", data.results);
        updateReviews(data.results);
      });

    // fetch for similar
    fetch(`${url}/movie/${movieId}/similar?api_key=${token}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Similar", data.results);
        updateSimilar(data.results);
      });
  }, [movieId]);

  return (
    <>
      <HeaderForWatch />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <iframe
          id="iframe"
          title="Movie-player"
          allowFullScreen
          src={`${movieUrl}/movie?id=${movieId}`}
          style={{
            height: "94vh",
            width: "98vw",
          }}
        />

        <View style={{ paddingTop: 20 }}>
          <View
            style={{
              width: "68vw",
              padding: 10,
              flexDirection: "column",
            }}
          >
            {/* details Section  */}
            <CurvedBoxesWithShadows>
              <View style={{ fontSize: 30 }}>{details && details.title}</View>
              <View
                style={{
                  // bgColor: "green",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                  // height: 30,
                  // paddingHorizontal: 10,
                }}
              >
                <View>
                  <View
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      borderStyle: "solid",
                      padding: 10,
                      paddingVertical: 3,
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <FaVideo style={{ paddingRight: 5 }} />
                    Trailer
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      marginLeft: 10,
                      color: "#ffa600",
                      fontSize: ".875rem",
                      fontWeight: 400,
                    }}
                  >
                    IMDB: {details && details.vote_average}
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <MdFavorite style={{ fontSize: 30, marginRight: 10 }} />
                  <BsFillBookmarkFill style={{ fontSize: 24 }} />
                </View>
              </View>
              <View style={{ fontSize: 15, marginTop: 20, fontWeight: 300 }}>
                {details && details.overview}
              </View>
            </CurvedBoxesWithShadows>

            {/* Similar Sections  */}
            <CurvedBoxesWithShadows>
              <View style={{ fontSize: 24, marginBottom: 17 }}>Similar</View>

              <View
                style={{
                  // backgroundColor: "antiquewhite",
                  flexWrap: "wrap",
                  //   justifyContent: "center",
                }}
              >
                {similar
                  ? similar.map((value, index) => {
                      return (
                        <CardsForMovie
                          value={value}
                          index={index}
                          type={"sm"}
                        />
                      );
                    })
                  : Array(10)
                      .fill(" ")
                      .map((value, index) => {
                        return (
                          <View key={index} style={styles.mainContainer}>
                            <Skeleton
                              variant="rectangular"
                              width={200}
                              height={300}
                            />

                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </View>
                        );
                      })}
              </View>
            </CurvedBoxesWithShadows>

            {/* Review Sections */}
            <CurvedBoxesWithShadows>
              <View style={{ fontSize: 24, marginBottom: 17 }}>Review</View>
              <View>
                <input type="text" />
                <View>Submit</View>
              </View>
              <View style={{ flexDirection: "column", marginTop: 15 }}>
                {reviews
                  ? reviews.map((value, index) => {
                      const name =
                        value.author_details.name ||
                        value.author_details.username;
                      return (
                        <View key={index} style={{ marginBottom: 10 }}>
                          {/* <img src={} /> */}
                          <Avatar
                            alt={`${name}`}
                            src={value.author_details.avatar_path}
                            sx={{ width: 50, height: 50 }}
                          />
                          <View
                            style={{ marginLeft: 10, flexDirection: "column" }}
                          >
                            <View>{name}</View>
                            <View
                              style={{
                                fontSize: 15,
                                fontWeight: 300,
                              }}
                            >
                              {value.content}
                            </View>
                          </View>
                        </View>
                      );
                    })
                  : void 0}
              </View>
            </CurvedBoxesWithShadows>
          </View>
          <View
            style={{
              width: "28vw",
              borderLeftWidth: 2,
              borderLeftStyle: "solid",
              borderLeftColor: "#c0c0c0",
              padding: 10,
              flexDirection: "column",
              // bgColor : "tomato"
            }}
          >
            Recommendations
            <View style={{ marginTop: 20, flexDirection: "column" }}>
              {recommendations &&
                recommendations.map((value, index) => {
                  return (
                    <Link to={`/movies/${value.id}`}>
                      <View
                        key={index}
                        style={{
                          marginBottom: 10,
                          height: 150,
                          // bgColor: "tomato",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={`${img}${value.poster_path}`}
                          height={150}
                          width={100}
                        />
                        <View
                          style={{
                            // marginLeft: 10,
                            flexDirection: "column",
                            padding: 10,
                            position: "relative",
                            //   bgColor: "cyan",
                            flex: 1,
                          }}
                        >
                          <View>{value.original_title}</View>
                          <View
                            style={{
                              marginTop: 10,
                              fontSize: 18,
                              justifyContent: "space-between",
                              // backgroundColor: "green",
                              position: "absolute",
                              bottom: 10,
                              flex: 1,
                              left: 10,
                              right: 10,
                            }}
                          >
                            <View>
                              {value.release_date.toString().split("-")[0]}
                            </View>
                            <Ratings
                              numberOfStars={5}
                              number={value.vote_average}
                              outof={10}
                            />
                          </View>
                        </View>
                      </View>
                    </Link>
                  );
                })}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MovieWatch;

const styles = {
  mainContainer: {
    width: 200,
    height: 400,
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 30,
    bgColor: "white",
  },
};
