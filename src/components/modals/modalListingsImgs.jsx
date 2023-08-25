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


const ModalListingsImgs = ({
  closeModal,
  image,
  sendImageToParent,
  listingId,
  modeCreateBool
}) => {
  const [hoveredElements, setHoveredElements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoveredClose, setIsHoveredClose] = useState(false);
  const [isGoBackHovered, setIsGoBackHovered] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const { selectedImages, setSelectedImages } = useContext(ImageContext);
  const { selectedImagesBase64, setSelectedImagesBase64 } = useContext(ImageContext);
  const [imageFiles, setImageFiles] = useState([]);

  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState("EXTERIOR");
  const [selectedOption, setSelectedOption] = useState(null);

  // Back-end Sections are statically ordered, do not change
  const defaultSections = [
    "EXTERIOR",
    "LIVING ROOM",
    "BEDROOM 1",
    "BEDROOM 2",
    "BATHROOM 1",
    "BATHROOM 2",
    "BATHROOM 3",
  ];

  // Init Sections
  if (!sections || sections.length < 1)
    for (const k in defaultSections) {
      const v = defaultSections[k]
      sections.push(v)
    }

  useEffect(() => {
    const fetchSectionData = async () => {
      await api.get(`/listing/${listingId}/section/`)
        .then(response => {
          console.log("API Response:", response.data);
          setSections(response.data);
        })
        .catch(e => {
          console.error("API Error:", e);
        })
    };

    if (!modeCreateBool) {
      fetchSectionData();
    }
    else {
      // Init selectedImages if Creating Listing
      for (const k in defaultSections) {
        const v = defaultSections[k]
        selectedImages[v] = []
        selectedImagesBase64[v] = []
      }
    }
  }, [listingId]);


  /* image modal uploader */
  const handleFileInputChange = async (event) => {
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;

        // Asegurarse de que la sección activa exista en selectedImagesBase64
        if (!selectedImagesBase64[activeSection]) {
          setSelectedImagesBase64((prevImagesBase64) => ({
            ...prevImagesBase64,
            [activeSection]: [],
          }));
        }

        setSelectedImagesBase64((prevImagesBase64) => ({
          ...prevImagesBase64,
          [activeSection]: [...prevImagesBase64[activeSection], base64Image],
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    for (const section in selectedImagesBase64) {
      console.log(section + ":");
      console.log(selectedImagesBase64[section]);
    }
  }, [selectedImagesBase64]);

  useEffect(() => {
    const fetchImagesForSection = async () => {
      try {
        const response = await api.get(`/listing/${listingId}/album/section/${activeSection}`);
        setSelectedImages({
          ...selectedImages,
          [activeSection]: response.data.images,
        });
        console.log("Fetched images for", activeSection, ":", response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (!modeCreateBool) {
      fetchImagesForSection();
    }
  }, [activeSection]);
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

  const handleSectionClick = async (sectionId) => {
    const apiSectionId = parseInt(sectionId) + 1;
    const selectedSection = sections[sectionId];
    setActiveSection(selectedSection);
    if (!modeCreateBool) {
      await api.get(`/listing/${listingId}/album/section/${apiSectionId}`)
        .then(response => {
          setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [apiSectionId]: response.data.imageUrls
          }));
        })
        .catch(error => {
          console.error("Error fetching images:", error);
        })
    }
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
    const sectionImages = selectedImages[activeSection] || [];

    const sectionContent = (
      <div className="sectionWrapper">
        <div className="imgFlex d-flex flex-wrap justify-content-start">
          {sectionImages.map((base64Image, index) => (
            <div className="imgContainer1" key={index}>
              <img className="flex-area1" src={base64Image} alt={`Image ${index}`} />
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
          {sections.map((sectionName, sectionId) => (
            <li
              key={sectionId}
              className={`liModal ${activeSection === sectionName ? "active" : ""}`}
              onClick={() => {
                handleSectionClick(sectionId);
              }}
            >
              {sectionName.toUpperCase()}
            </li>
          ))}
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