import { useEffect, useState } from "react";
import Image from "next/image";

// Minimal Card components
function Card({ children, className }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

export default function FeaturedSection({
  titleImg, // path to the title image (LimitedTime.png, etc.)
  altText, // alt for the image
  filterFn, // function to filter products
  fallbackText, // what to show when no products
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/public/products");
        const data = await res.json();

        console.log("Fetched products:", data);

        const filtered = filterFn ? data.filter(filterFn) : data;
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // format price with commas
  const formatPrice = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <section className="w-full mt-4">
      {/* Title Image */}
      <div className="w-full h-9 relative mb-4">
        <Image
          src={titleImg}
          alt={altText}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : products.length > 0 ? (
        <div className="flex gap-[4px] overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {products.map((p) => (
            <Card
              key={p._id}
              className="min-w-[160px] snap-start "
            >
              <CardContent>
                {/* Product Image with aspect ratio wrapper */}
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={p.images?.[0]?.url || "/placeholder.png"}
                    alt={p.productName || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>

                
                {/* Prices + Discount */}
                <div className="flex items-center justify-between px-[2px] mt-[2px] pb-3">
                  {/* Left side: Discounted + Original */}
                  <div className="flex items-center gap-[4px]">
                    {/* Discounted Price */}
                    <p className="font-semibold text-[12px] text-[#D8A31B] font-inter">
                      ₦{formatPrice(p.discountedPrice)}
                    </p>

                    {/* Original Price */}
                    <p className="text-[8px] font-inter text-black/50 line-through">
                      ₦{p.formattedPrice}
                    </p>
                  </div>

                  {/* Right side: Discount Badge */}
                  <div className="w-[24px] h-[14px] border border-[#D8A31B] rounded-[2px] flex items-center justify-center">
                    <span className="text-[8px] font-semibold font-inter text-[#D8A31B]">
                      -{p.discount}%
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm">{fallbackText}</p>
      )}
    </section>
  );
}