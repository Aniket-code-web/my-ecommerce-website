import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

const HomeSectionCarousel = ({ data = [], sectionName }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data.length) return null;

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const items = data.map((item) => (
    <HomeSectionCard key={item.id} product={item} />
  ));

  return (
    <div className="px-4 lg:px-8">
      <div className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </div>

      <div className="relative p-5 shadow-lg">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          mouseTracking
          onSlideChanged={(e) => setActiveIndex(e.item)}
        />

        {activeIndex > 0 && (
          <Button
            onClick={() => carouselRef.current.slidePrev()}
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "white",
              minWidth: "40px",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        {activeIndex < items.length - 5 && (
          <Button
            onClick={() => carouselRef.current.slideNext()}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
              minWidth: "40px",
              borderRadius: "50%",
              boxShadow: 2,
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
