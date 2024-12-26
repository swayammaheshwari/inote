import { connectToDB } from "@/utils/database";
import Main from "@/components/main/main";

export default async function Home() {
  try {
    await connectToDB();
  } catch (error) {
    throw error;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Welcome To inote
        </h1>
        <Main />
      </div>
    </>
  );
}
