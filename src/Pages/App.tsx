import { observer } from 'mobx-react-lite';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header'
import MessageBoard from '../Components/MessageBoard/MessageBoard';
import Form from '../Components/Form/Form';
import LoadingSpinner from '../Components/LodaingSpinner/LoadingSpinner';

const App = () => {
  return (
    <>
      <Header/>
      <section className='flex flex-col mb-20 mt-10'>
        <MessageBoard />
      </section>
      <Form />
      <Footer />
      <LoadingSpinner />
    </>
  );
}

export default observer(App);
