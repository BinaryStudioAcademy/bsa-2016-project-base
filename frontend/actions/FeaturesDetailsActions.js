export function filterFeaturesDetails(search) {
    return {
        type: 'FILTER_FEATURES_DETAILS',
        search
    };
}

export function openModal(id) {
    return {
        type: 'FEATURES_DETAILS_MODAL_OPEN',
        id
    }
}

export function closeModal() {
    return {
        type: 'FEATURES_DETAILS_MODAL_CLOSE'
    }
}