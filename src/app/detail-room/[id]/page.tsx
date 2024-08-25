import RoomDetails from "@/components/detail-room/detail-room";

export default async function RoomDetail({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/getRoomById/${params.id}`,
    { next: { revalidate: 1 } }
  ).then((res) => res.json());

  const [roomDetails, services] = response;

  return (
    <div className="flex w-full">
      <RoomDetails room={roomDetails} services={services} />
    </div>
  );
}
