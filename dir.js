// dir.js

return function(args, fileSystem, currentDirectory) {
    const files = Object.keys(fileSystem).filter(file => file.startsWith(currentDirectory));
    const fileList = files.map(file => file.replace(currentDirectory, '').split('/')[0]).filter(Boolean);
    const uniqueFiles = [...new Set(fileList)];
    return { message: uniqueFiles.join('\n') };
};
