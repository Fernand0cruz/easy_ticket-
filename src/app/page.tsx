import Footer from "@/components/ui/footer";
import NavBar from "./components/navBar";
export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex-1 max-w-screen-xl m-auto w-full mt-5 px-5">
        <h1>Home</h1>
      </div>
      <Footer />
    </>
  );
}
