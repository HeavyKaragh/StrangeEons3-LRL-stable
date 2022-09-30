useLibrary('extension');
function getName(){return @LRL-E;}
function getDescription(){return @LRL-E-description;}
function getVersion(){return 1.9;}
function initialize(){
	if( Game.get('LRL') != null ){
		Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/LRL-E.settings');
		var list = new Array(
			'Enemy','Location','Objective',
			'ObjectiveAlly','Presence','SideQuestEncounter',
			'Treachery'
		);
		for(let index = 0; index < list.length; index++){
			Game.get('LRL').masterSettings.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+list[index]+'.settings');
		}
		ClassMap.add('TheLordOfTheRingsLCG/LRL-E.classmap');
	}else{
		Eons.log.warning("TheLordOfTheRingsLCG-E can't find TheLordOfTheRingsLCG");
	}
}
