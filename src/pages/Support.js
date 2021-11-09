import SupportForm from '../webparts/Support/SupportForm';
import Title from '../components/Title';
import staticText from '../statics';
import DashboardFaq from '../webparts/Dashboard/DashboardFaq';

const Support = () => {
  const faqs = staticText.faq;

  return (<>
    <Title title={'Ergo Raffle - Support'} />
    <main>
      <div className="container">
        <div className="row g-4">
          <DashboardFaq faqs={faqs} />
          <section id="support-ticket" className="my-5">
            <div className="container">
              <SupportForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  </>);
}

export default Support;