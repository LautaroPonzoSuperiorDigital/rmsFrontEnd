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
import { api } from "../../services/api";

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

  /* image modal uploader */
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      const readerPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = function () {
            resolve(reader.result);
          };
          reader.onerror = function (error) {
            reject(error);
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then((results) => {
          const storedImages = JSON.parse(localStorage.getItem("images")) || [];
          const updatedImages = results.map((result) => ({ base64: result }));

          localStorage.setItem("images", JSON.stringify([...storedImages, ...updatedImages]));
          setSelectedImages([...selectedImages, ...updatedImages]);

          results.forEach((result) => {
            sendImageToParent(result);
            imagesToEachSect(updatedImages);

          });
        })
        .catch((error) => {
          console.error("Error converting file to Base64:", error);
        });
    }
  };
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


  /* SECTIONS */
  const imagesToEachSect = async (images) => {
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image.base64);

        const response = await api.post('/listing/1/album/section/1/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Image uploaded:', response.data);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  /* SECTIONS */

  const renderSectionContent = () => {
    switch (activeSection) {
      case "EXTERIOR":
        return (
          <div className="flex d-flex align-items-start justify-content-start">
            <div className="imgFlex d-flex flex-wrap justify-content-start">
              {selectedImages.length == 0
                ? ""
                : selectedImages?.map((image, index) => (
                  <div className="imgContainer1" key={index}>
                    <img className="flex-area1" src={image.base64} />
                    <div className="orderDeleteBgBucket">
                      <div
                        className="bgDel"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        <div className="prop">
                          <img
                            className={
                              hoveredElements[index] ? "delHover" : "del"
                            }
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
      case "LIVING ROOM":
        return <div>Content</div>;
      case "BEDROOM 1":
        return <div>Content</div>;
      case "BEDROOM 2":
        return <div>Content</div>;
      case "BATHROOM 1":
        return <div>Content</div>;
      case "BATHROOM 2":
        return <div>Content</div>;
      case "BATHROOM 3":
        return <div>Content</div>;
      default:
        return null;
    }
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
        </ul>
      </div>
      <div className="sectionContent">{renderSectionContent()}</div>
      {isModalOpen && <EditModalSections closeModal={closeModal} />}
    </div>
  );
};

export default ModalListingsImgs;
