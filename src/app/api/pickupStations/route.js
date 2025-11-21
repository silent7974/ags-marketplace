export async function GET(req) {
  const stations = [
    { id: 1, name: "Station 1", street: "Street 1", district: "Wuse", city: "Abuja", phone: "080xxxx" },
    { id: 2, name: "Station 2", street: "Street 2", district: "Maitama", city: "Abuja", phone: "080xxxx" },
    { id: 3, name: "Station 3", street: "Street 3", district: "Garki", city: "Abuja", phone: "080xxxx" },
  ];

  return new Response(
    JSON.stringify({ stations }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}