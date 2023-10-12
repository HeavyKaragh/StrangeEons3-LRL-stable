/* COMPONENT CONFIGURATION */
const Card = 'Quest';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet',
	'PortraitBack','EncounterSet1','EncounterSet2',
	'EncounterSet3','EncounterSet4','EncounterSet5' );
const CARDVERSION = 2;
//2: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'Quest-front';
	diy.backTemplateKey = 'Quest-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait+': '+@LRL-front);
	PortraitTint_button = new toggleButton(@LRL-tint,'',diy.settings.getBoolean('PortraitTint',true),null);
	PortraitBack_panel = new portraitPanel(diy,PORTRAITBACK,@LRL-Portrait+': '+@LRL-back);
	PortraitBackMirror_button = new repeaterButton(@LRL-mirror,'',
		function(){
			PortraitList[PORTRAITBACK].setImage(
				PortraitList[PORTRAITBACK].getSource(),
				ImageUtils.mirror(PortraitList[PORTRAITBACK].getImage(),true,false)
			);
			PortraitBack_panel.updatePanel();
		}
	);
	PortraitShare_button = new toggleButton(@LRL-share,'',diy.settings.getBoolean('PortraitShare',true),null);
/* TEMPLATE */
	var combo = new Array('Standard','Gold','Nightmare','CustomDifficulty');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
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
/* STATS */
	Stage_list = new spinner(0,9,1,1,null);
	Progress_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Adventure_text = new textField($Adventure,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Condition_text = new textArea($Condition,2,50,true);
	OptionRight_text = new textField($OptionRight,12,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	NameBack_text = new textField($NameBack,12,null);
	StoryBack_text = new textArea($StoryBack,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	ConditionBack_text = new textArea($ConditionBack,2,50,true);
	ArtistBack_text = new textField($ArtistBack,12,null);
	NameShare_button = new toggleButton(@LRL-share,'',diy.settings.getBoolean('NameShare',true),null);
	CollectionNumberHide_button = new toggleButton(@LRL-hide,'',diy.settings.getBoolean('CollectionNumberHide',false),null);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Adventure,'newline,split',
		Adventure_text,'growx',
		separator(),'newline,growx',
		@LRL-Stage,'newline,split',
		Stage_list,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',
		Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Condition,'newline,center',
		Condition_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		NameBack_text,'growx',
		NameShare_button,'split',
		separator(),'newline,growx',
		LRL.ProgressIcon,'newline,split',
		Progress_list,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',
		StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Condition,'newline,center',
		ConditionBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-OptionRight,'newline,split',
		new tipButton(@LRL-option-tip),'split',
		OptionRight_text,'split,growx',
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
		@LRL-Artist,'newline,split',
		Artist_text,'growx',
		PortraitMirrorButton(),'split',
		PortraitTint_button,'split',
		separator(),'newline,growx',
		PortraitBack_panel,'newline,growx',
		@LRL-Artist,'newline,split',
		ArtistBack_text,'growx',
		PortraitBackMirror_button,'split',
		PortraitShare_button,'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid(); 
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',
		EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet1,'newline,split',
		EncounterSet1_list,'growx',
		EncounterSet1_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet2,'newline,split',
		EncounterSet2_list,'growx',
		EncounterSet2_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet3,'newline,split',
		EncounterSet3_list,'growx',
		EncounterSet3_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet4,'newline,split',
		EncounterSet4_list,'growx',
		EncounterSet4_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet5,'newline,split',
		EncounterSet5_list,'growx',
		EncounterSet5_portrait,'newline,growx',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',
		Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo,'newline,split',
		CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',
		CollectionNumber_text,'split',
		CollectionNumberHide_button,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',
		Copyright_text,'growx',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Stage',Stage_list,[0,1]);
	bindings.add('Progress',Progress_list,[1]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Template-tint',Template_hsb,[0,1]);
	bindings.add('Name',diy.nameField,[0,1]);
	bindings.add('NameBack',NameBack_text,[1]);
	bindings.add('NameShare',NameShare_button,[1]);
	bindings.add('ArtistBack',ArtistBack_text,[1]);
	bindings.add('Adventure',Adventure_text,[0,1]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Condition',Condition_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0,1]);
	bindings.add('EncounterSet1',EncounterSet1_list,[0]);
	bindings.add('EncounterSet2',EncounterSet2_list,[0]);
	bindings.add('EncounterSet3',EncounterSet3_list,[0]);
	bindings.add('EncounterSet4',EncounterSet4_list,[0]);
	bindings.add('EncounterSet5',EncounterSet5_list,[0]);
	bindings.add('PortraitShare',PortraitShare_button,[1]);
	bindings.add('PortraitTint',PortraitTint_button,[0]);
	bindings.add('StoryBack',StoryBack_text,[1]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('ConditionBack',ConditionBack_text,[1]);
	bindings.add('OptionRight',OptionRight_text,[1]);
	bindings.add('Artist',Artist_text,[0,1]);
	bindings.add('Copyright',Copyright_text,[0,1]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0,1]);
	bindings.add('Collection',Collection_list,[0,1]);
	bindings.add('CollectionNumberHide',CollectionNumberHide_button,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0,1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* TEMPLATE */
	DifficultyDeco_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('tintable-difficultyDeco')
	);
/* STATS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Stage_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('Stage-tint');
	Stage_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Adventure_box = markupBox(sheet);
	Adventure_box.defaultStyle = diy.settings.getTextStyle(checkKey('Adventure-style'),null);
	Adventure_box.alignment = diy.settings.getTextAlignment(checkKey('Adventure-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	CollectionNumber_box = markupBox(sheet);
	CollectionNumber_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionNumber-style'),null);
	CollectionNumber_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionNumber-alignment'));
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
	AdapterImage = null;
}
function createBackPainter( diy, sheet ){
/* TEMPLATE */
	Progress_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('Progress');
	Progress_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	NameBack_box = markupBox(sheet);
	NameBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	NameBack_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	ArtistBack_box = markupBox(sheet);
	ArtistBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	ArtistBack_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
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
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/image/sepia.png'),
			'Quest-Portrait-portrait-clip-region'
		);
	}else{
		if( diy.settings.getBoolean('PortraitTint',false) === true ){
			var imageTinted = PortraitList[PORTRAIT].getImage();
			var imagePanX = PortraitList[PORTRAIT].getPanX();
			var imagePanY = PortraitList[PORTRAIT].getPanY();
			var imageRotation = PortraitList[PORTRAIT].getRotation();
			var imageScale = PortraitList[PORTRAIT].getScale();
			if($Template == 'Nightmare'){
				imageTinted = createRedishImage(imageTinted);
			}else{
				imageTinted = createSepiaImage(imageTinted);
			}
			var Region = String($Quest-Portrait-portrait-clip-region).split(',');
			var AT = java.awt.geom.AffineTransform;	
			var transform =	AT.getTranslateInstance(
				Number(Region[0])+(Number(Region[2])/2)+imagePanX-((imageTinted.width*imageScale)/2),
				Number(Region[1])+(Number(Region[3])/2)+imagePanY-((imageTinted.height*imageScale)/2)
			);
			transform.concatenate(AT.getScaleInstance(imageScale,imageScale));
			transform.concatenate(AT.getRotateInstance(-imageRotation * Math.PI/180,imageTinted.width/2,imageTinted.height/2));
			g.drawImage(imageTinted,transform,null);
		}else{
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint($Template);
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,Card+'-Nightmare-front-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
	let adapterList = new Array(
		'EncounterSet1','EncounterSet2',
		'EncounterSet3','EncounterSet4','EncounterSet5' );
	let adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='EmptyIcon'){
			adapterSelector=index+1;
		}
	}
	sheet.paintImage(g,checkKey('adapter'+adapterSelector),checkKey('adapter-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET1),checkKey('EncounterSet1-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET2),checkKey('EncounterSet2-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET3),checkKey('EncounterSet3-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET4),checkKey('EncounterSet4-portrait-clip-region'));
	sheet.paintImage(g,getIcon(ENCOUNTERSET5),checkKey('EncounterSet5-portrait-clip-region'));
/* STATS */
	Stage_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/a'+$Stage+'.png'));
	sheet.paintImage(g,Stage_tinter.getTintedImage(),checkKey('Stage-region'));
/* TEXT */
	drawName(g,diy);
	drawAdventure(g,diy);
	drawBody(new Array('Story','Rules','Condition'),g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	if(diy.settings.getBoolean('CollectionNumberHide',false)){
		CollectionNumber_box.markupText = '---';
		CollectionNumber_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('CollectionNumber-region')));
	}else{
		drawCollectionNumber(g,diy);
	}
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* PORTRAIT */
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
	}else{
		if(diy.settings.getBoolean('PortraitShare',false)){
			PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		}else{
			PortraitList[PORTRAITBACK].paint(g,sheet.getRenderTarget());
		}
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint($Template);
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,Card+'-Nightmare-back-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
/* STATS */
	Stage_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/b'+$Stage+'.png'));
	sheet.paintImage(g,Stage_tinter.getTintedImage(),checkKey('Stage-region'));
	Progress_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Progress+'.png'));
	sheet.paintImage(g,Progress_tinter.getTintedImage(),diy.settings.getRegion(checkKey('Progress-region')));
/* TEXT */
	drawAdventure(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
	const BODYBACK_OPTIONRIGHT_SHAPE = new PageShape.CupShape(0,0,338,0,56);
	if(String($OptionRight)!=""){
		BodyBack_box.setPageShape(BODYBACK_OPTIONRIGHT_SHAPE);
	}else{
		BodyBack_box.setPageShape(PageShape.RECTANGLE_SHAPE);
	}
	drawBodyBack(new Array('StoryBack','RulesBack','ConditionBack'),g,diy);
	drawOptionRight(g,diy,sheet);
	if( diy.settings.getBoolean('NameShare',false)){
		drawName(g,diy);
	}else{
		NameBack_box.markupText = $NameBack;
		NameBack_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Name-region')));
	}
	if(diy.settings.getBoolean('PortraitShare',false)){
		drawArtist(g,diy);
	}else{
		if( $ArtistBack == '' ){
			ArtistBack_box.markupText = #LRL-IllustratorUnknown;
		}else{
			ArtistBack_box.markupText = #LRL-IllustratorShort+' '+$ArtistBack;
		}
		ArtistBack_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Artist-region')));
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
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-V.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-VHD.settings');
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
