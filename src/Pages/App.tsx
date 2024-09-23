import { observer } from "mobx-react-lite";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header"
import MessageBoard from "../Components/MessageBoard/MessageBoard";
import Button from "../Components/Button/Button";
import Form from "../Components/Form/Form";

const App = () => {
  return (
    <>
      <Header/>
      <section className='flex flex-col mb-20'>
        <MessageBoard />
      </section>
      <Form />
    <Footer />
    <Button type='edit'/>
    </>
  );
}

export default observer(App);
