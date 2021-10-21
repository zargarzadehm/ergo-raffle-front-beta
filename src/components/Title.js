import { memo } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Title = memo(({title, scripts})=> {
    return(<HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
    </HelmetProvider>);
});

export default Title;