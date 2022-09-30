/* COMPONENT CONFIGURATION */
const Card = 'Event';
const PortraitListKey = new Array('Portrait','Collection','CustomSphere','BodyIcon');
const CARDVERSION = 3;
//2: a\u00f1adido Boon
//3: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'Event-front';
	diy.backTemplateKey = 'Player-vertical';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array(
		'Leadership','Lore','Spirit','Tactics','Neutral',
		'Baggins','Fellowship','Mastery','Boon','CustomSphere'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
	CustomSphere_panel = new portraitPanel(diy,CUSTOMSPHERE,@LRL-Sphere+': '+@LRL-custom);
	BodyIcon_portrait = new portraitPanel(diy,BODYICON,@LRL-BodyIcon+': '+@LRL-custom);
	BodyIcon_transparency = new slider(1,10,5,[1,@LRL-high,4,@LRL-medium,7,@LRL-low,10,@LRL-opaque],null);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
/* STATS */
	ResourceCost_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionLeft_text = new textField($OptionLeft,12,null);
	OptionRight_text = new textField($OptionRight,12,null);
	Type_text = new textField($Type,12,null);
	Subtype_text = new textField($Subtype,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		LRL.ResourceCostIcon,'newline,split',ResourceCost_list,'growx',
		separator(),'newline,growx',
		@LRL-Trait,'newline,split',new tipButton(@LRL-Trait-tip),'split',Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx',
		OptionLeft_text,'newline,split,growx',@LRL-options,'split',new tipButton(@LRL-option-tip),'split',OptionRight_text,'split,growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',Template_list,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline,growx',
		CustomSphere_panel,'newline,growx',
		BodyIcon_portrait,'newline,growx',
		@LRL-transparency,'newline,split',BodyIcon_transparency,'growx',
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
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
		@LRL-CollectionInfo,'newline,split',CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',CollectionNumber_text,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		@LRL-Subtype,'split',new tipButton(@LRL-Subtype-tip),'split',Subtype_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Trait',Trait_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('OptionLeft',OptionLeft_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('ResourceCost',ResourceCost_list,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Subtype',Subtype_text,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('BodyIcon-transparency',BodyIcon_transparency,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
	SphereText_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource(Card+'-tintable-sphereText'));
	SphereColour_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('tintable-sphereColour'));
	BodyIcon_tinter = new TintCache(new TintFilter(),null);
/* ICONS */
/* STATS */
	ResourceCost_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint('ResourceCost');
	ResourceCost_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setStyleForTag($LRLSymbols-tag,diy.settings.getTextStyle('LRLSymbols',null));
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
	Subtype_box = markupBox(sheet);
	Subtype_box.defaultStyle = diy.settings.getTextStyle(checkKey('Subtype-style'),null);
	Subtype_box.alignment = diy.settings.getTextAlignment(checkKey('Subtype-alignment'));
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
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
	}else{
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
	}
/* TEMPLATE */
	switch(String($Template)){
	case 'Boon': break;
	case 'CustomSphere':
		let hsb = diy.settings.getTint('Template');
		SphereText_tinter.setFactors(hsb[0],0.2,1);
		sheet.paintImage(g,SphereText_tinter.getTintedImage(),checkKey('sphereText-region'));
		BodyIcon_tinter.setImage(PortraitList[BODYICON].getImage());
		BodyIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,
			ImageUtilities.alphaComposite(
				BodyIcon_tinter.getTintedImage(),
				Number($BodyIcon-transparency)/10
			),
			checkKey('BodyIcon-portrait-clip-region')
		);
		break;
	default:
		sheet.paintImage(g,'Event-'+$Template+'-sphereText',checkKey('sphereText-region'));
	}
	switch(String($Template)){
	case 'Boon':
		sheet.paintImage(g,Card+'-Boon-front-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
	switch(String($Template)){
	case 'Boon': case 'Neutral': break;
	case 'CustomSphere':
		sheet.paintImage(g,
			checkKey('sphereDeco'),
			checkKey('sphereDeco-region')
		);
		SphereColour_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,SphereColour_tinter.getTintedImage(),checkKey('sphereColour-region'));
		break;
	default:
		sheet.paintImage(g,
			checkKey('sphereDeco'),
			checkKey('sphereDeco-region')
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/image/'+$Template+'-sc.png'),
			checkKey('sphereColour-region')
		);
	}
/* ICONS */
	paintIcon(COLLECTION,g,sheet);
	paintIcon(CUSTOMSPHERE,g,sheet);
/* STATS */
	ResourceCost_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$ResourceCost+'.png'));
	sheet.paintImage(g,ResourceCost_tinter.getTintedImage(),checkKey('ResourceCost-region'));
/* TEXTS */
	drawNameRotated(g,diy);
	drawBody(new Array('Trait','Rules','Flavour'),g,diy);
	drawOptionLeft(g,diy,sheet);
	drawOptionRight(g,diy,sheet);
	drawType(g,diy);
	if($Template=='Boon'){ drawSubtype(g,diy); }
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-P.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-PHD.settings');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}
