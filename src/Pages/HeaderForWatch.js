import React, { useCallback, useEffect, useState } from "react";
import View from "../Components/View";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { token, url } from "../config";
import { Link, redirect, useNavigate } from "react-router-dom";

const HeaderForWatch = () => {
  //   const [age, setAge] = React.useState("Movie");

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  //  seriesSeason and Episode

  // give your personal rating and delet your rating

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
      `${url}/search/movie?api_key=${token}&language=en-US&page=1&query=${text}`
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
        backgroundColor: "#c0c0c0",
        color: "black",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 10,
      }}
    >
      {/* <View>Logo</View> */}
      <View style={{}}>
        {/* <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Movie"}>Movie</MenuItem>
            <MenuItem value={"Anime"}>Anime</MenuItem>
            <MenuItem value={"Series"}>Series</MenuItem>
          </Select>
        </FormControl> */}

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
        {/* </Link> */}
      </View>
      {/* <View style={{}}>
        <View>User Avatar</View>
        <View>Night Mode</View>
      </View> */}
    </View>
  );
};

export default HeaderForWatch;

//   const popularMovies = https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
//   const NowPlaying = https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
//   const UpcomingMovies = https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

//   const DetailMovie = https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
//   const RecommendedMovie = https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
//   const SimilarMovies = https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
//   const MovieReviews = https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

//   const seriesDetial = https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
//   const seriesRecommendation =https://api.themoviedb.org/3/tv/{tv_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
//   const seriesReviews = https://api.themoviedb.org/3/tv/{tv_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
//   const SimilarSeries = https://api.themoviedb.org/3/tv/{tv_id}/similar?api_key=<<api_key>>&language=en-US&page=1
//   const popularSeries = https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1

// search your movie here
//  https://api.themoviedb.org/3/search/movie?api_key=122a9fafd99452516fe83207465ce55d&language=en-US&page=1&query=avenger
