import { lazy, useState } from 'react';
import '../assets/css/faq.css';
import Title from '../components/Title';
import staticText from '../statics';

const FaqAccordion = lazy(()=> import('../components/FaqAccordion'));

const Faq = () => {
    let [faqs] = useState(staticText.faq)
    return(<>
    <Title title={'Ergo Raffle - FAQ'} />
  <main>
    {/* <!-- Question Accordion --> */}
    <section id="questions" className="p-lg-5 mt-header">
      <div className="container">
        <h2 className="faq-title text-center mb-4">Have any questions?</h2>
        <div className="accordion" id="questions">
          {faqs.map((item, key)=> (<FaqAccordion key={key+'-faq-row'} item={item} elemKey={key} parent={'questions'} />))}
        </div>
      </div>
    </section>
  </main>
  </>)
}

export default Faq;