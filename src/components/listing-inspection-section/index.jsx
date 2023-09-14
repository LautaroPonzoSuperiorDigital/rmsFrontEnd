import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useListingInspections } from "../../hooks/useListingInspections";
import { api } from "../../services/api";
import { Input } from "../input";
import { ListingInspectionSectionCategory } from "../listing-inspection-section-category";
import {
  CategoryList,
  Header,
  ListingInspectionSectionContainer,
  NewCategory,
} from "./styles";
import { formatDate } from "../../services/date";
import { DateTime } from "luxon";
import { useModal } from "../modal/context";
import { useListingDetails } from "../../hooks/useListingDetails";

export function ListingInspectionSection({ section }) {
  const [categories, setCategories] = useState([]);

  const modal = useModal();
  const { listing } = useListingDetails();
  const { editingInspection, onSectionChanged } = useListingInspections();
  const [isMobile, setIsMobile] = useState(false);

  const noteInputRef = useRef(null);

  const inspectionTitle = useMemo(() => {
    if (!editingInspection) {
      return null;
    }

    const date = formatDate({
      date: editingInspection.date,
      formatOptions: DateTime.DATE_SHORT,
    });

    return isMobile
      ? `${editingInspection.name}`
      : `${editingInspection.name} ${date} /`;
  }, [editingInspection, isMobile]);

  const handleSaveNote = async () => {
    try {
      await api.patch(`/listing/${listing.id}/section/${section.id}`, {
        note: noteInputRef.current.value,
      });

      onSectionChanged({ ...section, note: noteInputRef.current.value });
    } catch (err) {
      console.log(err);
      alert("Error saving note");
    }
  };

  const handleCreateCategory = async () => {
    try {
      const { data } = await api.post(`/section/${section.id}/category`, {
        name: "Other",
      });

      setCategories((oldState) => [...oldState, data]);
    } catch (err) {
      alert("Error creating category");
    }
  };

  const onCategoryRemoved = useCallback((removedCategoryId) => {
    setCategories((oldState) =>
      oldState.filter((category) => category.id !== removedCategoryId)
    );
  }, []);

  const onCategoryUpdated = useCallback(
    (updatedCategory) => {
      const _categories = [...categories];
      const categoryIndex = _categories.findIndex(
        (category) => category.id === updatedCategory.id
      );

      if (categoryIndex === -1) {
        return;
      }

      _categories.splice(categoryIndex, 1, updatedCategory);
      setCategories(_categories);
    },
    [categories]
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get(`/section/${section.id}/category`);

        setCategories(data);
      } catch (err) {
        alert("Error loading categories");
      }
    }

    loadCategories();
  }, [section]);

  useEffect(() => {
    function updateModalWidth() {
      setIsMobile(window.outerWidth <= 768);
    }

    updateModalWidth();

    window.addEventListener("resize", updateModalWidth);

    return () => {
      window.removeEventListener("resize", updateModalWidth);
    };
  }, []);

  return (
    <ListingInspectionSectionContainer>
      <Header>
        <h1 role="button" onClick={modal.close}>
          {inspectionTitle}
        </h1>
        <h1>{section.name}</h1>
      </Header>

      <Input
        ref={noteInputRef}
        label="NOTE"
        defaultValue={section.note}
        onBlur={handleSaveNote}
        containerStyle={{
          marginTop: "2.5rem",
          alignSelf: "flex-start",
          width: "35%",
        }}
      />

      <CategoryList>
        {categories.map((category) => (
          <ListingInspectionSectionCategory
            key={category.id}
            category={category}
            onCategoryRemoved={onCategoryRemoved}
            onCategoryUpdated={onCategoryUpdated}
          />
        ))}

        <NewCategory role="button" onClick={handleCreateCategory}>
           {
            isMobile ? <span>+ Add other</span> : <span>Other</span>
           }

          <span>+ Add</span>
        </NewCategory>
      </CategoryList>
    </ListingInspectionSectionContainer>
  );
}

ListingInspectionSection.propTypes = {
  section: PropTypes.object.isRequired,
};
