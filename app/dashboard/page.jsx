const Dashboard = () => {
  const [content, setContent] = useState("Profile");
  const { userData, creatorData, isAuthenticated, setIsAuthenticated, loading, showDash, setShowDash } = useContextUser();
  const [isEffectCompleted, setIsEffectCompleted] = useState(false);
  const router = useRouter();
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const [myTutors, setMyTutors] = useState([]);
  const [showChats, setShowChats] = useState(false);

  // Early returns must happen before the hooks
  if (loading) {
    return <div className="page-loader"></div>;
  }

  if (!isAuthenticated || !userData) {
    return null;
  }

  useEffect(() => {
    if (!isAuthenticated || !userData) {
      router.push('/auth/login');
    } else if (isAuthenticated && !userData.role_name.includes('student')) {
      router.push('/tutordashboard');
    } else {
      setIsEffectCompleted(true);
    }
  }, [isAuthenticated, loading, router, userData]);


  useEffect(() => {
    const getTutors = async () => {
      try {
        const response = await fetch(`http://10.1.10.89:3000/user/mytutors`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setMyTutors(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTutors();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch(`http://10.1.10.89:3000/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.log('Cannot log out');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="dash-container">
      <ul className={`nav-list ${showDash ? 'mobile-dash' : ''}`}>
        <div className="username">
          <h1>{userData?.username}</h1>
          <FontAwesomeIcon icon={faClose} className="close-dashlinks" onClick={() => setShowDash(!showDash)} />
        </div>
        <li className="navitem" onClick={() => { setContent("Profile"); setShowDash(!showDash); }}>
          <FontAwesomeIcon icon={faUser} /> Profile
        </li>
        {creatorData && (
          <li className="navitem" onClick={() => { setContent("Creator"); setShowDash(!showDash); }}>
            <FontAwesomeIcon icon={faArtstation} /> Creator Panel
          </li>
        )}
        <li className="navitem" onClick={() => { setShowChats(true); setShowDash(!showDash); }}>
          <FontAwesomeIcon icon={faEnvelope} /> Messages
        </li>
        <li className="navitem" onClick={() => { setContent("Password"); setShowDash(!showDash); }}>
          <FontAwesomeIcon icon={faLock} /> Change Password
        </li>
        {myTutors.length > 0 && (
          <li className="navitem" onClick={() => { setContent('Tutors'); setShowDash(!showDash); }}>
            <FontAwesomeIcon icon={faChalkboardTeacher} /> My Tutors
          </li>
        )}
        <div className="logout navitem">
          <p onClick={() => setShowLogoutOptions(!showLogoutOptions)}>
            <FontAwesomeIcon icon={faSignOut} /> Logout {showLogoutOptions ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
          </p>
          {showLogoutOptions && (
            <div className="logout-options">
              <button className="logout-yes" onClick={logout}>Yes</button>
              <button className="logout-cancel" onClick={() => setShowLogoutOptions(false)}>Cancel</button>
            </div>
          )}
        </div>
        <li className="navitem delete-account" onClick={() => { setContent("Delete"); setShowDash(!showDash); }}>
          <FontAwesomeIcon icon={faWarning} /> Delete Account
        </li>
      </ul>

      <div className="dash-content">
        {isEffectCompleted && content === 'Profile' && userData && <Profile userData={userData} creatorData={creatorData} setContent={setContent} />}
        {content === 'Creator' && <CreatorPanel setContent={setContent} />}
        {content === 'Tutors' && <MyTutors myTutors={myTutors} setContent={setContent} />}
        {content === 'Password' && <PasswordSettings userData={userData} setContent={setContent} />}
        {content === 'Delete' && <DeleteAccount />}
      </div>
      {showChats && <Messages setShowChats={setShowChats} userData={userData} />}
    </section>
  );
};
 
export default Dashboard;
