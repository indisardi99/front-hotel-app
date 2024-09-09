import { CreateEmployee } from "@/components/create-employee/create-employee";

const page = () => {
  return (
    <div className="flex mt-40 flex-col items-center p-2 m-2 justify-center ">
      <h1 className=" m-2 p-2 font-bold text-xl">Crea un usuario empleado</h1>
      <CreateEmployee />
    </div>
  );
};

export default page;
