const SE2CARD = true;
if($Type == 'objectivetype_attachment'){
	$ObjectiveType = 'Objective';
}else{
	$ObjectiveType = 'ObjectiveAlly';
}
debug('objectiveType: '+$ObjectiveType);
if($ObjectiveType == 'Objective'){
	useLibrary('res://TheLordOfTheRingsLCG/diy/Objective.js');
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/ObjectiveAlly.js');
}
if( sourcefile == 'Quickscript' ){testDIYScript();}
