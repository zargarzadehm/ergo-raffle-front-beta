const Tabs = ({ tabs, changeTabContent, activeTab, setActiveTab, disableTab }) => {
   const changeTab = (tabIndex) => {
      changeTabContent(tabIndex)
   }
   return (<ul className="raffle-links nav justify-content-center">
      {
         tabs.map((item, key) => (
            Array.isArray(disableTab) ? disableTab.includes(key + 1)
               ?
               null
               :
               <li key={item + key + 'tabs'} className="raffle-item nav-item">
                  <span onClick={() => { setActiveTab(key); changeTab(key) }} className={
                     activeTab === key
                        ?
                        "raffle-link nav-link active-link"
                        :
                        "raffle-link nav-link"
                  }>{item}</span>
               </li>
               :
               <li key={item + key + 'tabs'} className="raffle-item nav-item">
                  <span onClick={() => { setActiveTab(key); changeTab(key) }} className={
                     activeTab === key
                        ?
                        "raffle-link nav-link active-link"
                        :
                        "raffle-link nav-link"
                  }>{item}</span>
               </li>
         )
         )
      }
   </ul>)
}

export default Tabs;