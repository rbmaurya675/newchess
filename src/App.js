// export default App;
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MobileHeader from "./components/MobileHeader.js";
import Sidebar from "./components/Sidebar.js";
import Home from "./pages/Home.js";
import Leaderboard from "./pages/Leaderboard.js";
import PlayAI from "./pages/PlayAI.js";
import PlayOnline from "./pages/PlayOnline.js";
import PlaySolo from "./pages/PlaySolo.js";
import Puzzle from "./pages/Puzzle";
import Practice from "./pages/Practice.js";
import Play10Amount50 from "./pages/Play10Amount50.js";
import PlayWithOnline from "./pages/PlayWithOnline.js";
import Play5Amount from "./pages/Play5Amount.js";
import { LoginForm, SignUpForm } from "./features/auth/index.js";
import ForgetSection from "./Forget/ForgetSection.js";
import Deposit from "./pages/deposit.js";
import Kyc from "./pages/kyc.js";
import Dashboardheader from "./Dashboard-Component/dashboardheader.js";
import Withdrowal from "./Dashboard-Component/withdrowal.js";
import Dashincome from "./Dashboard-Component/dashincome.js";
import Userkyc from "./Dashboard-Component/userkyc.js";
import UserBet from "./Dashboard-Component/userBet.js";
import Admindashborad from "./Dashboard-Component/admindashborad.js";
import Admin from "./Dashboard-Component/admin.js";
import Adminmenu from "./Dashboard-Component/adminmenu.js";
import Userdata from "./Dashboard-Component/userdata.js";
import Profile from "./Dashboard-Component/profile.js";
import Adminwithdrow from "./Dashboard-Component/adminwithdrow.js";
import Adminallwithdrow from "./Dashboard-Component/adminallwithdrow.js";
import Admindeposit from "./Dashboard-Component/admindeposit.js";
import Setting from "./Dashboard-Component/setting.js";
import Translate from "./Dashboard-Component/translate.js";
import Settingdash2 from "./Dashboard-Component/settingdash2.js";
import Profildash2 from "./Dashboard-Component/profildash2.js";
import Dasprofile from "./components/dasprofile.js";
import P2P from "./samples/p2p.js";
import './assets/css/theme.css';
import Local from './samples/local.js';

function App() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  // Array of paths where sidebar should be hidden
  const hiddenPaths = [
    "/dashboardheader",
    "/account/login",
    "/account/signup",
    "/forget",
    "/Deposit",
    "/Kyc",
    "/Withdrowal",
    "/Dashincome",
    "/Userkyc",
    "/UserBet",
    "/admindashborad",
    "/admin",
    "/userdata",
    "/admindashborad",
    "/profile",
    "/setting",
    "/translate",
    "/adminwithdrow",
    "/adminallwithdrow",
    "/admindeposit",
    "/settingdash2",
    "/profildash2",
    "/Dasprofile",
    "/P2P",
    "/Local"

  ];

  // Check if current path is in hiddenPaths array
  const isHidden = hiddenPaths.includes(location.pathname);

  // Set sidebar display based on path
  const shouldShowSidebar = !isHidden;

  return (
    <div className="App">
      {shouldShowSidebar && <Sidebar />}

      <div className="w-100">
        <MobileHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/online" element={<PlayOnline />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/PlayWithOnline" element={<PlayWithOnline />} />
          <Route path="/Play10Amount50" element={<Play10Amount50 />} />
          <Route path="/Play5Amount" element={<Play5Amount />} />
          <Route path="/practice/vsai" element={<PlayAI />} />
          <Route path="/practice/solo" element={<PlaySolo />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/Kyc" element={<Kyc />} />
          <Route path="/Dashboardheader" element={<Dashboardheader />} />
          <Route path="/Withdrowal" element={<Withdrowal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Userkyc" element={<Userkyc />} />
          <Route path="/UserBet" element={<UserBet />} />
          <Route path="/Dashincome" element={<Dashincome />} />
          <Route path="/userdata" element={<Userdata />} />
          <Route path="/Adminmenu" element={<Adminmenu />} />
          <Route path="/Admindashborad" element={<Admindashborad />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminwithdrow" element={<Adminwithdrow />} />
          <Route path="/adminallwithdrow" element={<Adminallwithdrow />} />
          {/* <Route path="/deposit" element={<deposit} */}
          <Route path="/admindeposit" element={<Admindeposit />} />
          <Route path="/settingdash2" element={<Settingdash2 />} />
          <Route path="/profildash2" element={<Profildash2 />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/account/">
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
          <Route path="/forget" element={<ForgetSection />} />
          <Route path="/dasprofile" element={<Dasprofile />} />
          <Route path="/p2P" element={<P2P />} />
          <Route path="/local" element={<Local />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
