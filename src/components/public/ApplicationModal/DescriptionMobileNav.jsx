import React from "react";
import { FieldValue, ImgSideBar } from "./styles";
import { createListingImage } from "../../../services/listing";

const DescriptionMobileNav = ({ myselectedListing }) => {
  return (
    <div
      style={{ width: "100%", height: "70px", padding: "9px", display: "flex" }}
    >
      <div>
        <ImgSideBar src={createListingImage(myselectedListing)} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "4px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                color: "#272727",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              ${" "}
              {myselectedListing && myselectedListing.price
                ? parseFloat(myselectedListing.price).toLocaleString("en", {})
                : ""}
              /mo
            </p>
          </div>
          <div>
            {myselectedListing && (
              <p>#{myselectedListing.id.toString().padStart(6, "0")}</p>
            )}
          </div>
        </div>
        <div>
          {myselectedListing && (
            <FieldValue>
              {myselectedListing.location.split(", ").slice(-2).join(", ")}
            </FieldValue>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionMobileNav;
