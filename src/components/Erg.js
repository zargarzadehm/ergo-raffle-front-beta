import { memo } from "react";
import staticText from "../statics";

const Erg = memo(({ erg, shouldDisplay }) => {
    return (<>{erg / staticText.ERG_SCALE}{shouldDisplay ? ' ERG' : ''}</>)
});

export default Erg;