import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Next } from "./assets/chevronDown.svg";
import { ReactComponent as Prev } from "./assets/chevronUp.svg";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-vertical-carousel-component-in-react
 */

const VerticalCarousel = ({data, leadingText }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.length / 2);

  // Usd to determine the height/spacing of each item
  const itemHeight = 52;

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(data.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > data.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return data.length - 1;
      }

      return prevIndex - 1;
    });
  };

  return (
    <div id="portfolio"> 
      <div className="text-center section-title">
        <h2>Galeria</h2>
    </div>
    <div className="container outer-container">
      <div className="content">
        <img className="img-carousel"
          src={data[activeIndex].content.image}
          alt={data[activeIndex].content.introline}
        />
        {/* <p>{data[activeIndex].content.copy}</p> */}
    </div>

  <div className="carousel-wrapper">
    <button
      type="button"
      className="carousel-button prev"
      onClick={() => handleClick("prev")}
    >
      <Prev />
    </button>

    <div className="carousel">
      
      <div className="slides">
        <div className="carousel-inner">
          {data.map((item, i) => (
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("carousel-item", {
                active: activeIndex === i,
                visible:
                  Math.abs(determinePlacement(i)) <= visibleStyleThreshold
              })}
              key={item.id}
              style={{
                transform: `translateY(${determinePlacement(i)}px)`
              }}
            >
              {item.introline}
            </button>
          ))}
        </div>
      </div>
      <div className="leading-text">
        <p>{leadingText}</p>
      </div>
    </div>

    <button
      type="button"
      className="carousel-button next"
      onClick={() => handleClick("next")}
    >
      <Next />
    </button>
  </div>
</div>
</div>
       
  );
};

// recurso de validação
VerticalCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  leadingText: PropTypes.string.isRequired
};

// VerticalCarousel.defaultProps = {// caso as propriedades não sejam setadas
//   data: [
//     {
//       "introline": "dogs",
//       "id": "dogs",
//       "content": {
//         "image": "https://via.placeholder.com/400x200?text=Dogs",
//         "copy": "Dog ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan est ornare, ultricies erat a, dapibus lectus."
//       }
//     },
//     {
//       "introline": "elephants",
//       "id": "elephants",
//       "content": {
//         "image": "https://via.placeholder.com/400x200?text=Elephants",
//         "copy": "Elephant ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan est ornare, ultricies erat a, dapibus lectus."
//       }
//     }
//   ],
//   leadingText: "Serviços"
// }

export default VerticalCarousel;