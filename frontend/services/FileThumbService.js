import * as constants  from '../constants/Api';

const iconsPath = 'icons/';
const typesNeedThumb = ['doc','docx','txt','xml','pdf','zip','rar','xls','xlsx'];
const imageTypes = ['png','jpg','jpeg','rtf'];

class FileThumbService {

	setThumb(files) {
		const {ORIGIN} = constants;
		for(let i=0; i < files.length; i++) {
			const file = files[i];
			const {path} = file;
			const ext = path.slice(path.lastIndexOf('.')+1,path.length);

			if (typesNeedThumb.includes(ext)) {
				file.thumb = iconsPath + ext +'.png';
			} else {
				if (imageTypes.includes(ext)) {
					file.thumb = file.path;
				} else {
					file.thumb = iconsPath + 'unknown.png';
				}
			}
			//console.log('ORIGIN '+ORIGIN);
			//console.log('file.path '+file.path);
			file.path = ORIGIN + file.path;
		}
		
		return files;
	}

}

const fileThumbService = new FileThumbService();
export default fileThumbService;



