/**
 * Detect langauge from config, mulit_language config, path or
 * page/post settings
 *
 * @param {String} path like locals.path
 * @param {String} [localsLang]  
 * @param {String} [localsPageLang]
 * @return {String}
 * @api public
 */

var get = function(path, localsLang, localsPageLang){

  config = hexo.config;
  var language = config.language;

  // is multi language feature enabled?
  if (config.hasOwnProperty('multi_language') &&
      config.multi_language.hasOwnProperty('enable') &&
      config.multi_language.enable) {

    // get language from config, multi language settings or post/page
    if (config.multi_language.hasOwnProperty('default')) {
      language = config.multi_language.default
    }

    if (path) {
      // autodetec language by path: de/blog => lang = de
      config.multi_language.languages.forEach(function(l) {
        if (config.multi_language.hasOwnProperty(l)) {
          var pathStartWith = l;
          if (config.multi_language[l].path) {
            pathStartWith = config.multi_language[l].path;
          }
          pathStartWith = pathStartWith + '/';

          if (path.indexOf(pathStartWith) == 0 ||
              path.indexOf('/'+pathStartWith) == 0) {
            language = l
          }
        }
      })
    }

    // keep locals.lang if it was defined earlier
    if (localsLang) {
      language = localsLang;
    }
    // lang can be overwritten per post/page
    if (localsPageLang) {
      language = localsPageLang;
    }
  }
  return language;
};

var prefix = function(language) {
  if (!language) { language = get() }

  // is multi language feature enabled?
  if (config.hasOwnProperty('multi_language') &&
      config.multi_language.hasOwnProperty('enable') &&
      config.multi_language.enable) {
    if (config.multi_language.hasOwnProperty(language)) {
      if (config.multi_language[language].path) {
        return config.multi_language[language].path;
      } else {
        return language
      }
    } else {
      return language
    }
  }

  return '';
}

module.exports = {
  get: get,
  prefix: prefix
}