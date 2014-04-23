'use strict';

var fs     = require('fs')
  , path   = require('path')
  , runner = require('child_process');

exports.getAddon = function (base, type, callback) {
  var file
    , dir  = path.basename(base);

  switch (type) {
  case 'Application':
    file = 'settings/about.php';
    break;
  case 'Plugin':
    file = 'class.' + dir.toLowerCase() + '.plugin.php';
    break;
  case 'Theme':
    file = 'about.php';
    break;
  }

  if (!file) return callback(new Error('Addon info not found'));

  var location = path.resolve(base, file);

  fs.exists(location, function (exists) {
    if (exists) {
      runner.exec(
        'php -r \'include("' + location + '"); print json_encode($' + type + 'Info);\''
      , function (err, stdout, stderr) {
          if (err) return callback(err);

          var info  = JSON.parse(stdout)[dir]
            , addon = {
              name    : info.Name
            , desc    : info.Description
            , version : info.Version
            , url     : info.Url
            , license : info.License
            , author  : {
                name  : info.Author
              , email : info.AuthorEmail
              , url   : info.AuthorUrl
              }
            }

          callback(false, addon);
        }
      );
    }
    else {
      callback();
    }
  })
}
