
const productCategoryMap = {
  "Men's Fashion": {
    categories: {
      "Men's Native": ["Agbada", "Kaftan", "Senator"],
      "Shirts": ["Casual Shirt", "Dress Shirt", "Polo Shirt"],
      "Trousers": ["Jeans", "Chinos", "Formal Pants"],
      "Men's Shoes": ["Loafers", "Sneakers", "Sandals"],
      "Jackets": ["Blazers", "Leather Jackets", "Winter Coats"]
    },
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: true
    }
  },

  "Women's Fashion": {
    categories: {
      "Women's Native": ["Boubou", "Kaftan", "Ankara Gown"],
      "Dresses": ["Maxi Dress", "Midi Dress", "Mini Dress"],
      "Tops": ["Blouse", "Tank Top", "Crop Top"],
      "Skirts": ["Maxi Skirt", "Midi Skirt", "Mini Skirt"],
      "Women's Shoes": ["Heels", "Flats", "Sneakers"]
    },
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: true
    }
  },

  "Unisex Fashion": {
    categories: {
      "T-shirts": ["Plain Tee", "Graphic Tee"],
      "Hoodies": ["Pullover Hoodie", "Zip Hoodie"]
    },
    variants: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: true
    }
  },

  "Fabrics & Materials": {
    categories: {
      "Ankara": ["Plain Ankara", "Pattern Ankara"],
      "Lace": ["Swiss Lace", "Cord Lace"]
    },
    variants: {
      measurement: "yards", // replaces size
      colors: true
    }
  },

  "Accessories": {
    categories: {
      "Bags": ["Handbag", "Backpack"],
      "Jewelry": ["Necklace", "Bracelet", "Earrings", "Wristwatch"]
    },
    variants: {
      colors: true
    }
  },

  "Beauty & Personal Care": {
    categories: {
      "Makeup": ["Foundation", "Lipstick", "Mascara"],
      "Skincare": ["Moisturizer", "Sunscreen", "Face Serum"]
    },
    variants: {}
  },

  "Home & Lifestyle": {
    categories: {
      "Furniture": ["Chair", "Table", "Bed"],
      "Decor": ["Wall Art", "Rugs"]
    },
    variants: {}
  },

  "Gift Shops": {
    categories: {
      "Gift Hampers": ["Birthday", "Wedding"],
      "Custom Items": ["Engraved Mug", "Photo Frame"]
    },
    variants: {}
  },

  "Kids Fashion": {
    categories: {
      "Boys Wear": ["Shirts", "Shorts"],
      "Girls Wear": ["Dresses", "Skirts"]
    },
    variants: {
      sizes: ["2-3 years", "4-5 years", "6-7 years", "8-9 years", "10-12 years"],
      colors: true
    }
  },

  "Art & Custom Crafts": {
    categories: {
      "Paintings": ["Canvas", "Oil Painting"],
      "Sculptures": ["Wood", "Metal"]
    },
    variants: {}
  },

  "Electronics & Gadgets": {
    categories: {
      "Phones": ["Android", "iPhone"],
      "Laptops": ["Windows Laptop", "MacBook"]
    },
    variants: {
      memory: ["64GB", "128GB", "256GB", "512GB", "1TB"], // replaces size
      ram: ["4GB", "8GB", "16GB", "32GB"]
    }
  },

  "Baby & Maternity": {
    categories: {
      "Baby Clothing": ["Bodysuit", "Rompers"],
      "Maternity Wear": ["Maternity Dress", "Maternity Tops"]
    },
    variants: {
      sizes: [
        "0-3 months", "3-6 months", "6-12 months",
        "1-2 years", "2-3 years"
      ],
      colors: true
    }
  }
};

export default productCategoryMap