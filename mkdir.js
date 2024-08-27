// mkdir.js

return function(args, fileSystem, currentDirectory) {
    if (!args) {
        return { message: "Ошибка: Не указано имя директории." };
    }

    const newDirectory = currentDirectory + args + '/';

    if (fileSystem[newDirectory]) {
        return { message: `Ошибка: Директория "${args}" уже существует.` };
    }

    fileSystem[newDirectory] = {}; // Создаем пустую директорию
    return { message: `Директория "${args}" создана.` };
};
