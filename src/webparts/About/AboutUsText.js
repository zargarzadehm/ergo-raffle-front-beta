import { memo } from "react";
import staticText from "../../statics";

const AboutUsText = memo(()=>{
    return (<p className="about-us-text">
      {staticText.about}
  </p>)
});

export default AboutUsText;