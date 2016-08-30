import * as constants  from '../constants/Api';

const iconsPath = 'icons/';
const typesNeedThumb = ['doc','docx','txt','xml','pdf','zip','rar','xls','xlsx'];
const imageTypes = ['png','jpg','jpeg','rtf'];


class FileThumbService {
	
	setThumb(item) {
		const {ORIGIN} = constants;
		const {path} = item;
		const ext = path.slice(path.lastIndexOf('.')+1,path.length);

		if (typesNeedThumb.includes(ext)) {
			item.thumb = iconsPath + ext +'.png';
		} else {
			if (imageTypes.includes(ext)) {
				item.thumb = item.path;
			} else {
				item.thumb = iconsPath + 'unknown.png';
			}
		}
		item.path = ORIGIN + item.path;
		return item;
	}

}

const fileThumbService = new FileThumbService();
export default fileThumbService;



