import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import View from "../Components/View";

import "./styles.css";

const HeaderForMain = () => {
  const Navigate = useNavigate();

  const [suggetions, updateSuggetions] = useState();
  const [text, updateText] = useState("");

  const debounce = (func, timeout = 300) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      const context = this,
        args = arguments;
      timer = setTimeout(() => {
        func.apply(context, args);
      }, timeout);
    };
  };

  function saveInput(text) {
    fetch(
      `${process.env.REACT_APP_MOVIE_DB_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_TOKEN}&language=en-US&page=1&query=${text}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data > > >", data);
        updateSuggetions(data.results);
      });
  }
  const processChange = useCallback(debounce(saveInput, 1000), []);

  return (
    <View
      style={{
        flexDirection: "column",
        position: "relative",
        // alignItems: "center",
        marginBottom: 100,
        paddingHorizontal: 40,
        background: "linear-gradient(180deg, #FDD92A,#EEB527)",
      }}
    >
      <View
        style={{
          //   height: 100,
          //   bgColor: "cyan",
          flexDirection: "column",
          //   position: "relative",
          //   left: 0,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            // bgColor: "green"
            marginTop: 10,
            fontSize: 24,
          }}
        >
          <View>Logo</View>
          <View>
            <View>Anime</View>
            <View>Movie</View>
            <View>Series</View>
            <View>Gener</View>
          </View>
          <View>Singin</View>
        </View>
        <View
          style={{
            justifyContent: "center",
            fontSize: 50,
            fontWeight: 300,
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          Watch Movie, Series, Anime
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: -20,
          justifyContent: "center",
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            bgColor: "ghostwhite",
            paddingHorizontal: 20,
            paddingVertical: 10,
            boxShadow: "8px 17px 33px -10px rgba(219,215,219,1)",
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => {
              updateText(e.target.value);
              //  setTimeout(()=>{
              processChange(e.target.value);

              // },2000)
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                suggetions &&
                  Navigate(`/movies/${suggetions ? suggetions[0].id : 0}`);
              }
            }}
          />
          {/* <Link to={`/movies/${suggetions ? suggetions[0].id : 0}`}> */}
          <View
            style={{ cursor: "pointer" }}
            onClick={() => {
              Navigate(`/movies/${suggetions ? suggetions[0].id : 0}`);
            }}
          >
            Submit
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderForMain;
