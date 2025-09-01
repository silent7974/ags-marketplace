export default function ProductBasicDetails({ productData, setProductData }) {
  const DISCOUNT_OPTIONS = [5, 10, 20, 50, 75, 90];

  // Format price with commas
  function formatPrice(value) {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Handle discount change
  function handleDiscountChange(e) {
    const discountValue = parseFloat(e.target.value) || 0;
    const priceNum = Number(productData.price || 0);

    const discountedPrice = priceNum - (priceNum * discountValue / 100);

    setProductData(prev => ({
      ...prev,
      discount: discountValue,
      discountedPrice
    }));
  }

  // Handle price input change (digits only)
  function handlePriceChange(e) {
    const rawValue = e.target.value.replace(/[^0-9]/g, ''); // digits only
    const priceNum = Number(rawValue || 0);
    const discountPercent = parseFloat(productData.discount) || 0;

    const discountedPrice = priceNum - (priceNum * discountPercent / 100);

    setProductData(prev => ({
      ...prev,
      price: priceNum,
      formattedPrice: formatPrice(rawValue),
      discountedPrice
    }));
  }

  function handleQuantityChange(e) {
    const value = e.target.value.replace(/\D/g, '');
    setProductData(prev => ({ ...prev, quantity: Number(value || 0) }));
  }

  function handleDescriptionChange(e) {
    if (e.target.value.length <= 110) {
      setProductData(prev => ({ ...prev, description: e.target.value }));
    }
  }

  return (
    <form className="max-w-md mt-[24px]">
      {/* Product Name */}
      <label htmlFor="productName" className="block text-black text-[16px] font-inter font-normal mb-2">
        Product name
      </label>
      <input
        id="productName"
        type="text"
        placeholder="Getzner Shadda - Prestige Edition"
        value={productData.productName}
        onChange={(e) => setProductData(prev => ({ ...prev, productName: e.target.value }))}
        className="w-full h-[36px] rounded-[4px] border border-black/30 px-2 text-black text-[12px] font-inter placeholder-black/50"
      />

      {/* Price and Discount */}
      <div className="flex gap-[12px] mt-4">
        {/* Price */}
        <div className="flex-1 flex flex-col">
          <label htmlFor="price" className="block text-black text-[16px] font-inter font-normal mb-2">
            Price
          </label>
          <div className="flex items-center h-[36px] rounded-[4px] border border-black/30 px-2">
            <span className="text-black font-medium select-none">₦</span>
            <input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={productData.formattedPrice || ''}
              onChange={handlePriceChange}
              className="flex-1 h-full border-none focus:outline-none text-black text-[12px] font-inter placeholder-black/50 ml-1"
            />
          </div>
        </div>

        {/* Discount */}
        <div className="flex-1 flex flex-col">
          <label htmlFor="discount" className="block text-black text-[16px] font-inter font-normal mb-2">
            Discount
          </label>
          <select
            id="discount"
            value={productData.discount || ''}
            onChange={handleDiscountChange}
            className="w-full h-[36px] rounded-[4px] border border-black/30 px-[2px] text-black text-[12px] font-inter"
          >
            <option value="" disabled>
              Select discount
            </option>
            {DISCOUNT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}%
              </option>
            ))}
          </select>
          <p className="mt-1 text-black/50 text-[8px] text-right font-inter">
            Discounted items get more clicks and sales
          </p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex-1 flex flex-col mt-4">
        <label htmlFor="quantity" className="block text-black text-[16px] font-inter font-normal mb-2">
          Quantity
        </label>
        <div className="flex items-center h-[36px] rounded-[4px] border border-black/30 px-2">
          <input
            id="quantity"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={productData.quantity || ''}
            onChange={handleQuantityChange}
            className="flex-1 h-full border-none focus:outline-none text-black text-[12px] font-inter placeholder-black/50 ml-1"
          />
        </div>
      </div>

      {/* Description */}
      <label htmlFor="description" className="block text-black text-[16px] font-inter font-normal mt-[16px] mb-2">
        Product description
      </label>
      <textarea
        id="description"
        placeholder={`Original Getzner shadda with a rich texture and smooth finish. Ideal for traditional wear and special events.`}
        value={productData.description || ''}
        onChange={handleDescriptionChange}
        rows={6}
        style={{ resize: 'none' }}
        className="w-full rounded-[4px] border border-black/30 px-2 py-1 text-black text-[12px] font-inter placeholder-black/50"
      />

      {/* Character count */}
      <p className="text-black/50 text-[8px] font-inter mt-1 text-right">
        {(productData.description || '').length} / 110
      </p>
    </form>
  );
}