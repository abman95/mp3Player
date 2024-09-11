import { state } from './state.js';
import { updateTrackInfo } from '../components/uiUpdates.js';

export function readID3Tags() {
  jsmediatags.read(state.currentFile, {
    onSuccess: function(tag) {
      updateTrackInfo(tag.tags);
    },
    onError: function(error) {
      console.error('Error reading ID3 tags:', error);
      updateTrackInfo();
    }
  });
}