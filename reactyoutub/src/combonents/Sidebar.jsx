function Sidebar() {
    return (
      <aside className="w-64 bg-white h-screen shadow-md fixed lg:block hidden">
        <ul className="menu p-4 overflow-y-auto text-base-content">
          <li className="menu-title">Main</li>
          <li><a className="hover:bg-gray-100"><span>🏠</span> Home</a></li>
          <li><a className="hover:bg-gray-100"><span>🔥</span> Trending</a></li>
          <li><a className="hover:bg-gray-100"><span>📺</span> Subscriptions</a></li>
          <li className="menu-title">Library</li>
          <li><a className="hover:bg-gray-100"><span>🕑</span> History</a></li>
          <li><a className="hover:bg-gray-100"><span>⏰</span> Watch Later</a></li>
        </ul>
      </aside>
    );
  }

  export default Sidebar;
