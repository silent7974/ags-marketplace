import { useEffect, useState } from "react";
import Image from "next/image";

// Minimal Card components (replace later with shadcn/ui or your own)
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

export default function FeaturedSection({
  titleImg,       // path to the title image (LimitedTime.png, etc.)
  altText,        // alt for the image
  filterFn,       // function to filter products
  fallbackText,   // what to show when no products
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

  return (
    <section className="w-full mt-4 px-2">
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
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <Card key={p._id}>
              <CardContent>
                <Image
                  src={p.images?.[0]?.url || "/placeholder.png"} // first product image
                  alt={p.productName || "Product"}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base font-semibold truncate">
                    {p.productName}
                  </h3>
                  <p className="text-gray-600 text-sm">₦{p.price}</p>
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