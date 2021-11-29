import { memo } from "react";
import FaqAccordion from '../../components/FaqAccordion';

const DashboardFaq = memo(({ faqs }) => {
  return (<section id="questions" className="p-lg-5 mt-header">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">
        Do you have any issues?
      </h2>
      <div className="accordion mt-5" id="questions">
        {
          faqs.map((item, key) => (
            <FaqAccordion key={key + '-faq-row'} item={item} elemKey={key} parent={'questions'} />
          )
          )
        }
      </div>
    </div>
  </section>)
});

export default DashboardFaq;