/* COMPONENT CONFIGURATION */
const Card = 'Occurrence';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet'
);
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'Occurrence-front';
	diy.backTemplateKey = 'Occurrence-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('Standard','Complex','Dual');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(
		combo,
		null
	);
	combo = new Array('Standard','Red','Green','Blue','CustomDifficulty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Difficulty_list = new comboBox(
		combo,
		null
	);
	Difficulty_hsb = new HSBPanel();
	combo = new Array('Red','Green','Blue','Yellow','Brown','Purple','White','Black','CustomRegion','Empty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
//		println(item)
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Region_list = new comboBox(
		combo,
		null
	);
	Region_hsb = new HSBPanel();
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);

	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,6,50,true);
	Success_text = new textArea($Success,4,50,true);
	Failure_text = new textArea($Failure,4,50,true);
	Choice1_text = new textArea($Choice1,4,50,true);
	Choice2_text = new textArea($Choice2,4,50,true);
	EncounterSetNumber_list = new spinner(0,99,1,0,null);
	EncounterSetTotal_list = new spinner(0,99,1,0,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner( 0 , 999 , 1 , 0 , null ) ;
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'',Rules_text,'newline,growx',
		@LRL-Success,'newline,center,split',Success_text,'newline,growx',
		@LRL-Failure,'newline,center,split',Failure_text,'newline,growx',
		@LRL-Choice1,'newline,center,split',Choice1_text,'newline,growx',
		@LRL-Choice2,'newline,center,split',Choice2_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx',
		separator(),'newline,growx',
		@LRL-Difficulty,'newline,split',
		Difficulty_list,'growx',
		Difficulty_hsb,'newline',
		separator(),'newline,growx',
		@LRL-Region,'newline,split',
		Region_list,'growx',
		Region_hsb,'newline',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid(); 
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid(); 
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
//		separator(),'newline,growx',
//		@LRL-EncounterSetNumber,'newline,split',
//		EncounterSetNumber_list,'split',
//		@LRL-of,'split',
//		EncounterSetTotal_list,'split',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo , 'newline,split' ,
		CollectionInfo_text , 'growx,split' ,
		@LRL-CollectionNumber , 'split' ,
		CollectionNumber_text , '' ,
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
//	bindings.add('EncounterSetNumber',EncounterSetNumber_list,[0]);
//	bindings.add('EncounterSetTotal',EncounterSetTotal_list,[0]);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Success',Success_text,[0]);
	bindings.add('Failure',Failure_text,[0]);
	bindings.add('Choice1',Choice1_text,[0]);
	bindings.add('Choice2',Choice2_text,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Difficulty',Difficulty_list,[0]);
	bindings.add('Difficulty-tint',Difficulty_hsb,[0]);
	bindings.add('Region',Region_list,[1]);
	bindings.add('Region-tint',Region_hsb,[1]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]) ;
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* TEMPLATE */
	Difficulty_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('tintable-difficultyDeco')
	);
	
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	CollectionNumber_box = markupBox( sheet ) ;
	CollectionNumber_box.defaultStyle = diy.settings.getTextStyle( checkKey( 'CollectionNumber-style' ) , null ) ;
	CollectionNumber_box.alignment = diy.settings.getTextAlignment( checkKey( 'CollectionNumber-alignment' ) ) ;
	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body-alignment'));
	Body_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Body_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Body_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
	
	Story_box = markupBox(sheet);
	Story_box.defaultStyle = diy.settings.getTextStyle(checkKey('Story-style'),null);
	Story_box.alignment = diy.settings.getTextAlignment(checkKey('Story-alignment'));
	Story_box.setLineTightness($Story-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Story_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Story_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
	
	Success_box = markupBox(sheet);
	Success_box.defaultStyle = diy.settings.getTextStyle(checkKey('Success-style'),null);
	Success_box.alignment = diy.settings.getTextAlignment(checkKey('Success-alignment'));
	Success_box.setLineTightness($Success-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Success_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Success_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}

	Failure_box = markupBox(sheet);
	Failure_box.defaultStyle = diy.settings.getTextStyle(checkKey('Failure-style'),null);
	Failure_box.alignment = diy.settings.getTextAlignment(checkKey('Failure-alignment'));
	Failure_box.setLineTightness($Failure-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Failure_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Failure_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}

	Choice1_box = markupBox(sheet);
	Choice1_box.defaultStyle = diy.settings.getTextStyle(checkKey('Choice1-style'),null);
	Choice1_box.alignment = diy.settings.getTextAlignment(checkKey('Choice1-alignment'));
	Choice1_box.setLineTightness($Choice1-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Choice1_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Choice1_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}

	Choice2_box = markupBox(sheet);
	Choice2_box.defaultStyle = diy.settings.getTextStyle(checkKey('Choice2-style'),null);
	Choice2_box.alignment = diy.settings.getTextAlignment(checkKey('Choice2-alignment'));
	Choice2_box.setLineTightness($Choice2-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Choice2_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Choice2_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function createBackPainter( diy, sheet ){
/* TEMPLATE */
	Region_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Occurrence-back-tintable')
	);
}
function paintFront( g, diy, sheet ){
	var hsb;
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	switch(String($Template)){
	case 'Complex':
		sheet.paintImage(g,'Occurrence-front-complex','Occurrence-front-complex-region');
		break;
	case 'Dual':
		sheet.paintImage(g,'Occurrence-front-dual','Occurrence-front-dual-region');
	}

/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	if( $EncounterSet != 'EmptyIcon' ){
		switch(String($Difficulty)){
		case 'Red':
		case 'Green':
		case 'Blue':
		case 'Yellow':
		case 'Purple':
		case 'Brown':
		case 'White':
		case 'Black':
			hsb = diy.settings.getTint($Difficulty+'-tint');
			Difficulty_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,Difficulty_tinter.getTintedImage(),'Occurrence-difficultyDeco-region');
			break;
		case 'CustomDifficulty':
			hsb = diy.settings.getTint('Difficulty-tint');
			Difficulty_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,Difficulty_tinter.getTintedImage(),'Occurrence-difficultyDeco-region');
			break;
		default:
			sheet.paintImage(g,'EncounterDeco','Occurrence-difficultyDeco-region');
		}
		paintIcon(ENCOUNTERSET,g,sheet);
	}
/* TEXT */
	if( $EncounterSet != 'EmptyIcon' ){
		drawName(g,diy);
	}else{
		if( diy.settings.getBoolean( 'Unique' , false ) == true ){
			Name_box.markupText = '<lrs>u</lrs><size 50%> <size 200%>' + $Name ;
		}else{
			Name_box.markupText = $Name ;
		}
		Name_box.drawAsSingleLine( g , diy.settings.getRegion( 'Occurrence-Name-full-region' ) ) ;
	}
	drawText('Story',Story_box,g,diy);
	drawBody(new Array('Rules'),g,diy);
	switch(String($Template)){
	case 'Complex':
		drawText('Success',Success_box,g,diy);
		drawText('Failure',Failure_box,g,diy);
		break;
	case 'Dual':
		Choice1_box.markupText = "<center><cho><br><left>"+$Choice1;
		updateNameTags(Choice1_box,diy);
		Choice1_box.draw(g,diy.settings.getRegion('Occurrence-Choice1-region'));
		Choice2_box.markupText = "<center><cho><br><left>"+$Choice2;
		updateNameTags(Choice2_box,diy);
		Choice2_box.draw(g,diy.settings.getRegion('Occurrence-Choice2-region'));
	}
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber( g , diy ) ;
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	var hsb;
	switch(String($Region)){
	case 'Red':
	case 'Green':
	case 'Blue':
	case 'Yellow':
	case 'Brown':
	case 'Black':
	case 'White':
	case 'Purple':
		hsb = diy.settings.getTint($Region+'-tint');
		Region_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,Region_tinter.getTintedImage(),'Occurrence-Region-region');
		break;
	case 'CustomRegion':
		hsb = diy.settings.getTint('Region-tint');
		Region_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,Region_tinter.getTintedImage(),'Occurrence-Region-region');
		break;
	}
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-A.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-AHD.settings');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	LRL = Eons.namedObjects.LRL;
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}
