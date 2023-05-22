import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./row.css";

const Row = (props) => {
  const [product, setProduct] = useState([]);

  const handleClick = (e) => {
    const outerContainer = document.querySelector(".outer-container");
    const innerContainer = document.querySelector(`#${props.ctg}`);

    const sliderWidth = innerContainer.offsetWidth - outerContainer.offsetWidth;

    if (
      e.target.className === "card-next" ||
      e.target.parentElement.className === "card-next"
    ) {
      innerContainer.parentElement.scrollLeft = sliderWidth;
    } else if (
      e.target.className === "card-prev" ||
      e.target.parentElement.className === "card-prev"
    ) {
      innerContainer.parentElement.scrollLeft = -sliderWidth;
    }
  };

  useEffect(() => {
    let isMount = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://electronicstore.onrender.com/api/v1/getProductByCategory/${props.ctg}`
        );
        const data = await response.json();
        if (isMount) {
          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      isMount = false;
    };
  });

  return (
    <Container fluid className="my-4 outer-container">
      <h2 className="text-black">{props.title}</h2>
      <div className="card-container" id={props.ctg}>
        {product.map((item, i) => {
          return (
            <Link
              to={`/product/${item.title}/${item.category}`}
              state={item}
              key={i}
            >
              <Card>
                <Card.Img variant="top" src={item.url[0]} />
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="card-prev" onClick={handleClick}>
        <BsChevronCompactLeft />
      </div>
      <div className="card-next" onClick={handleClick}>
        <BsChevronCompactRight />
      </div>
    </Container>
  );
};

export default Row;
