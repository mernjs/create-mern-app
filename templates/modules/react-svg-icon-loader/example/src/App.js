
import React from 'react';
import Icon from 'react-svg-icons-loader';

const iconsArr = ["Abacusstrokerounded","Absolutestrokerounded","Accelerationstrokerounded","Accessstrokerounded","Accidentstrokerounded","Accountsetting01strokerounded","Accountsetting02strokerounded","Accountsetting03strokerounded","Acutestrokerounded","Add01strokerounded","Add02strokerounded","Addcirclehalfdotstrokerounded","Addcirclestrokerounded","Addressbookstrokerounded","Addsquarestrokerounded","Addteamstrokerounded","Adobeaftereffectstrokerounded","Adobeillustratorstrokerounded","Adobeindesignstrokerounded","Adobephotoshopstrokerounded","Adobepremierstrokerounded","Adobexdstrokerounded","Adventurestrokerounded","Advertisimentstrokerounded","Adzanstrokerounded","Affiliatestrokerounded","Agreement01strokerounded","Agreement02strokerounded","Agreement03strokerounded","Aibookstrokerounded","Aibrain01strokerounded","Aibrain02strokerounded","Aibrain03strokerounded","Aibrain04strokerounded","Aibrain05strokerounded","Aichat01strokerounded","Aichat02strokerounded","Aicloud01strokerounded","Aicloud02strokerounded","Aicomputerstrokerounded","Aidnastrokerounded","Aidsstrokerounded","Aifolder01strokerounded","Aifolder02strokerounded","Aiinnovation01strokerounded","Aiinnovation02strokerounded","Aiinnovation03strokerounded","Ailaptopstrokerounded","Ailearningstrokerounded","Ailockstrokerounded","Aimailstrokerounded","Ainetworkstrokerounded","Aiphone01strokerounded","Aiphone02strokerounded","Airbnbstrokerounded","Aircraftgamestrokerounded","Airdropstrokerounded","Airplane01strokerounded","Airplane02strokerounded","Airplanelanding01strokerounded","Airplanelanding02strokerounded","Airplanemodeoffstrokerounded","Airplanemodestrokerounded","Airplanetakeoff01strokerounded","Airplanetakeoff02strokerounded","Airplaylinestrokerounded","Airpod01strokerounded","Airpod02strokerounded","Airpod03strokerounded","Aisearchstrokerounded","Aisecurity01strokerounded","Aisecurity02strokerounded","Aismartwatchstrokerounded","Aiviewstrokerounded","Alaqsamosquestrokerounded","Alarmclockstrokerounded","Album01strokerounded","Album02strokerounded","Albumnotfound01strokerounded","Albumnotfound02strokerounded","Alert01strokerounded","Alert02strokerounded","Alertcirclestrokerounded","Alertdiamondstrokerounded","Alertsquarestrokerounded","Algorithmstrokerounded","Alien01strokerounded","Alien02strokerounded","Alignbottomstrokerounded","Alignboxbottomcenterstrokerounded","Alignboxbottomleftstrokerounded","Alignboxbottomrightstrokerounded","Alignboxmiddlecenterstrokerounded","Alignboxmiddleleftstrokerounded","Alignboxmiddlerightstrokerounded","Alignboxtopcenterstrokerounded","Alignboxtopleftstrokerounded","Alignboxtoprightstrokerounded","Bracketcirclestrokerounded","Bracketsquarestrokerounded","Bracketstrokerounded","Businessman","Dmovestrokerounded","Drotatestrokerounded","Dscalestrokerounded","Dviewstrokerounded","Hierarchical","Scheme","Schemesvgrepo","Strokerounded"]

const App = () => {
	return <div className="App">
		{iconsArr.map((iconName) => (
			<span style={{padding: '40px', marginTop: '40px'}}>
				<Icon key={iconName} name={iconName} size={32} />
			</span>
		))}
	</div>
};

export default App;
