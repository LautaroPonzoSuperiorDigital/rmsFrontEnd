import React, { useState, useEffect, useContext } from "react";
import arrow from "../../assets/img/arrow.svg";
import arrowHover from "../../assets/img/arrowHover.svg";
import closeListing3 from "../../assets/img/close.svg";
import closeHover from "../../assets/img/closeHover.svg";
import { useNavigate } from "react-router-dom";
import del from "../../assets/img/deleteListings.svg";
import delHover from "../../assets/img/deleteListingsHover.svg";
import img1 from "../../assets/img/1.jpg";
import "../../styles/modalImgsSwitch.css";
import "../../styles/modal.css";
import EditModalSections from "./modalSections";
import { ImageContext } from "../../context/imageContext";
import axios from "axios";

const ModalListingsImgs = ({ closeModal, image, sendImageToParent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeSection, setActiveSection] = useState("EXTERIOR");
  const [isHoveredClose, setIsHoveredClose] = useState(false);
  const [isGoBackHovered, setIsGoBackHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { selectedImages, setSelectedImages } = useContext(ImageContext);
  const [hoveredElements, setHoveredElements] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [modalRef, setModalRef] = useState(null);





  /* image modal uploader */
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      const filePromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            resolve(reader.result);
          };
        });
      });

      Promise.all(filePromises).then((results) => {
        setSelectedImages((prevSelectedImages) => {
          const newSelectedImages = { ...prevSelectedImages };

          if (!newSelectedImages[activeSection]) {
            newSelectedImages[activeSection] = [];
          }

          newSelectedImages[activeSection].push(...results);

          return newSelectedImages;
        });

        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        storedImages.push(...results.map(result => ({ base64: result, section: activeSection })));
        localStorage.setItem("images", JSON.stringify(storedImages));

        setImagesLoaded(true);
      });
    }
  };

  useEffect(() => {
    console.log("Retrieving images from localStorage");
    const storedImages = JSON.parse(localStorage.getItem("images"));

    if (storedImages != null) {
      const imageSections = {};

      storedImages.forEach((image) => {
        if (!imageSections.hasOwnProperty(image.section)) {
          imageSections[image.section] = [];
        }
        imageSections[image.section].push(image.base64);
      });

      setSelectedImages(imageSections);
      sendImageToParent(imageSections[activeSection][0]);
    }
  }, []);
  /* image modal uploader */

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const hasImages = false;

  const handleGoBackMouseEnter = () => {
    setIsGoBackHovered(true);
  };
  const handleGoBackMouseLeave = () => {
    setIsGoBackHovered(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredElements((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredElements((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setModalRef(section.modalRef);
  };
  const handleEditSectionsClick = () => {
    setSelectedOption("editSections");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    closeModal();
    navigate("/admin/listings");
  };
  const handleCloseTotal = () => {
    navigate("/admin/listings");
  };
  useEffect(() => {
    setIsModalOpen(false);
  }, []);

  const renderSectionContent = () => {
    console.log("selectedImages:", selectedImages);
    const sectionImages = selectedImages[activeSection] || [];

    const sectionContent = (
      <div className="sectionWrapper">
        <div className="imgFlex d-flex flex-wrap justify-content-start">
          {sectionImages.map((imageUrl, index) => (
            <div className="imgContainer1" key={index}>
              <img className="flex-area1" src={imageUrl} alt={`Image ${index}`} />
              <div className="orderDeleteBgBucket">
                <div
                  className="bgDel"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="prop">
                    <img
                      className={hoveredElements[index] ? "delHover" : "del"}
                      src={hoveredElements[index] ? delHover : del}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return sectionContent;
  };

  return (
    <div className="modalContent1 d-flex flex-column">
      <div className="gobackContainer d-flex justify-content-between">
        <h2
          className="goBack"
          onMouseEnter={handleGoBackMouseEnter}
          onMouseLeave={handleGoBackMouseLeave}
          onClick={handleCloseModal}
        >
          <img
            className="arrow mb-1"
            src={isGoBackHovered ? arrowHover : arrow}
            alt="arrow"
          />
          Go Back
        </h2>
        <img
          className="closeListing5"
          src={isHoveredClose ? closeHover : closeListing3}
          alt="close"
          onMouseEnter={() => setIsHoveredClose(true)}
          onMouseLeave={() => setIsHoveredClose(false)}
          onClick={handleCloseModal}
        />
      </div>
      <div className="modalNav">
        <ul className="ulModal">
          <li
            className={`liModal ${activeSection === "EXTERIOR" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("EXTERIOR")}
          >
            EXTERIOR
          </li>
          <li
            className={`liModal ${activeSection === "LIVING ROOM" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("LIVING ROOM")}
          >
            LIVING ROOM
          </li>
          <li
            className={`liModal ${activeSection === "BEDROOM 1" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("BEDROOM 1")}
          >
            BEDROOM 1
          </li>
          <li
            className={`liModal ${activeSection === "BEDROOM 2" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("BEDROOM 2")}
          >
            BEDROOM 2
          </li>
          <li
            className={`liModal ${activeSection === "BATHROOM 1" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("BATHROOM 1")}
          >
            BATHROOM 1
          </li>
          <li
            className={`liModal ${activeSection === "BATHROOM 2" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("BATHROOM 2")}
          >
            BATHROOM 2
          </li>
          <li
            className={`liModal b3 ${activeSection === "BATHROOM 3" ? "active" : ""
              }`}
            onClick={() => handleSectionClick("BATHROOM 3")}
          >
            BATHROOM 3
          </li>
          <div className="optionWidth">
          <li className="option" onClick={handleEditSectionsClick}>
            Edit Sections
          </li>
          <li className="option">
            <label className="option" htmlFor="fileInput">
              + Add Photos
            </label>
            <input
              type="file"
              id="fileInput"
              name="image"
              onChange={handleFileInputChange}
              multiple
            />
          </li>
          </div>
        </ul>
      </div>
      <div className="sectionContent">{renderSectionContent()}</div>
      {isModalOpen && <EditModalSections closeModal={closeModal} />}
    </div>
  );
};

export default ModalListingsImgs;
