import { useState, memo } from "react";

const CircleTabs = memo(({ tabs, changeTabContent }) => {
    const [activeTab, setActiveTab] = useState(0);

    const changeTab = (tabIndex) => {
      changeTabContent(tabIndex)
    }
    return (<>
    {tabs.map((item,key)=>(<button key={key+'-circle-tab'}
        type="button"
        onClick={()=> { setActiveTab(key); changeTab(key);}}
        className={activeTab === key ? "btn btn-outline-raffle btn-raffle-active" : "btn btn-outline-raffle"}
      >
        {item}
      </button>))}
      </>)
});

export default CircleTabs;