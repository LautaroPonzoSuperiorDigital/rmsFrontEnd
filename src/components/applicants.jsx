import React, { useState, useEffect, useRef } from "react";
import Nav from "./nav";
import "../styles/Applicants/applicants.css";
import SearchListings from "./searchListings";
import { DeleteButton } from "./buttonApplicants";
import Pagination from "./paginations";
import Delete from "../assets/img/delete.svg";
import Animation from "../assets/img/animation.json";
import lottie from "lottie-web";
import DeleteIconHover from "../assets/img/deleteIconHover.svg";

const Applicants = () => {
  const [showMoveButton, setShowMoveButton] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  const animationContainerRef = useRef(null);

  const handleMoveToTenants = () => {
    setShowMoveButton(false);
    setShowAnimation(true);
  };

  useEffect(() => {
    if (showAnimation) {
      const animation = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: Animation,
      });
      animation.addEventListener("complete", () => {
        setShowAnimation(false);
      });
      return () => {
        animation.destroy();
      };
    }
  }, [showAnimation]);

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="d-flex w-100 mb-3">
          <div className="container tenantsContainer">
            <div className="d-flex align-items-center justify-content-start">
              <h2 className="tenantsText">Applicants</h2>
              <div className="form-check ms-3 mb-1"></div>
            </div>
          </div>
          <div className="container-fluid ListingContainer d-flex justify-content-end bttonContainer">
            <SearchListings className="searchApplicants" />
          </div>
        </div>

        <table className="table table-responsive-lg">
          <thead className="tables">
            <td className="bor NAME1">
              <p className="mb-2 g">NAME</p>
            </td>
            <td className="bor LISTING1">
              <p className="mb-2 g">LISTINGS</p>
            </td>
            <td className="bor">
              <p className="mb-2 ms-5 g">APPROVAL STATUS</p>
            </td>
            <td className="bor EMAIL1">
              <p className="mb-2 g">EMAIL</p>
            </td>
            <td className="bor">
              <p className="mb-2 g">PHONE</p>
            </td>
            <td className="bor whiteSpace"></td>
            <td className="bor">
              <p className="deleteText g">DELETE</p>
            </td>
          </thead>
          <tbody>
            <tr className="tr-hover">
              <td className="bor1">
                <div className="mt-3   Person">
                  <p>Maria Kramer</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-2">
                  <p>46780</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-5">
                  <p>Passed Background Check</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3">
                  <p>alessiabeelzebub@gmail.com</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mt-3 ms-1">
                  <p>818-636-0698</p>
                </div>
              </td>
              <td className="bor1">
                <div className="mtt">
                  {showMoveButton && (
                    <button
                      className="mttContainer"
                      onClick={handleMoveToTenants}
                    >
                      Move To Tenants
                    </button>
                  )}
                  {!showMoveButton && (
                    <div
                      className="animation-container"
                      ref={animationContainerRef}
                    ></div>
                  )}
                </div>
              </td>
              <td className="bor1">
                <div className="deleteBtn1">
                  <DeleteButton
                    defaultImage={<img src={Delete} alt="Delete" />}
                    hoverImage={
                      <img src={DeleteIconHover} alt="DeleteIconHover" />
                    }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
};

export default Applicants;
