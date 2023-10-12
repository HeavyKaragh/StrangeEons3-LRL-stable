useLibrary('extension');
function getName(){return @LRL-P;}
function getDescription(){return @LRL-P-description;}
function getVersion(){return 1.9;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-P.settings');
		var list = new Array(
			'Ally','Attachment','Event','SideQuestPlayer',
			'Hero','Contract','Treasure',
			'Haven','Gift'
		);
		for(let index = 0; index < list.length; index++){
			Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+list[index]+'.settings');
		}
		ClassMap.add('TheLordOfTheRingsLCG/LRL-P.classmap');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-P can't find TheLordOfTheRingsLCG");
	}
}
