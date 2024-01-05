import { useState } from "react";


export const RestaurantCard = ({ product, onAddProduct }) => {
  // const [selectedProduct, setSelectedProduct] = useState(null);

  //   const handleExtrasSelected = (selectedData) => {
  //     handleAddToCart(
  //       selectedData.extras,
  //       selectedData.size,
  //       selectedData.totalExtrasPrice
  //     );
  //     console.log("selectedDataHOOME", selectedData);
  //   };

  //     const handleAddToCart = (extras, size, totalExtrasPrice )  => {
  //     if (product) {
  //       const productWithExtras = {
  //         ...product,
  //         extras: extras,
  //         size: size,
  //         totalExtrasPrice:totalExtrasPrice,
  //       };
  //       onAddProduct(productWithExtras);
  //       setSelectedProduct(null);
  //     }
  //   };

  return (
    <div className="carousel-element">
      <img
        className="carousel-image"
        src={product.imageUrl}
        alt={product.imageUrl}
      />

      <h2 className="carousel-name">{product.name}</h2>
      <div className="carouselFooter">
        <p className="carousel-price">{product.price} €</p>

        {/* <IconButton
          className="productPreviewBttn"
          style={{ color: "white" }}
          //onClick={() => setSelectedProduct(product)}
        > */}
        
      </div>
    </div>
  );
};
