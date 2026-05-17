export function getMediaLibrary() {
    return JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
}

export function saveToMediaLibrary(mediaItem) {
    const existing = getMediaLibrary();
    // mediaItem should look like { id: string, url: string, name: string }
    const updated = [mediaItem, ...existing];
    localStorage.setItem('thalir_media_library', JSON.stringify(updated));
    return updated;
}

export function removeFromMediaLibrary(id) {
    const existing = getMediaLibrary();
    const updated = existing.filter(m => m.id !== id);
    localStorage.setItem('thalir_media_library', JSON.stringify(updated));
    return updated;
}
