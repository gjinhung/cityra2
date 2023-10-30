import { useEffect, useState } from "react";

function StarsRating({stars, disabled, onChange}) {
    const [activeStars, setActiveStars] = useState(stars);
    
    useEffect(() => {
        setActiveStars(stars)
    }, [stars])

    return (
        <>
<div
        className={activeStars >= 1 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setActiveStars(1);
        }}
        onMouseLeave={() => {
          if (!disabled) setActiveStars(stars);
        }}
        onClick={() => {
          onChange(1);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={activeStars >= 2 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setActiveStars(2);
        }}
        onMouseLeave={() => {
          if (!disabled) setActiveStars(stars);
        }}
        onClick={() => {
          onChange(2);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={activeStars >= 3 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setActiveStars(3);
        }}
        onMouseLeave={() => {
          if (!disabled) setActiveStars(stars);
        }}
        onClick={() => {
          onChange(3);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={activeStars >= 4 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setActiveStars(4);
        }}
        onMouseLeave={() => {
          if (!disabled) setActiveStars(stars);
        }}
        onClick={() => {
          onChange(4);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={activeStars >= 5 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setActiveStars(5);
        }}
        onMouseLeave={() => {
          if (!disabled) setActiveStars(stars);
        }}
        onClick={() => {
          onChange(5);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      </>

    )
}

export default StarsRating