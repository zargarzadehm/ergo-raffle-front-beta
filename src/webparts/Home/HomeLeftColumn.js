import { memo } from "react";
import { Link } from "react-router-dom";

const HomeLeftColumn = memo(() => {
    return (<div className="card mt-5" id="left-col">
    <div className="orange-circle orange-circle1"></div>
    <div className="orange-circle orange-circle2"></div>
    <div className="card-body">
      <h2 className="card-title mt-5">
        No act of kindness, no matter how small, is ever wasted
      </h2>
      <h6 className="card-subtitle mt-2 mb-5">James Joyce</h6>

      <div className="create-raffle d-flex justify-content-center">
        <Link to={"/raffle/create"}>
          <button type="button" className="btn btn-create-raffle">
            Create Raffle
          </button>
        </Link>
      </div>
    </div>
  </div>)
});

export default HomeLeftColumn;