useLibrary('extension');
function getName(){return @LRL-PHD;}
function getDescription(){return @LRL-PHD-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-PHD.settings');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-PHD can't find TheLordOfTheRingsLCG");
	}
}
