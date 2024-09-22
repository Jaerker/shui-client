import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header"
import MessageBoard from "../Components/MessageBoard/MessageBoard";
import { useStore } from "../Stores/store";

function App() {

  const {messageStore} = useStore();

  return (
    <>
      <Header/>
      <section className='flex flex-col items-center justify-center h-dvh'>
      <h1>{messageStore.title}</h1>
      <MessageBoard />
    </section>
    <Footer />
    
    </>
  );
}

export default App
