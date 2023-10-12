useLibrary('extension');
function getName(){return @LRL-V;}
function getDescription(){return @LRL-V-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-V.settings');
		var list = new Array(
			'Campaign','Preparation','Quest','Occurrence'
		);
		for(let index = 0; index < list.length; index++){
			Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+list[index]+'.settings');
		}
		ClassMap.add('TheLordOfTheRingsLCG/LRL-V.classmap');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-V can't find TheLordOfTheRingsLCG");
	}
}
