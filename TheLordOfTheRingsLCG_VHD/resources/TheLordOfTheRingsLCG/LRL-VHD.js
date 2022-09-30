useLibrary('extension');
function getName(){return @LRL-VHD;}
function getDescription(){return @LRL-VHD-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-VHD.settings');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-VHD can't find TheLordOfTheRingsLCG");
	}
}
