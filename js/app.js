import { util } from './util.js';
import { like } from './like.js';
import { theme } from './theme.js';
import { palette } from './palette.js';
import { audio } from './audio.js';
import { comment } from './comment.js';
import { progress } from './progress.js';
import { pagination } from './pagination.js';

palette.init();

window.util = util;
window.like = like;
window.theme = theme;
window.palette = palette;
window.audio = audio;
window.comment = comment;
window.progress = progress;
window.pagination = pagination;