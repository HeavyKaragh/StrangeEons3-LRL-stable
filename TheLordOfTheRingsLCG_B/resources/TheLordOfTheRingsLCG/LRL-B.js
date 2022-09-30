useLibrary('extension');
function getName(){return @LRL-B;}
function getDescription(){return @LRL-B-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-B can't find TheLordOfTheRingsLCG");
	}
}
