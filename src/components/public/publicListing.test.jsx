import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Listing from "./Listing/Listing";
import { mockSingleListing } from "./../../../src/mockApi/MockApiPublicListing/mockPublicListing";

describe("make sure that information of Listing component its rendering", () => {
  beforeEach(() => {
    render(
      <Listing
        listing={mockSingleListing}
        handleImageClick={() => console.log("")}
      />
    );
  });

  it("should display listing correct price", () => {
    const priceElement = screen.getByText(`$${mockSingleListing.price}`, {
      exact: false,
    });
    expect(priceElement).toBeDefined();
  });
  it("should display listing correct location", () => {
    const locationElement = screen.getAllByText(
      `${mockSingleListing.location
        .split(",")[2]
        .trim()}, ${mockSingleListing.location
        .split(",")[3]
        .trim()
        .substring(0, 1)
        .toUpperCase()}${mockSingleListing.location
        .split(",")[3]
        .trim()
        .substring(1, 2)
        .toLowerCase()}`,
      { exact: false }
    );
    expect(locationElement).toBeDefined();
  });
  it("should display house size", () => {
    const houseSizeElement = screen.getAllByText(`4,354 SQ. FT`, {
      exact: false,
    });
    expect(houseSizeElement).toBeDefined();
  });
  it("should display lot size", () => {
    const lotSize = screen.getAllByText(`13,545 SQ. FT`, {
      exact: false,
    });
    expect(lotSize).toBeDefined();
  });
  it("should display bathroom quantity", () => {
    const bath = screen.getAllByText(2, {
      exact: false,
    });
    expect(bath).toBeDefined();
  });
  it("should display bedroom quantity", () => {
    const bedroom = screen.getAllByText(3, {
      exact: false,
    });
    expect(bedroom).toBeDefined();
  });
  it("should display id", () => {
    const id = screen.getAllByText(
      `${mockSingleListing.id.toString().padStart(6, "0")}`,
      {
        exact: false,
      }
    );

    expect(id).toBeDefined();
  });
});
