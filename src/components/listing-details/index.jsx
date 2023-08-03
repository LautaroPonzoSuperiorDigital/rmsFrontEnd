/* eslint-disable react/prop-types */
import CheckBoxLog from "../checkBox"
import { Edit, Trash } from "../icons"
import {
  Album,
  DetailsBox,
  ExtraDetailsBox,
  ListingDetailsContainer,
  MainDetails,
  MainDetail,
  ExtraDetail,
  Amenities,
  Requirements,
  ProfitAndLossBox,
  ExtraDetailsTop,
  Action,
} from "./styles"

export function ListingDetails({ listing }) {
  console.log(listing)
  return (
    <ListingDetailsContainer>
      <DetailsBox>
        <Album>
          Album
        </Album>

        <MainDetails>
          <MainDetail>
            <span>ID</span>
            <span>{listing.id}</span>
          </MainDetail>

          <MainDetail>
            <span>LOCATION</span>
            <span>{listing.location}</span>
          </MainDetail>

          <MainDetail>
            <span>LOT SIZE</span>
            <span>{listing.lotSize}</span>
          </MainDetail>

          <MainDetail>
            <span>HOUSE SIZE</span>
            <span>{listing.houseSize}</span>
          </MainDetail>

          <MainDetail>
            <span>PRICE</span>
            <span>{listing.location}</span>
          </MainDetail>

          <ProfitAndLossBox>
            <MainDetail>
              <span>TOTAL PROFIT</span>
              <span>$ 364,675</span>
            </MainDetail>

            <MainDetail>
              <span>TOTAL LOSS</span>
              <span>$ 54,000</span>
            </MainDetail>
          </ProfitAndLossBox>
        </MainDetails>

        <ExtraDetailsBox>
          <ExtraDetailsTop>
            <ExtraDetail>
              <span>PUBLIC</span>
              <CheckBoxLog
                checked={listing.isPublic}
              />
            </ExtraDetail>

            <Action>
              <Edit />
              <span>Edit Listing Details</span>
            </Action>

            <Action>
              <Trash />
              <span>Delete Listing</span>
            </Action>
          </ExtraDetailsTop>

          <ExtraDetail>
            <span># BEEDROOMS</span>
            <span>{listing.bedrooms}</span>
          </ExtraDetail>

          <ExtraDetail>
            <span># BATHROOMS</span>
            <span>{listing.bathrooms}</span>
          </ExtraDetail>

          <ExtraDetail>
            <span>AMENITIES</span>
            <Amenities>
            {listing.Amenities?.map(amenity => (
              <li key={amenity.id}>{amenity.name}</li>
            ))}
            </Amenities>
          </ExtraDetail>

          <ExtraDetail>
            <span>REQUIREMENTS</span>
            <Requirements>
            {listing.Requirements?.map(requirement => (
              <li key={requirement.id}>{requirement.name}</li>
            ))}
            </Requirements>
          </ExtraDetail>
        </ExtraDetailsBox>
      </DetailsBox>
    </ListingDetailsContainer>
  )
}