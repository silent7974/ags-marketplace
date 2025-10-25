import Product from '@/models/product'
import dbConnect from "@/lib/mongodb"

export async function GET(req, { params }) {
  await dbConnect()
  const { id } = params

  const product = await Product.findById(id)
  if (!product) {
    return new Response('Product not found', { status: 404 })
  }
  return new Response(JSON.stringify(product), { status: 200 })
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = await params

  try {
    const body = await req.json()

    // Find current product
    const existingProduct = await Product.findById(id)
    if (!existingProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    // Compare old vs new — optional, but prevents unnecessary DB writes
    const isSame = Object.keys(body).every(key => {
      return JSON.stringify(existingProduct[key]) === JSON.stringify(body[key]);
    });
    if (isSame) {
      return new Response(JSON.stringify({ message: "No changes detected" }), { status: 400 });
    }

    // Update and return new doc
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // return updated document
      runValidators: true, // ensure schema validation
    });

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return new Response('Product not found', { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
}