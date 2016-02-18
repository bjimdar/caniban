import Alt from 'alt';
import chromeDebug from 'alt-utils/lib/chromeDebug';

//Singleton instance of Alt (for now).
const alt = new Alt();
chromeDebug(alt);

export default alt;
