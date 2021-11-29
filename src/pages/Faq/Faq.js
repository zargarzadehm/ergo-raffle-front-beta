import FaqAccordion from '../../components/FaqAccordion';
import Title from '../../components/Title';
import { faq } from '../../statics'
import SupportLink from "./SupportLink";

const Faq = () => {
    return (<>
        <Title title={'Ergo Raffle - FAQ'}/>
        <main>
            <section id="questions" className="p-lg-5 mt-header">
                <div className="container">
                    <h2 className="faq-title text-center mb-4">Have any Questions?</h2>
                    <div className="accordion" id="questions">
                        {faq.map((item, key) => (
                            <FaqAccordion key={key + '-faq-row'} item={item} elemKey={key} parent={'questions'}/>
                        ))}
                    </div>
                </div>
                <SupportLink/>
            </section>
        </main>
    </>)
}

export default Faq;
