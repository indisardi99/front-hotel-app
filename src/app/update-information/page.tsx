import { ProfileEditForm } from "@/components/edit-profile/edit-profile";

export default function EditProfile() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
      <ProfileEditForm />
    </div>
  );
}
