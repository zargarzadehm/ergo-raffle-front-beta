import { memo } from "react";

const RaffleGalleryNavigation = memo(({ row }) => {
    return (<>
        {row === 0 ?
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={row}
                className="active"
                aria-current="true"
                aria-label={"Slide " + row}
            ></button>
            :
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={row}
                aria-label={"Slide " + row}
            ></button>
        }
    </>)
});

export default RaffleGalleryNavigation;