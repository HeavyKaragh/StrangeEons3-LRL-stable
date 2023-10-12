useLibrary('extension');
function getName(){return @LRL-I;}
function getDescription(){return @LRL-I-description;}
function getVersion(){return 1.9;}
function initialize(){
	if(Game.get('LRL') != null){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	}else{
		Eons.log.warning(
			"TheLordOfTheRingsLCG-I can't find TheLordOfTheRingsLCG"
		);
	}
}
