export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  /*  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/getAllRooms?start=${searchParams?.start}&end=${searchParams?.end}`,
    {
      next: { revalidate: 1 },
    }
  ).then((res) => res.json());

  console.log(response); */

  const response = {
    data: [
      {
        id: "01dd1293-928a-44f5-9e5b-9fb90e72a5e4",
        number: 51,
        price: 120,
        category: "loft",
        images: ["https://www.lamasu.it/public/prodotti/378/1__40M0554.jpg"],
        features: [
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "113aafed-9f1b-49a6-81f7-a3d4d7b4aea3",
        number: 37,
        price: 90,
        category: "suite_premium",
        images: [
          "https://www.athinasuites.com/images/Homepage_Resort_INDEX/deluxe-suite.jpg",
        ],
        features: [
          {
            id: "49fbc617-9070-4438-877e-0e2878a89457",
            name: "Jacuzzi",
          },
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
        ],
        reservations: [],
      },
      {
        id: "028c5ea8-7e6b-4f67-ac3a-ce724767507f",
        number: 54,
        price: 120,
        category: "loft",
        images: ["https://www.lamasu.it/public/prodotti/378/1__40M0554.jpg"],
        features: [
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "049e57b7-aee7-4916-beac-3b3bd79cea2e",
        number: 24,
        price: 90,
        category: "suite_premium",
        images: [
          "https://www.athinasuites.com/images/Homepage_Resort_INDEX/deluxe-suite.jpg",
        ],
        features: [
          {
            id: "49fbc617-9070-4438-877e-0e2878a89457",
            name: "Jacuzzi",
          },
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
        ],
        reservations: [],
      },
      {
        id: "16b48186-8381-47f7-8929-59610e31aaca",
        number: 60,
        price: 120,
        category: "loft",
        images: ["https://www.lamasu.it/public/prodotti/378/1__40M0554.jpg"],
        features: [
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "05847bcf-d0d7-452e-ac74-81e7ff4b040c",
        number: 43,
        price: 120,
        category: "loft",
        images: ["https://www.lamasu.it/public/prodotti/378/1__40M0554.jpg"],
        features: [
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "1a2ef139-e962-4d5c-82cf-70423a0f0b74",
        number: 30,
        price: 90,
        category: "suite_premium",
        images: [
          "https://www.athinasuites.com/images/Homepage_Resort_INDEX/deluxe-suite.jpg",
        ],
        features: [
          {
            id: "49fbc617-9070-4438-877e-0e2878a89457",
            name: "Jacuzzi",
          },
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
        ],
        reservations: [],
      },
      {
        id: "0e4b1593-79a6-4d35-92fb-7301e9e46f0a",
        number: 68,
        price: 200,
        category: "loft_premium",
        images: [
          "https://stock.adobe.com/es/images/modern-luxury-beach-loft-apartment-with-sea-view/42365903",
        ],
        features: [
          {
            id: "49fbc617-9070-4438-877e-0e2878a89457",
            name: "Jacuzzi",
          },
          {
            id: "fa206db9-b4ce-4aa1-9420-b08bfac49834",
            name: "Balcón Privado",
          },
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "12b20242-cee6-45c1-83ae-c30c758f8f04",
        number: 19,
        price: 60,
        category: "suite",
        images: [
          "https://assets.milestoneinternet.com/cdn-cgi/image/f=auto/highgate-hotels/nau-hotels/siteimages/nau-salgados-dunas-suites-standard-double-room-with-balcony-view.jpg?width=600&height=600",
        ],
        features: [
          {
            id: "638d89c4-e16a-4688-a8f7-64103af92c00",
            name: "Dos camas individuales",
          },
        ],
        reservations: [],
      },
      {
        id: "0f301f1e-9e32-4ff9-8740-c0f9297d5832",
        number: 40,
        price: 90,
        category: "suite_premium",
        images: [
          "https://www.athinasuites.com/images/Homepage_Resort_INDEX/deluxe-suite.jpg",
        ],
        features: [
          {
            id: "49fbc617-9070-4438-877e-0e2878a89457",
            name: "Jacuzzi",
          },
          {
            id: "a0f46759-8373-4b01-ae88-0734f365759a",
            name: "Cama King Size",
          },
        ],
        reservations: [],
      },
    ],
    total: 80,
    currentPage: 1,
    totalPages: 8,
  };

  return <h1>{searchParams?.start}</h1>;
}
