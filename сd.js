// cd.js

return function(args, fileSystem, currentDirectory) {
    if (!args) {
        return { message: "Ошибка: Не указана директория." };
    }

    let newDirectory = args;
    if (!newDirectory.endsWith('/')) {
        newDirectory += '/';
    }

    const fullPath = currentDirectory + newDirectory;
    const exists = Object.keys(fileSystem).some(file => file.startsWith(fullPath));

    if (exists) {
        return { newDirectory: fullPath, message: `Перемещено в директорию: ${fullPath}` };
    } else {
        return { message: `Ошибка: Директория "${args}" не найдена.` };
    }
};
