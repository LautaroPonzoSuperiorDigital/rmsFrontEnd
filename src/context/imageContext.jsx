import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesBase64, setSelectedImagesBase64] = useState([]);

  return (
    <ImageContext.Provider value={{ selectedImages, setSelectedImages, selectedImagesBase64, setSelectedImagesBase64 }}>
      {children}
    </ImageContext.Provider>
  );
};
