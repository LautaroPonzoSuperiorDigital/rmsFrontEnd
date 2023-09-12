import { useState, useEffect, useRef } from "react";
import Nav from "../../../components/nav";
import "../../../styles/Applicants/applicants.css";
import SearchListings from "../../../components/searchListings";
import Pagination from "../../../components/paginations";
import Animation from "../../../assets/img//animation.json";
import lottie from "lottie-web";
import { api } from "../../../services/api";
import Table from "./Table";

const Applicants = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [tabelApplicants, setTableApplicants] = useState([]);
  const [newTanant, setNewTanant] = useState(false);
  const [deleteTenant, setDeleteTenant] = useState(false);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const applicants = await api.get("/application-screening/get-all");
        setApplicants(applicants.data);
        setTableApplicants(applicants.data);
        setNewTanant(false);
        setDeleteTenant(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplicants();
  }, [newTanant, deleteTenant]);

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
            <SearchListings
              className="searchApplicants"
              applicants={applicants}
              setTableApplicants={setTableApplicants}
            />
          </div>
        </div>
        <Table
          applicants={tabelApplicants}
          setNewTanant={setNewTanant}
          setApplicants={setApplicants}
          setTableApplicants={setTableApplicants}
          setDeleteTenant={setDeleteTenant}
        />
      </div>

      <Pagination />
    </>
  );
};

export default Applicants;
