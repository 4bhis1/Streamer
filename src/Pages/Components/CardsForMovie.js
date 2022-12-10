import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../../Components/Ratings";
import View from "../../Components/View";

const CardsForMovie = ({ value, index }) => {
  const Navigate = useNavigate();
  return (
    <View
      key={index}
      style={{
        ...styles.mainContainer,
        width: 150,
        height: 280,
      }}
      onClick={() => {
        Navigate(`/movies/${value.id}`);
      }}
    >
      {/* <Link to={`/movies/${value.id}`}> */}
      <View style={{ flexDirection: "column" }}>
        <img
          src={`${process.env.REACT_APP_MOVIE_DB_IMAGE_URL_FOR_POSTER}${value.poster_path}`}
          alt="im"
          height={200}
          width={150}
          style={{ borderRadius: 10 }}
        />
        <View
          style={{
            paddingHorizontal: 5,
            paddingTop: 5,
            position: "relative",
            height: 80,
            fontSize: 16,
          }}
        >
          <View style={{ wordWrap: "true" }}>
            {value.title.length > 28
              ? value.title.toString().substr(0, 28) + "..."
              : value.title}
          </View>
          <View
            style={{
              justifyContent: "space-between",
              position: "absolute",
              left: 5,
              right: 5,
              bottom: 10,
            }}
          >
            <View>{value.release_date.toString().split("-")[0]}</View>
            <Ratings numberOfStars={5} number={value.vote_average} outof={10} />
          </View>
        </View>
      </View>
      {/* </Link> */}
    </View>
  );
};

export default CardsForMovie;

const styles = {
  mainContainer: {
    width: 200,
    height: 400,
    overflow: "hidden",
    marginHorizontal: 5,
    marginBottom: 30,
    bgColor: "ghostwhite",
    cursor: "pointer",
  },
};
