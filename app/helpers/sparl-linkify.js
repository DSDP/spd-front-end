import Ember from 'ember';
import urlRegex from '../utils/sparl-regex';

export function sparlLinkify(textToLinkify) {
  textToLinkify = Ember.Handlebars.Utils.escapeExpression(textToLinkify);

  textToLinkify = textToLinkify.replace(urlRegex(), function (s) {
    return ' <a href="' + s.trim() + '">' + s.trim() + '</a> ';
  });

  return new Ember.Handlebars.SafeString(textToLinkify);
}

export default Ember.Handlebars.makeBoundHelper(sparlLinkify);

