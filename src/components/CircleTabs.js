import { useState, memo } from "react";

const CircleTabs = memo(({ tabs, changeTabContent }) => {
  const [activeTab, setActiveTab] = useState('all');

  const changeTab = (tabIndex) => {
    changeTabContent(tabIndex)
  }
  return (<>
    {Array.isArray(tabs) && tabs.length > 0 ?
      [...tabs].map((item, key) => (<button key={key + '-circle-tab'}
        type="button"
        onClick={() => { setActiveTab(item.value); changeTab(item.value); }}
        className={activeTab === item.value ? "btn btn-outline-raffle btn-raffle-active" : "btn btn-outline-raffle"}
      >
      {item.label}
    </button>))
    : null}
  </>)
});

export default CircleTabs;