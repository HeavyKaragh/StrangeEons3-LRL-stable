/* COMPONENT CONFIGURATION */
const Card = 'Scenario';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet',
	'EncounterSet1','EncounterSet2',
	'EncounterSet3','EncounterSet4','EncounterSet5'
);
const CARDVERSION = 2;
//2: a\u00f1adido drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'Scenario-front';
	diy.backTemplateKey = 'Scenario-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('Standard','Gold','CustomDifficulty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(
		combo,
		null
	);
	Template_hsb = new HSBPanel();
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);

	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
	EncounterSet1_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet1_portrait = new portraitPanel(diy,ENCOUNTERSET1,@LRL-EncounterSet+' 1: '+@LRL-custom);
	EncounterSet2_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet2_portrait = new portraitPanel(diy,ENCOUNTERSET2,@LRL-EncounterSet+' 2: '+@LRL-custom);
	EncounterSet3_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet3_portrait = new portraitPanel(diy,ENCOUNTERSET3,@LRL-EncounterSet+' 3: '+@LRL-custom);
	EncounterSet4_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet4_portrait = new portraitPanel(diy,ENCOUNTERSET4,@LRL-EncounterSet+' 4: '+@LRL-custom);
	EncounterSet5_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet5_portrait = new portraitPanel(diy,ENCOUNTERSET5,@LRL-EncounterSet+' 5: '+@LRL-custom);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Cycle_text = new textField($Cycle,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionLeft_text = new textField($OptionLeft,12,null);
	OptionRight_text = new textField($OptionRight,12,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner( 0 , 999 , 1 , 0 , null ) ;
	StoryBack_text = new textArea($StoryBack,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	FlavourBack_text = new textArea($FlavourBack,6,50,true);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Cycle,'newline,split',Cycle_text,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx',
		OptionLeft_text,'newline,split,growx',
		@LRL-options,'split',
		new tipButton(@LRL-option-tip),'split',
		OptionRight_text,'split,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'',RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourBack_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesBackTab.addToEditor(editor,@LRL-Rules+': '+@LRL-back);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline',
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
		separator(),'newline,growx',
		@LRL-EncounterSet1,'newline,split',EncounterSet1_list,'growx',
		EncounterSet1_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet2,'newline,split',EncounterSet2_list,'growx',
		EncounterSet2_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet3,'newline,split',EncounterSet3_list,'growx',
		EncounterSet3_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet4,'newline,split',EncounterSet4_list,'growx',
		EncounterSet4_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet5,'newline,split',EncounterSet5_list,'growx',
		EncounterSet5_portrait,'newline,growx',
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
	bindings.add('EncounterSet1',EncounterSet1_list,[0]);
	bindings.add('EncounterSet2',EncounterSet2_list,[0]);
	bindings.add('EncounterSet3',EncounterSet3_list,[0]);
	bindings.add('EncounterSet4',EncounterSet4_list,[0]);
	bindings.add('EncounterSet5',EncounterSet5_list,[0]);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Cycle',Cycle_text,[0]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('OptionLeft',OptionLeft_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Template-tint',Template_hsb,[0,1]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add( 'CollectionNumber' , CollectionNumber_text , [ 0 ] ) ;
	bindings.add('StoryBack',StoryBack_text,[1]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('FlavourBack',FlavourBack_text,[1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* TEMPLATE */
	DifficultyDecoFront_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-front-tintable')
	);
	DifficultyDecoAdapter1_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-adapter1-tintable')
	);
	DifficultyDecoAdapter2_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-adapter2-tintable')
	);
	DifficultyDecoAdapter3_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-adapter3-tintable')
	);
	DifficultyDecoAdapter4_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-adapter4-tintable')
	);
	DifficultyDecoAdapter5_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-adapter5-tintable')
	);
	
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Cycle_box = markupBox(sheet);
	Cycle_box.defaultStyle = diy.settings.getTextStyle(checkKey('Cycle-style'),null);
	Cycle_box.alignment = diy.settings.getTextAlignment(checkKey('Cycle-alignment'));
	OptionLeft_box = markupBox(sheet);
	OptionLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionLeft-style'),null);
	OptionLeft_box.alignment = diy.settings.getTextAlignment(checkKey('OptionLeft-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
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
}
function createBackPainter( diy, sheet ){
/* TEMPLATE */
	DifficultyDecoBack_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('Scenario-back-tintable')
	);
	BodyBack_box = markupBox(sheet);
	BodyBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyBack_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyBack_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		BodyBack_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		BodyBack_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	var hsb;
	switch(String($Template)){
	case 'Gold':
		hsb = diy.settings.getTint($Template);
		break;
	case 'CustomDifficulty':
		hsb = diy.settings.getTint('Template');
		break;
	}
	switch(String($Template)){
	case 'Gold':
	case 'CustomDifficulty':
		DifficultyDecoFront_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDecoFront_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
	}
	var adapterList = new Array(
		'EncounterSet1','EncounterSet2',
		'EncounterSet3','EncounterSet4','EncounterSet5' );
	var adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='EmptyIcon'){adapterSelector=index+1;}
	}
	sheet.paintImage(g,'Scenario-adapter'+adapterSelector,'Scenario-adapter-region');
	switch(String($Template)){
	case 'Gold':
	case 'CustomDifficulty':
		switch(adapterSelector){
		case 1:
			DifficultyDecoAdapter1_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,DifficultyDecoAdapter1_tinter.getTintedImage(),'Scenario-adapter-region');
			break ;
		case 2:
			DifficultyDecoAdapter2_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,DifficultyDecoAdapter2_tinter.getTintedImage(),'Scenario-adapter-region');
			break ;
		case 3:
			DifficultyDecoAdapter3_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,DifficultyDecoAdapter3_tinter.getTintedImage(),'Scenario-adapter-region');
			break ;
		case 4:
			DifficultyDecoAdapter4_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,DifficultyDecoAdapter4_tinter.getTintedImage(),'Scenario-adapter-region');
			break ;
		case 5:
			DifficultyDecoAdapter5_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,DifficultyDecoAdapter5_tinter.getTintedImage(),'Scenario-adapter-region');
			break ;
		}
	}

/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
	paintIcon(ENCOUNTERSET1,g,sheet);
	paintIcon(ENCOUNTERSET2,g,sheet);
	paintIcon(ENCOUNTERSET3,g,sheet);
	paintIcon(ENCOUNTERSET4,g,sheet);
	paintIcon(ENCOUNTERSET5,g,sheet);
/* TEXT */
	drawName(g,diy);
	drawCycle(g,diy);
	drawBody(new Array('Story','Rules','Flavour'),g,diy);
	drawOptionLeft(g,diy,sheet);
	drawOptionRight(g,diy,sheet);
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
	switch(String($Template)){
	case 'Gold':
		hsb = diy.settings.getTint($Template);
		DifficultyDecoBack_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDecoBack_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		hsb = diy.settings.getTint('Template');
		DifficultyDecoBack_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDecoBack_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	}
/* TEXT */
	drawBodyBack(new Array('StoryBack','RulesBack','FlavourBack'),g,diy);
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
