import React from "react";
import View from "./View";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Ratings = ({ numberOfStars, number, outof }) => {
  const stars =
    outof > numberOfStars
      ? number / (outof / numberOfStars)
      : number * (numberOfStars / outof);

  const fullStars = Math.floor(stars) > 0 ? Math.floor(stars) - 1 : 0;
  const halfStars = !!stars.toString().split(".")[1];
  const noStars = numberOfStars - fullStars - 1;

  return (
    <View>
      {Array(fullStars || 0)
        .fill(" ")
        .map((_) => {
          return <BsStarFill style={{ color: "yellow" }} key={_} />;
        })}
      {halfStars && <BsStarHalf style={{ color: "yellow" }} />}
      {Array(noStars || 0)
        .fill(" ")
        .map((_) => {
          return <BsStar style={{ color: "yellow" }} key={_} />;
        })}
    </View>
  );
};

export default Ratings;
