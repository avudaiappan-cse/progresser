import { useState } from "react";
import FormComponent from "./Components/FormComponent";
import HistoryComponent from "./Components/HistoryComponent";

const initialDataDummy = {
  current: null,
  prevHistory: [],
  friends: [],
};

function App() {
  const [userInfo, setUserInfo] = useState(initialDataDummy);
  return (
    <div className="App">
      {/* 
        Form Component
        History Component
        Friends Component
        Friends Suggestion Component
      */}
      <FormComponent userInfo={userInfo} setUserInfo={setUserInfo} />
      <HistoryComponent userInfo={userInfo} />
    </div>
  );
}

export default App;
