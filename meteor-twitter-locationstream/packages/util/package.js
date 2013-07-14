// file: package.js
Npm.depends({
    'util': '0.4.9'
});

Package.on_use(function(api) {
    api.add_files('util.js', 'server');
});