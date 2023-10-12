/* COMPONENT CONFIGURATION */
const Card = 'Divider';
const PortraitListKey = new Array('Portrait','PortraitV','Collection','EncounterSet');
const CARDVERSION = 1;
const FRONTH = 0;
const BACKH = 1;
const FRONTV = 2;
const BACKV = 3;

function createTemplates( diy ){
	diy.faceStyle = FaceStyle.FOUR_FACES;
	diy.setTemplateKey(FRONTH,'Divider-horizontal');
	diy.setTemplateKey(BACKH,'Divider-horizontal');
	diy.setTemplateKey(FRONTV,'Divider-vertical');
	diy.setTemplateKey(BACKV,'Divider-vertical');
}

function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait+': '+@LRL-front);
	PortraitV_panel = new portraitPanel(diy,PORTRAITV,@LRL-Portrait+': '+@LRL-promo);
/* TEMPLATE */
	var combo = new Array(
		'Standard','Nightmare','CustomDifficulty',
		'Leadership','Lore','Spirit','Tactics','Neutral',
		'Baggins','Fellowship','Mastery','CustomSphere'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	IconSwap_button = new toggleButton(@LRL-swap,'',diy.settings.getBoolean('IconSwap',false),null);
	Template_hsb = new HSBPanel();
/* ICONS */
	importClass(arkham.diy.ListItem);
	combo = new Array('CustomIcon','EmptyIcon','StrangeEonsIcon');
	combo = combo.concat(LRL.EncounterSetList);
	combo = combo.concat(LRL.CollectionList);
	combo = combo.concat(LRL.SphereList);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(
			item,@('LRL-'+item),
			ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'),IconSize,IconSize)
		);
	}
	Collection_list = new comboBox(combo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Type+': '+@LRL-custom);
	EncounterSet_list = new comboBox(combo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-Subtype+': '+@LRL-custom);
/* STATS */
	IconLayout_button = new cycleButton(
		[@LRL-Name,@LRL-left,@LRL-left+'-'+@LRL-middle,@LRL-right+'-'+@LRL-middle,@LRL-right],
		['name','left','leftmiddle','rightmiddle','right']
	);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Artist_text = new textField($Artist,12,null);
	var NameTab = new Grid(); 
	NameTab.editorTabScrolling = true;
	NameTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
		separator(),'newline,growx',
		@LRL-Subtype,'newline,split',EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		separator(),'newline,growx'
	);
	NameTab.addToEditor(editor,@LRL-Name);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx,split',
		IconLayout_button,'growx,split',
		IconSwap_button,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline,growx',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid(); 
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		PortraitV_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var bindings = new Bindings(editor,diy);
	bindings.add('Template',Template_list,[0,1,2,3]);
	bindings.add('Template-tint',Template_hsb,[0,1,2,3]);
	bindings.add('Name',diy.nameField,[0,1,2,3]);
	bindings.add('Layout',IconLayout_button,[0,1,2,3]);
	bindings.add('IconSwap',IconSwap_button,[0,1,2,3]);
	bindings.add('EncounterSet',EncounterSet_list,[0,1,2,3]);
	bindings.add('Artist',Artist_text,[0,1,2,3]);
	bindings.add('Collection',Collection_list,[0,1,2,3]);
	bindings.bind();
}

function createFrontPainter( diy, sheet ){
/* TEMPLATE */
	if(sheet.getSheetIndex()==FRONTH){
		Template_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('Divider-tintable-horizontal'));
		EncounterDeco_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('Divider-Encounter-horizontal-deco'));
	}else{
		TemplateV_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('Divider-tintable-vertical'));
		EncounterDecoV_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('Divider-Encounter-vertical-deco'));
	}
/* ICONS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	if(typeof(Name_box) == 'undefined'){
		Name_box = markupBox(sheet);
		Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
		Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	}
	if(typeof(Artist_box) == 'undefined'){
		Artist_box = markupBox(sheet);
		Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
		Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	}
}

function createBackPainter(diy,sheet){}

function paintAny(g,diy,sheet){
	var decoType;
	switch(String($Template)){
	case 'Nightmare': case 'Standard': case 'CustomDifficulty':
		decoType = 'Encounter';
		break;
	default:
		decoType = 'Player';
	}
	var cardFormat;
	switch(sheet.getSheetIndex()){
	case FRONTH: case BACKH:
		cardFormat = 'horizontal';
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		break;
	case FRONTV: case BACKV:
		cardFormat = 'vertical';
		PortraitList[PORTRAITV].paint(g,sheet.getRenderTarget());
		break;
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'CustomDifficulty': case 'CustomSphere':
		hsb = diy.settings.getTint('Template-tint');
		break;
	default:
		hsb = diy.settings.getTint(checkKey($Template+'-tint'));
	}
	switch(sheet.getSheetIndex()){
	case FRONTH: case BACKH:
		Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,Template_tinter.getTintedImage(),'Divider-horizontal-region');
		break;
	case FRONTV: case BACKV:
		TemplateV_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,TemplateV_tinter.getTintedImage(),'Divider-vertical-region');
		break;
	}
	if(decoType=='Encounter'){
		switch(sheet.getSheetIndex()){
		case FRONTH: case BACKH:
			EncounterDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,EncounterDeco_tinter.getTintedImage(),'Divider-horizontal-region');
			break;
		case FRONTV: case BACKV:
			EncounterDecoV_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
			sheet.paintImage(g,EncounterDecoV_tinter.getTintedImage(),'Divider-vertical-region');
			break;
		}
	}else{
		sheet.paintTemplateImage(g);
	}
/* ADAPTER */
	var adapterImage = null;
	switch(String($Layout)){
	case 'left':
		adapterImage = diy.settings.getImageResource('Divider-'+decoType+'-'+cardFormat+'-adapter-side');
		switch(sheet.getSheetIndex()){
		case BACKH: case BACKV:
			adapterImage = ImageUtils.mirror(adapterImage);
		}
		break;
	case 'leftmiddle':
		adapterImage = diy.settings.getImageResource('Divider-'+decoType+'-'+cardFormat+'-adapter-center');
		switch(sheet.getSheetIndex()){
		case BACKH: case BACKV:
			adapterImage = ImageUtils.mirror(adapterImage);
		}
		break;
	case 'rightmiddle':
		adapterImage = diy.settings.getImageResource('Divider-'+decoType+'-'+cardFormat+'-adapter-center');
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			adapterImage = ImageUtils.mirror(adapterImage);
		}
		break;
	case 'right':
		adapterImage = diy.settings.getImageResource('Divider-'+decoType+'-'+cardFormat+'-adapter-side');
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			adapterImage = ImageUtils.mirror(adapterImage);
		}
		break;
	default:
		adapterImage = diy.settings.getImageResource('Divider-'+decoType+'-'+cardFormat+'-adapter-title');
		switch(sheet.getSheetIndex()){
		case BACKH:
			adapterImage = ImageUtils.mirror(adapterImage);
		}
	}
	sheet.paintImage(g,
		adapterImage,
		'Divider-'+cardFormat+'-adapter-region'
	);
/* ICONS */
	var collectionImage;
	var setImage;
	if( diy.settings.getBoolean('IconSwap',false) === true ){
		collectionImage = getIcon(ENCOUNTERSET);
		setImage = getIcon(COLLECTION);
	}else{
		collectionImage = getIcon(COLLECTION);
		setImage = getIcon(ENCOUNTERSET);
	}
	switch(String($Layout)){
	case 'left': 
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-left-region');
			break;
		case BACKH: case BACKV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-right-region');
			break;
		}
		break;
	case 'leftmiddle':
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-leftmiddle-region');
			break;
		case BACKH: case BACKV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-rightmiddle-region');
			break;
		}
		break;
	case 'rightmiddle':
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-rightmiddle-region');
			break;
		case BACKH: case BACKV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-leftmiddle-region');
			break;
		}
		break;
	case 'right':
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-right-region');
			break;
		case BACKH: case BACKV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-left-region');
			break;
		}
		break;
	case 'name':
		switch(sheet.getSheetIndex()){
		case FRONTH: case FRONTV:
			sheet.paintImage(g,setImage,'Divider-'+cardFormat+'-Collection-region');
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-EncounterSet-region');
			break;
		case BACKH: case BACKV:
			sheet.paintImage(g,collectionImage,'Divider-'+cardFormat+'-Collection-back-region');
			sheet.paintImage(g,setImage,'Divider-'+cardFormat+'-EncounterSet-back-region');
			break;
		}
		break;
	}
/* TEXT */
	if($Layout == 'name'){
		Name_box.markupText = $Name;
		switch(sheet.getSheetIndex()){
		case BACKH:
			Name_box.drawAsSingleLine(g,diy.settings.getRegion('Divider-'+cardFormat+'-Name-back-region'));
			break;
		default:
			Name_box.drawAsSingleLine(g,diy.settings.getRegion('Divider-'+cardFormat+'-Name-region'));
		}
	}
	if($Artist == ''){ Artist_box.markupText = #LRL-IllustratorUnknown;
	}else{ Artist_box.markupText = #LRL-IllustratorShort+' '+$Artist; }
	drawTextLineOutlined('Artist','Divider-'+cardFormat+'-Artist-region',strokeMedium,diy,g,sheet);
/*FINISH*/
	saveLocalized(diy);
}

function paintFront(g,diy,sheet){
	if(typeof(SE2CARD) != 'undefined'){sheet.paintPortrait(g);}
	paintAny(g,diy,sheet);
}

function paintBack(g,diy,sheet){paintAny(g,diy,sheet);}

if(sourcefile == 'Quickscript'){
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-A.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-AHD.settings');
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
