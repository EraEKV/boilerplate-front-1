import Header from "@/app/widgets/Header";
import DropFile from "@/app/widgets/DropFile";
import RequestForm from "./widgets/RequestFrom";


export default function Home() {
  return (
    <div className="bg-white min-h-screen pt-32 space-y-20">
        <Header />
        <DropFile />

        <RequestForm />
    </div>
  );
}
