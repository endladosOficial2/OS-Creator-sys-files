// rd.js

return function(args, fileSystem, currentDirectory) {
    if (!args) {
        return { message: "Ошибка: Не указано имя директории." };
    }

    const directoryToRemove = currentDirectory + args + '/';

    if (!fileSystem[directoryToRemove]) {
        return { message: `Ошибка: Директория "${args}" не найдена.` };
    }

    delete fileSystem[directoryToRemove]; // Удаляем директорию
    return { message: `Директория "${args}" удалена.` };
};
