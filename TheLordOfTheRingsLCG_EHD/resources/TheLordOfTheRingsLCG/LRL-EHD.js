useLibrary('extension');
function getName(){return @LRL-EHD;}
function getDescription(){return @LRL-EHD-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-EHD.settings');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-EHD can't find TheLordOfTheRingsLCG");
	}
}
