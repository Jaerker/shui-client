import { observer } from "mobx-react-lite";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header"
import MessageBoard from "../Components/MessageBoard/MessageBoard";
import Button from "../Components/Button/Button";

const App = () => {
  return (
    <>
      <Header/>
      <section className='flex flex-col mb-20'>
        <MessageBoard />
      </section>
    <Footer />
    <Button />
    </>
  );
}

export default observer(App);
