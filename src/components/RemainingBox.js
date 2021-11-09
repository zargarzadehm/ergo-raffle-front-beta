import Days from "./Days";

const RemainingBox = ({ raffle }) => {
    return (<div className="remain-box mt-lg-5">
        <p className="remaining-days">
            <Days raffle={raffle} />
        </p>
    </div>)
}

export default RemainingBox;