// savefs.js

return function(args, fileSystem, currentDirectory, JSZipInstance) {
    if (!JSZipInstance) {
        return { message: "Ошибка: ZIP файл не подключен." };
    }

    JSZipInstance.generateAsync({ type: "blob" }).then(function(content) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "filesystem.zip";
        link.click();
        URL.revokeObjectURL(link.href);
    });

    return { message: "Файловая система сохранена как filesystem.zip." };
};
