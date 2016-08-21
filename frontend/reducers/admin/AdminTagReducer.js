import * as types from '../../actions/admin/ActionTypes';

export default function AdminTagReducer(state=initialState, action) {
    switch (action.type) {
        case types.GET_TAGS_SUCCESS: {
            const {data} = action;
            return Object.assign({}, state, {
                tags: data.map(tag => {
			        const {_id, tagName} = tag;
			        return {
				        _id,
				        tagName,
                        match: true,
				        checked: false

			        };
     			 })
            });
        }
        case types.GET_TAGS_ERROR: {
            const {error} = action;
            return Object.assign({}, state, {
                error
            });
        }
        case types.POST_TAG_ERROR: {
            const {error} = action;
            return Object.assign({}, state, {
                error
            });
        }
        case types.DELETE_TAGS_ERROR: {
            const {error} = action;
            return Object.assign({}, state, {
                error
            });
        }
        case types.SET_FILTER_TERM: {
            const { searchTerm } = action;
            return Object.assign({}, state, {
                searchTerm
            })
        }
        case types.FILTER_TAGS: {
            const { searchTerm, tags, isAllChecked } = state;
            return Object.assign({}, state, {
                tags: filter(tags, searchTerm, isAllChecked)
            })
        }
        case types.SET_TAG_NAME: {
    		const { tagNameToAdd } = action;
            return Object.assign({}, state, {
                tagNameToAdd
            });
        }
        case types.SELECT_ALL: {
    		const {tags} = state;
    		const {checked} = action;
            return Object.assign({}, state, {
                tags: tags.map(tag => {
			        const {_id, tagName, match} = tag;
			        return {
				        _id,
				        tagName,
                        match,
                        checked
			        };
     			 }),
                isAllChecked: checked
            });
        }
        case types.SELECT_ONE: {
    		const {tags} = state;
    		const {id, checked} = action;
            return Object.assign({}, state, {
                tags: tags.map(tag => {
                	if(tag._id === id) {
                		const {_id, tagName, match} = tag;
                		return {
				        	_id,
				       		tagName,
                            match,
				        	checked
			        	};
                	}
                	return tag;
                }),
                isAllChecked: false
            });
        }
        default: {
            return state;
        }
    }
}


const initialState = {
    isAllChecked: false,
    tagNameToAdd: '',
    searchTerm: '',
    tags: [],
    error: ''
};


const filter = (array, term, isAllChecked) => {
    const phrase = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const pattern = new RegExp(phrase,'i');
    array.forEach(tag => {
        if (!pattern.test(tag.tagName)) {
            tag.match = false;
            tag.checked = false;
        } else {
            tag.match = true;
            if (isAllChecked) {
                tag.checked = true;
            }
        }
    });
    return array;
};
