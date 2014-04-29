'use strict';

var fs     = require('fs')
  , path   = require('path')
  , runner = require('child_process');

exports.getAddon = function (base, type, callback) {
  var file;

  switch (type) {
  case 'Application':
    file = 'settings/about.php';
    break;
  case 'Theme':
    file = 'about.php';
    break;
  }

  if (!file) return callback(new Error('Addon meta not found'));

  var location = path.resolve(base, file);

  fs.exists(location, function (exists) {
    if (exists) {
      runner.exec(
        'php -r \'include("' + location + '"); print json_encode($' + type + 'Info);\''
      , function (err, stdout, stderr) {
          if (err) return callback(err);

          var info  = JSON.parse(stdout)[path.basename(base)]
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
      callback(new Error('Addon meta not found'));
    }
  })
}
