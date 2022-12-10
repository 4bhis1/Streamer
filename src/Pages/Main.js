import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsForMovie from "./Components/CardsForMovie";
import Ratings from "../Components/Ratings";
import View from "../Components/View";
import { img, token, url } from "../config";
import HeaderForMain from "./HeaderForMain";

const Main = () => {
  const [data, updateData] = useState();

  useEffect(() => {
    fetch(`${url}/movie/popular?api_key=${token}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("@@@ data", data.results);
        updateData(data.results);
      });
  }, []);

  return (
    <>
      <HeaderForMain />
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: "6%",
        }}
      >
        <View style={{ fontSize: 24 }}>
          Popular
          {/* <View>Movies</View>
          <View>Series</View>
          <View>Anime</View> */}
        </View>

        <View
          style={{
            flexWrap: "wrap",
            // justifyContent: "center",
            paddingTop: 20,
          }}
        >
          {data
            ? data.map((value, index) => {
                return <CardsForMovie value={value} index={index} />;
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

                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      {/* For other variants, adjust the size with `width` and `height` */}
                    </View>
                  );
                })}
        </View>
      </View>
    </>
  );
};

export default Main;

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
