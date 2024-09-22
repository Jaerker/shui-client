import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header"

function App() {

  return (
    <>
      <Header/>
      <section className='flex flex-col items-center justify-center h-dvh'>
      <main>
        <h1 className='font-medium text-2xl text-center px-10' >Du har inga meddelanden att visa!</h1>
      </main>
    </section>
    <Footer />
    
    </>
  );
}

export default App
