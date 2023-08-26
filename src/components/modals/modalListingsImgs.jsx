import React, { useState, useEffect, useContext, useRef } from "react";
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
import { api } from "../../services/api";


const ModalListingsImgs = ({
  closeModal,
  sendImagesToParent,
  listingId,
  modeCreateBool,
  modeCreateImages
}) => {

  const navigate = useNavigate();

  const imageInput = useRef();

  const [hoveredElements, setHoveredElements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoveredClose, setIsHoveredClose] = useState(false);
  const [isGoBackHovered, setIsGoBackHovered] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isRefresh, setRefresh] = useState(false);

  const [ selectedImages, setSelectedImages ] = useState([]);
  const [ selectedImagesBase64, setSelectedImagesBase64 ] = useState([]);
  
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

  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(defaultSections[0]);
  const [selectedOption, setSelectedOption] = useState(null);


  // Init Sections
  if (!sections || sections.length < 1) {
    let tempSections = [];
    for (const k in defaultSections) {
      const v = defaultSections[k]
      tempSections.push(v)
    }
    setSections(tempSections);
  }

  useEffect(() => {
    const fetchSectionData = async () => {
      await api.get(`/listing/${listingId}/section/`)
        .then(response => {
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
    const files = imageInput.current.files;
    
    for (const file of files) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
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
      reader.onerror = async (e) => {
        console.log(e)
      }
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("UPDATED IMAGES")
    sendImagesToParent(selectedImagesBase64)
  }, [selectedImagesBase64]);

  useEffect(() => {
    if(modeCreateBool==true && modeCreateImages != undefined){
      setSelectedImagesBase64(modeCreateImages)
    }
  }, []);

  /** 
   * Image modal uploader 
  */
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

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
    const sectionImages = selectedImagesBase64[activeSection] || [];

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
                ref={imageInput}
                onInput={(e)=>handleFileInputChange(e)}
                accept="image/png, image/jpeg"
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