import { Link } from "react-router-dom";

const Header = () => (
	<header className="flex justify-between items-center p-4 bg-gray-800 text-white">
	  <div className="text-xl">QRApp</div>
	  
      <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-blue-400 hover:underline">Generate QR</Link></li>
            <li><Link to="/scanner" className="text-blue-400 hover:underline">Scan QR</Link></li>
          </ul>
        </nav>
	</header>
);
  
export default Header;