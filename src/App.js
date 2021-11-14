import Routes from "./Routes";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import "./assets/style/style.css";
import { memo } from "react";

const App = memo(() => {
  return (
    <>
      <Layout>
        <div id="main-content">
          <Routes />
        </div>
      </Layout>
    </>
  );
});

export default App;
