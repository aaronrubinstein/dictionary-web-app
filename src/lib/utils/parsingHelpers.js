export function getPhonetic(def) {

	if (def.phonetic) return def.phonetic;

	for (const item of def.phonetics) {
		if (item.audio.endsWith('us.mp3')) {
			return item.text;
		}
	}
}

export function getAudio(def) {

	for (const item of def.phonetics) {
		if (item.audio.endsWith('us.mp3') || item.audio.endsWith('us.ogg')) {
            return item.audio;
		}
	}
}