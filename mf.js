// mf.js

return function(args, fileSystem, currentDirectory, JSZipInstance) {
    if (!args) {
        return { message: "Ошибка: Не указан файл или URL." };
    }

    if (!JSZipInstance) {
        return { message: "Ошибка: ZIP файл не подключен." };
    }

    // Если это URL
    if (args.startsWith('http://') || args.startsWith('https://')) {
        const fileName = args.split('/').pop();
        fetch(args)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function() {
                    const fileData = reader.result.split(',')[1];
                    JSZipInstance.file(currentDirectory + fileName, fileData, { base64: true });
                    logToTerminal(`Файл "${fileName}" добавлен из URL.`);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => logToTerminal(`Ошибка загрузки файла: ${error.message}`));
    } else {
        // Если это локальный файл
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                JSZipInstance.file(currentDirectory + file.name, reader.result);
                logToTerminal(`Файл "${file.name}" добавлен из локального файла.`);
            };
            reader.readAsArrayBuffer(file);
        };
        input.click();
    }

    return { message: "Добавление файла..." };
};
