"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RoomDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [roomDetails, setRoomDetails] = useState<any>(null);
  const [availableFeatures, setAvailableFeatures] = useState<any[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [featuresToDelete, setFeaturesToDelete] = useState<string[]>([]);
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const fetchRoomDetails = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/room/getRoomByIdAdmin/${id}`
          );
          if (!res.ok) {
            throw new Error("Error al obtener los detalles de la habitación");
          }
          const data = await res.json()
          setRoomDetails(data.room)
          setAvailableFeatures(data.availableFeatures)
          setAvailableCategories(data.availableCategories)
          setCurrentImage(data.room.images[0])
          console.log(data)
        } catch (error) {}
      }
      fetchRoomDetails()

    }
  }, [id]);

  const handleToggleFeature = (featureId: string) => {
    const removedFeature = roomDetails.features.find(
      (feature: any) => feature.id === featureId
    );

    if (removedFeature) {
      setRoomDetails({
        ...roomDetails,
        features: roomDetails.features.filter(
          (feature: any) => feature.id !== featureId
        ),
      });
      setAvailableFeatures([...availableFeatures, removedFeature]);

      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
      setFeaturesToDelete([...featuresToDelete, removedFeature.name]);
    }
  };

  const handleToggleAvailableFeature = (featureId: string) => {
    const selectedFeature = availableFeatures.find(
      (feature: any) => feature.id === featureId
    );

    if (selectedFeature) {
      setAvailableFeatures(
        availableFeatures.filter((feature: any) => feature.id !== featureId)
      );
     
      setRoomDetails({
        ...roomDetails,
        features: [...roomDetails.features, selectedFeature],
      });

      setSelectedFeatures([...selectedFeatures, featureId]); 
      setFeaturesToDelete(
        featuresToDelete.filter((id) => id !== selectedFeature.name)
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = async (applyToAll: boolean) => {
    if (
      (number !== undefined && number !== roomDetails.number) ||
      (category !== undefined && category !== roomDetails.category)
    ) {
      if (applyToAll) {
        toast.error(
          "Si modificas un número o categoría no puedes aplicar los cambios a todas las habitaciones"
        );
        return;
      }
    }

    Swal.fire({
      title: applyToAll
        ? "Aplicar a todas las habitaciones de la clase?"
        : "Aplicar cambios a esta habitación?",
      text: applyToAll
        ? "¿Estás seguro de que quieres aplicar estos cambios a todas las habitaciones de la clase?"
        : "¿Estás seguro de que quieres aplicar estos cambios solo a esta habitación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const body: UpdateRoomDto = {
          number,
          price,
          category,
          featuresNames:
            selectedFeatures.length > 0
              ? selectedFeatures.map(
                  (id) =>
                    roomDetails.features.find(
                      (feature: any) => feature.id === id
                    )?.name
                )
              : undefined,
          featuresToDelete:
            featuresToDelete.length > 0 ? featuresToDelete : undefined,
        };

        const url = applyToAll
          ? `${process.env.NEXT_PUBLIC_API_URL}/room/updateRoom/${id}?applyToAll=true`
          : `${process.env.NEXT_PUBLIC_API_URL}/room/updateRoom/${id}`;

        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!res.ok) {
            throw new Error("Error al actualizar la habitación");
          }

          if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);

            const imageRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/files/uploadRoomImage/${id}`,
              {
                method: "POST",
                body: formData,
              }
            );
            if (!imageRes.ok) {
              throw new Error("Error al subir la imagen");
            }
          }

          Swal.fire("¡Hecho!", "Cambios aplicados", "success").then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error updating room:", error);
          toast.error("Error al aplicar los cambios");
        }
      }
    });
  };

  if (!roomDetails) {
    return <p>Cargando detalles de la habitación...</p>;
  }

  return (
    <div className="p-7 pt-20 mt-20">
      <Link
        href="/admin/habitaciones"
        className="text-black underline mb-2 block text-sm"
      >
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Modificar Habitación
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-2 bg-gray-100 p-3 rounded-md shadow-md h-full">
          <label htmlFor="roomNumber" className="font-semibold text-sm">
            Número
          </label>
          <input
            id="roomNumber"
            type="text"
            placeholder={roomDetails.number}
            value={number || ""}
            onChange={(e) => setNumber(parseInt(e.target.value) || undefined)}
            className="p-1 border border-gray-300 rounded-md text-sm"
          />

          <label htmlFor="roomPrice" className="font-semibold text-sm">
            Precio
          </label>
          <input
            id="roomPrice"
            type="text"
            placeholder={`$${roomDetails.price}`}
            value={price || ""}
            onChange={(e) => setPrice(parseInt(e.target.value) || undefined)}
            className="p-1 border border-gray-300 rounded-md text-sm"
          />

          <label htmlFor="roomCategory" className="font-semibold text-sm">
            Categoría
          </label>
          <select
            id="roomCategory"
            className="p-1 border border-gray-300 rounded-md text-sm"
            value={category || roomDetails.category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleApply(true)}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Aplicar a Todas
            </button>
            <button
              onClick={() => handleApply(false)}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Aplicar Solo Aquí
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-gray-100 p-3 rounded-md shadow-md h-full">
          <h2 className="text-lg font-semibold mb-2">
            Agregar características:
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {availableFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleToggleAvailableFeature(feature.id)}
                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
              >
                {feature.name}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-4 mb-2">
            Características actuales:
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {roomDetails.features.map((feature: any) => (
              <button
                key={feature.id}
                onClick={() => handleToggleFeature(feature.id)}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                {feature.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="imageUpload" className="block font-semibold mb-2">
          Cambiar Imagen
        </label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          className="mb-4"
        />
        <div>
          {currentImage ? (
            <img
              src={currentImage}
              alt="Imagen de la habitación"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              className="object-contain"
            />
          ) : (
            <span>No hay imagen seleccionada</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;

interface UpdateRoomDto {
  number?: number;
  price?: number;
  category?: string;
  featuresNames?: string[];
  featuresToDelete?: string[];
}
