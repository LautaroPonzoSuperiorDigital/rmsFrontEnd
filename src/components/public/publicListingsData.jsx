import picture1 from "../../assets/img/picture.jpg";
import picture2 from "../../assets/img/picture2.jpg";
import picture3 from "../../assets/img/picture3.jpg";
import picture4 from "../../assets/img/picture4.jpg";
import picture5 from "../../assets/img/picture5.jpg";
import picture6 from "../../assets/img/picture6.jpg";
import CheckMark from "../../assets/img/checkMark.svg";
import camera from "../../assets/img/camera.svg";

const publicListingsData = [
  {
    image: picture1,
    id: "46780",
    location: "Paso Robles, Ca",
    lotSize: "13,608 SQ. FT.",
    houseSize: "3,435 SQ. FT.",
    price: "$6,500/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: null,
    camera: <img className="camera" src={camera} alt="camera" />,
  },
  {
    image: picture2,
    id: "57478",
    location: "Templeton, Ca",
    lotSize: "9,355 SQ. Ft.",
    houseSize: "3,435 SQ. Ft.",
    price: "$5,500/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: <img className="checkMark" src={CheckMark} alt="CheckMark" />,
    camera: <img className="camera" src={camera} alt="camera" />,
  },
  {
    image: picture3,
    id: "47474",
    location: "Paso Robles, Ca",
    lotSize: "8,252 SQ. FT.",
    houseSize: "2,355 SQ. FT.",
    price: "$ 5,700/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: null,
    camera: <img className="camera" src={camera} alt="camera" />,
  },
  {
    image: picture4,
    id: "67926",
    location: "Atascadero, Ca",
    lotSize: "12,498 SQ. FT.",
    houseSize: "2,965 SQ. FT.",
    price: "$ 6,000/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: <img className="checkMark" src={picture6} alt="CheckMark" />,
    camera: <img className="camera" src={camera} alt="camera" />,
  },
  {
    image: picture5,
    id: "13425",
    location: "Templeton, Ca",
    lotSize: "15,464 SQ. FT.",
    houseSize: "4,754 SQ. FT.",
    price: "$ 5,200/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: <img className="checkMark" src={CheckMark} alt="CheckMark" />,
    camera: <img className="camera" src={camera} alt="camera" />,
  },
  {
    image: picture6,
    id: "24235",
    location: " Atascadero, Ca ",
    lotSize: "11,937 SQ. FT.",
    houseSize: "3,608 SQ. FT.",
    price: "$ 4,700/mo",
    bathrooms: 2,
    bedrooms: 3,
    public: null,
    camera: <img className="camera" src={camera} alt="camera" />,
  }
];

export default publicListingsData;
