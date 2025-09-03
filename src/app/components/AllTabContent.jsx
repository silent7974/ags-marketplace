import { useGetPublicProductsQuery } from "@/redux/services/productApi";
import Image from "next/image";

export default function AllTabContent({ activeTab }) {
  const { data, error, isLoading } = useGetPublicProductsQuery();

  const formatPrice = (price) => {
    if (!price || price === 0) return ""; // hide 0 or falsy prices
    return `₦${price.toLocaleString("en-NG")}`;
  };

  const renderProductsGrid = (products) => (
    <div className="grid grid-cols-2 gap-[5px] px-2">
      {products.map((product, index) => {
        const hasDiscount = product.discount && product.discount > 0;
        const discountedPrice = hasDiscount
          ? product.price - (product.price * product.discount) / 100
          : product.price;

        return (
          <div key={product._id}>
            {/* Product Image with alternating height */}
            <Image
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.productName}
              width={500}
              height={index % 2 === 0 ? 132 : 168}
              className={`w-full object-cover ${
                index % 2 === 0 ? "h-[132px]" : "h-[168px]"
              }`}
            />

            {/* Product Info */}
            <div className="mt-[2px]">
              {/* Product Name */}
              <h3 className="font-[Montserrat] text-[11px] text-black/50 truncate">
                {product.productName}
              </h3>

              {/* Price & Cart Row */}
              <div className="flex items-center justify-between mt-[2px]">
                <div className="flex items-baseline space-x-[2px]">
                  {/* Always show discountedPrice (even if no discount) */}
                  <span className="font-[Inter] font-medium text-[10px]">
                    {discountedPrice > 0 ? formatPrice(discountedPrice) : ""}
                  </span>

                  {/* Only show original price if there’s a discount */}
                  {hasDiscount && product.price > 0 && (
                    <span className="font-[Inter] text-[8px] text-black/50 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Cart Button */}
                <div className="w-[36px] h-[29px] flex items-center justify-center border border-black/50 rounded-[24px]">
                  <Image
                    src="/add-shopping-cart.svg"
                    width={16}
                    height={16}
                    alt="Add shopping cart"
                  />
                </div>
              </div>

              {/* Discount Badge */}
              <div className="mt-[2px] font-[Inter] text-[8px] text-[#016A87]">
                {hasDiscount ? `${product.discount}% off` : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );


  switch (activeTab) {
    case "Deals":
      if (isLoading) return <div className="p-4">Loading deals...</div>;
      if (error) return <div className="p-4 text-red-500">Failed to load deals</div>;

      const deals = data
        ?.filter((product) => product.discount && product.discount > 0)
        .sort((a, b) => b.discount - a.discount);

      if (!deals?.length) {
        return <div className="p-4 text-black/50">No deals available right now</div>;
      }

      return renderProductsGrid(deals);

    case "5-Star Rated":
      return <div className="p-4">⭐ Top Rated Section</div>;

    case "Best-Selling":
      return <div className="p-4">📈 Best Selling Section</div>;

    case "New In":
      if (isLoading) return <div className="p-4">Loading new arrivals...</div>;
      if (error) return <div className="p-4 text-red-500">Failed to load products</div>;

      const newIn = [...(data || [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      if (!newIn.length) {
        return <div className="p-4 text-black/50">No new arrivals yet</div>;
      }

      return renderProductsGrid(newIn);

    case "All":
    default:
      if (isLoading) return <div className="p-4">Loading products...</div>;
      if (error) return <div className="p-4 text-red-500">Failed to load products</div>;

      return renderProductsGrid(data || []);
  }
}