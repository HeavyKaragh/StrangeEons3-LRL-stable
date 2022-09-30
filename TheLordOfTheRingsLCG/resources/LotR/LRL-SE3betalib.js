function updateIconSetting(icon,diy){
	switch(icon){
	case COLLECTION: item = 'Collection'; break;
	case ENCOUNTERSET: item = 'EncounterSet'; break;
	case ENCOUNTERSET1: item = 'EncounterSet1'; break;
	case ENCOUNTERSET2: item = 'EncounterSet2'; break;
	case ENCOUNTERSET3: item = 'EncounterSet3'; break;
	case ENCOUNTERSET4: item = 'EncounterSet4'; break;
	case ENCOUNTERSET5: item = 'EncounterSet5'; break;
	default: throw new Error ('INVALID ICON: '+PortraitListKey[icon]);
	}
	debug('onRead: '+item+': in: '+diy.settings.get(item,''));
	switch(String(diy.settings.get(item,''))){
	case 'CustomSet': case 'CustomCollection':  case 'UseCustom':
		diy.settings.set(item,'CustomIcon'); 
		break;
	case 'EmptySet': case 'EmptyCollection': 
		diy.settings.set(item,'EmptyIcon'); 
		break;
	case 'StrangeEonsSet': case 'StrangeEonsCollection': 
		diy.settings.set(item,'StrangeEonsIcon'); 
		break;
	case '': 
		diy.settings.set(item,'EmptyIcon'); 
		break;
	}
	debug('onRead: '+item+': out: '+$(item));
}
function replaceTags(text){
	text = String(text).replace(/<tr>/g,'<t>');
	text = String(text).replace(/<\/tr>/g,'</t>');
	return text;
}
function removeOldSettings(diy){if(String($LRL-dontDelete) != 'yes'){
	var resetList = diy.settings.getKeySet();
	resetList = String(resetList).replace(/\[/g,'');
	resetList = String(resetList).replace(/\]/g,'');
	resetList = String(resetList).replace(/, /g,',');
	resetList = String(resetList).split(',');
	resetList = resetList.sort();
	var protectList = new Array(
		'Template','Difficulty',
		'Name','NameBack','Collection','EncounterSet','EncounterSet1',
		'EncounterSet2','EncounterSet3','EncounterSet4','EncounterSet5',
		'Adventure','Artist','ArtistBack','Attack','Rules','RulesBack',
		'Body','BodyBack','Collection','CollectionInfo','Sphere',
		'CollectionNumber','Copyright','Condition','ConditionBack',
		'Cycle','Defense','EncounterSetNumber','EncounterSetTotal',
		'Engagement','Flavour','FlavourBack','GameName','HitPoints',
		'Keyword','KeywordBack','OptionLeft','OptionRight','Progress',
		'ResourceCost','Shadow','Stage','Story','StoryBack','Subtype',
		'Threat','ThreatCost','Trait','Type','Willpower','Unique','game',
		'UsedSets-EncounterSet1','UsedSets-EncounterSet2','UsedSets-EncounterSet3',
		'UsedSets-EncounterSet4','UsedSets-EncounterSet5'
	);
	for( let index = 0; index < resetList.length ; index++ ){
		if(protectList.indexOf(resetList[index]) == -1){
			diy.settings.reset(resetList[index]);
		}
	}
}}
function onReadBeta(diy,ois){
	removeOldSettings(diy);
/* Template */
	debug('template: in: '+diy.settings.get('Template',''));
	switch(String(diy.settings.get('Template',''))){
	case 'Easy': $Template='Gold'; break;
	case '':
		debug('template: empty');
		switch(String(Card)){
		case 'Ally': case 'Attachment': case 'Event': case 'Hero':
			debug('Sphere: '+$Sphere);
			switch(String(diy.settings.get('Sphere',''))){
			case 'Custom': $Template = 'CustomSphere'; break;
			case '': $Template = 'Neutral'; break;
			default: $Template = $Sphere;
			}
			$Template-tint = diy.settings.get('Sphere-tint',$Template-tint);
			break;
		case 'Enemy': case 'Location': case 'Treachery':
		case 'Objective': case 'ObjectiveAlly':
			debug('Difficulty: '+$Difficulty);
			switch(String(diy.settings.get('Difficulty',''))){
			case 'Easy': $Template = 'Gold'; break;
			case 'Custom': $Template = 'CustomDifficulty'; break;
			case '': $Template = 'Standard'; break;
			default : $Template = $Difficulty;
			}
			$Template-tint = diy.settings.get('Difficulty-tint',$Template-tint);
			break;
		case 'Campaign': case 'Preparation': case 'Presentation':
		case 'Quest': case 'Scenario':
		case 'Set': case 'Treasure': break;
			$Template = diy.settings.get('Template','Standard');
		}
	}
	debug('template: out: '+diy.settings.get('Template',''));
	if(diy.settings.get('Template-CustomDifficulty-tintable-tint','')!=''){
		$Template-tint=diy.settings.get('Template-CustomDifficulty-tintable-tint','');
	}
	if(diy.settings.get('Template-CustomSphere-tintable-tint','')!=''){
		$Template-tint=diy.settings.get('Template-CustomSphere-tintable-tint','');
	}
/* Adapter */
	switch(String(Card)){
	case 'Quest': case 'Scenario':
	case 'QuestSheet': case 'RulesCard':
		for(let index = 1; index < 6; index++){
			if(diy.settings.get('EncounterSet'+index,'')!=''){
				diy.settings.set('EncounterSet'+index+'Old',$('EncounterSet'+index));
				debug('onRead: EncounterSet'+index+'Old: '+$('EncounterSet'+index+'Old'));
			}
			if(diy.settings.get('UsedSets-EncounterSet'+index,'') != ''){
				debug('onRead: UsedSets-EncounterSet'+index+': '+diy.settings.get('UsedSets-EncounterSet'+index));
				diy.settings.set('EncounterSet'+index,$('UsedSets-EncounterSet'+index));
				diy.settings.reset('UsedSets-EncounterSet'+index);
			}
		}
		updateIconSetting(ENCOUNTERSET1,diy);
		updateIconSetting(ENCOUNTERSET2,diy);
		updateIconSetting(ENCOUNTERSET3,diy);
		updateIconSetting(ENCOUNTERSET4,diy);
		updateIconSetting(ENCOUNTERSET5,diy);
	}
/* Adventure */
/* Artist */ /* ArtistBack */
/* Attack */
	if($Attack == '-'){$Attack = 'minus';}
/* Body renamed to Rules */
/* Rules NEW */ /* RulesBack NEW */ /* RulesLeft NEW */ /* RulesRight NEW */
	$Rules = diy.settings.get('Rules','')+replaceTags(diy.settings.get('Body',''));
	$RulesBack = diy.settings.get('RulesBack','')+replaceTags(diy.settings.get('BodyBack',''));
	if(Card == 'Presentation'){$Rules = diy.settings.get('BodyBack','');}
/* Collection */
	updateIconSetting(COLLECTION,diy);
/* CollectionInfo */
	if( diy.settings.get('LRL-CollectionInfo','')!=''){
		$CollectionInfo = $LRL-CollectionInfo;
	}else{
		if( diy.settings.get('CollectionInfo','')==''){
			$CollectionInfo = '';
		}	
	}
/* CollectionNumber */
	if(diy.settings.get('CollectionNumber','')!=''){
		debug('CollectionNumber: in:'+$CollectionNumber);
		$CollectionNumberOld = $CollectionNumber;
		if( diy.settings.get('CollectionNumber',NaN) == NaN){
			$CollectionNumber = '0';
			println('Replace Collction Number: '+$CollectionNumberOld);
			$CollectionInfo = diy.settings.get('CollectionInfo','')+' '+$CollectionNumber;
			debug('CollectionNumber: output to CollectionInfo: '+$CollectionInfo);
		}
	}else{
		$CollectionNumber = '0';
	}
/* Copyright */
	if( diy.settings.get('LRL-Copyright','')!=''){
		$Copyright = $LRL-Copyright;
	}else{
		if( diy.settings.get('Copyright','')==''){
			$Copyright='\u00a9FFG \u00a9Middle-earth';
		} 
	}
/* Condition OLD */
	if(diy.settings.get('Condition','')!=''){
		$Rules = $Rules+'\n<vs>\n<b>'+replaceTags($Condition)+'<\b>';
	}
	diy.settings.reset('Condition');
/* ConditionBack OLD */
	if(diy.settings.get('ConditionBack','')!=''){
		$RulesBack = $RulesBack+'\n<vs>\n<b>'+replaceTags($ConditionBack)+'<\b>';
	}
	diy.settings.reset('ConditionBack');
/* Cycle */
/* Defense */
	if($Defense == '-'){$Defense = 'minus';}
/* EncounterSet */
	switch(String(Card)){
	case 'Campaign': case 'Enemy': case 'Location':
	case 'Objective': case 'ObjectiveAlly': case 'Quest':
	case 'Scenario': case 'Preparation': case 'Set':
	case 'Treachery': case 'Treasure':
		updateIconSetting(ENCOUNTERSET,diy);
	}
/* EncounterSetNumber */ /* EncounterSetTotal */
	switch(String(Card)){
	case 'Enemy': case 'Location': case 'Objective':
	case 'ObjectiveAlly': case 'Preparation': case 'Treachery':
		if(diy.settings.get('EncounterSetNumber','')!=''){
			debug('EncounterSetNumber: in:'+$EncounterSetNumber );
			$EncounterSetNumberOld = $EncounterSetNumber;
			let string = String($EncounterSetNumber).replace(/ /g,'');
			string = String(string).replace('\\','/');
			string = String(string).split('/');
			if(string.length == 2){
				$EncounterSetNumber = string[0];
				$EncounterSetTotal = string[1];
			}else{
				if((Number($EncounterSetNumber)*2) == NaN){
					$EncounterSetNumber = '0';
					println('Replace Encounter Set Number: '+$EncounterSetNumberOld);
				}else{
					$EncounterSetNumber = String(string[0]);
				}
				$EncounterSetTotal = '0';
			}
		}else{
			$EncounterSetNumber = '0';
			$EncounterSetTotal = diy.settings.get('EncounterSetTotal','0');
		}
		if($EncounterSetNumber == '-'){$EncounterSetNumber = 'minus';}
		if($EncounterSetTotal == '-'){$EncounterSetTotal = 'minus';}
	default: break;
	}
/* Engagement */
	if($Engagement == '-'){$Engagement = 'minus';}
/* Flavour */ /* FlavourBack */
	if(Card == 'Presentation'){$Flavour = diy.settings.get('FlavourBack','');}
/* FlavourLeft NEW */ /* FlavourRight NEW */
/* GameLogo NEW */
/* GameName */
	$GameName = diy.settings.get('GameName','');
/* HitPoints */
	if($HitPoints == '-'){$HitPoints = 'minus';}
/* Keyword OLD */
	if(diy.settings.get('Keyword','')!=''){
		$Rules = replaceTags($Keyword)+'\n<vs>\n'+$Rules;
		$KeywordOld = $Keyword;
		diy.settings.reset('Keyword');
	}
/* KeywordBack OLD */
	if(diy.settings.get('KeywordBack','')!=''){
		$RulesBack = replaceTags($KeywordBack)+'\n<vs>\n'+$RulesBack;
	}
	diy.settings.reset('KeywordBack');
/* Name */ /* NameBack */
	$Unique = false;
	if(diy.settings.getBoolean('Name-Unique',false)){ $Unique = true; }
	if($Name != String($Name).replace('<uni>','')){ $Unique = true;
		$NameOld = $Name;
		$Name = String($Name).replace('<uni> ','');
		$Name = String($Name).replace('<uni>','');
	}
/* OptionLeft */ /* OptionRight */
/* Page NEW */
/* Portrait */ /* PortraitBack */
	if(Card == 'Quest'){
		diy.settings.set('PortraitShare',false);
		diy.settings.set('PortraitTint',diy.settings.get('Portrait-toggle',true));
		diy.settings.reset('Portrait-toggle');
	}
/* Progress */
	if($Progress == '-'){$Progress = 'minus';}
/* ResourceCost */
/* Shadow */
/* Stage */
/* Story */ /* StoryBack */
/* StoryLeft NEW */ /* StoryRight NEW */
	if(Card == 'Presentation'){$Story = diy.settings.get('StoryBack','');}
/* Subtype */
	switch(String(Card)){
	case 'Attachment': case 'Objective':
	case 'Treachery': case 'ObjectiveAlly':
		if(diy.settings.get('SubType','') != ''){
			$SubtypeOld = diy.settings.get('SubType','');
		}
		$Subtype=diy.settings.get('SubType','');
		diy.settings.reset('SubType');
		if( (diy.settings.get('Subtype','') == '' )
			|| ($Subtype == #($Template) )
		){ $Subtype = '';}
	}
/* Threat */
	if($Threat == '-'){$Threat = 'minus';}
/* ThreatCost */
	if($ThreatCost == '-'){$ThreatCost = 'minus';}
/* Trait */
	$Trait = diy.settings.get('Trait','');
/* Type */
	if(Card != 'Quest'){
		if( (diy.settings.get('Type','') == '' )
			|| ($Type == #(Card) )
		){ $Type = '';}
	}
//	$Type=''
/* Willpower */
	if($Willpower == '-'){$Willpower = 'minus';}

	var portrait;
	try{portrait = ois.readObject();}catch(err){portrait = null;}
	while(portrait != null){
		debug('onRead: old portrait: '+portrait.getBaseKey());
		baseKey = String(portrait.getBaseKey());
		switch(String(baseKey)){
		case 'Portrait': case 'PortraitBack':
		case 'Collection': case 'CustomSphere': case 'EncounterSet':
		case 'EncounterSet1': case 'EncounterSet2':
		case 'EncounterSet3': case 'EncounterSet4': case 'EncounterSet5':
			key = baseKey;
			break;
		case 'Pack-Portrait': case 'Pack-Collection':
			key = baseKey.replace('Pack-','');
			break;
		case 'UsedSets-EncounterSet1': case 'UsedSets-EncounterSet2':
		case 'UsedSets-EncounterSet3': case 'UsedSets-EncounterSet4':
		case 'UsedSets-EncounterSet5':
			key = baseKey.replace('UsedSets-','');
			debug('onRead: '+baseKey+': '+$(baseKey));
			break;
		case Card+'-Portrait': case Card+'-PortraitBack':
		case Card+'-Collection': case Card+'-EncounterSet': case Card+'-CustomSphere':
		case Card+'-EncounterSet1': case Card+'-EncounterSet2':
		case Card+'-EncounterSet3': case Card+'-EncounterSet4':
		case Card+'-EncounterSet5':
			key = baseKey.replace(Card+'-','');
			break;
		case Card+'-UsedSets-EncounterSet1': case Card+'-UsedSets-EncounterSet2':
		case Card+'-UsedSets-EncounterSet3': case Card+'-UsedSets-EncounterSet4':
		case Card+'-UsedSets-EncounterSet5':
			key = baseKey.replace(Card+'-UsedSets-','');
			break;
		case 'Sphere':
			key = 'CustomSphere';
			break;
		case Card+'-Template-CustomSphere':
			key = baseKey.replace(Card+'-Template-','');
			break;
		default:
			throw new Error('onRead: portrait load failed: '+portrait.getBaseKey());
		}
		debug('updatePortraitBaseKey: '+Card+'-'+key);
		if((diy.version < 3)&&((key == 'Portrait')||(key == 'PortraitBack'))){
			portrait.setPanX(portrait.getPanX()-14);
			portrait.setPanY(portrait.getPanY()+14);
			portrait.setScale(portrait.getScale()+0.05);
		}
		PortraitList[PortraitListKey.indexOf(key)] = DefaultPortrait(
			Card+'-'+key,
			portrait
		);
		try{portrait = ois.readObject();}catch(err){portrait = null;}
	}
	for(let i = 0;i<PortraitListKey.length;i++){
		key = PortraitListKey[i];
		if(PortraitList[i]==null){
			debug('onRead: old card: create portrait: '+key);
			debug('onRead: old card: portrait '+diy.settings.get(Card+'-'+key+'-portrait-template',''));
			debug('onRead: old card: region: '+diy.settings.get(Card+'-'+key+'-portrait-clip-region',''));
			switch(key){
			case 'Portrait':
			case 'PortraitBack':
				PortraitList[i] = new DefaultPortrait(diy,Card+'-'+key,true);
				PortraitList[i].backgroundFilled = true;
				PortraitList[i].clipping = true;
				break;
			case 'PortraitV': case 'PortraitPromo':
				PortraitList[i] = new DefaultPortrait(PortraitList[PORTRAIT],Card+'-'+key);
				PortraitList[i].backgroundFilled = true;
				break;
			default:
				PortraitList[i] = new DefaultPortrait(diy,Card+'-'+key,false);
				PortraitList[i].backgroundFilled = false;
				PortraitList[i].clipping = true;
			}
			if(diy.settings.get(Card+'-'+key+'-portrait-template','')==''){
				diy.settings.set(
					Card+'-'+key+'-portrait-template',
					'TheLordOfTheRingsLCG/image/empty1x1.png'
				);
			}
			if(diy.settings.get(Card+'-'+key+'-portrait-rotation','')==''){
				diy.settings.set(
					Card+'-'+key+'-portrait-rotation',
					0
				);
			}
			PortraitList[i].installDefault();
		}
	}
	for(let i = 0;i<PortraitList.length;i++){
		debug('onRead: old card: PortraitList: '+i+': '+PortraitList[i].getBaseKey());
	}
}
