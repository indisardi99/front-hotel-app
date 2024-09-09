import { CreateEmployee } from "@/components/create-employee/create-employee";

const page = () => {
  return (
    <div className="flex flex-1 flex-col items-center p-2 m-2 justify-center ">
      <h1 className="text-3xl mb-10 font-bold text-gray-800 m-2 text-center">
        Crea un usuario de empledo
      </h1>
      <CreateEmployee />
    </div>
  );
};

export default page;
