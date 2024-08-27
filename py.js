// py.js

return function(args, fileSystem, currentDirectory, JSZipInstance) {
    if (!args) {
        return { message: "Ошибка: Не указан файл или URL для выполнения." };
    }

    if (args.startsWith('http://') || args.startsWith('https://')) {
        // Выполнение Python скрипта по URL
        fetch(args)
            .then(response => response.text())
            .then(script => {
                pyodide.runPython(script);
            })
            .catch(error => logToTerminal(`Ошибка загрузки Python скрипта: ${error.message}`));
    } else {
        const filePath = `system/${args}`;
        if (fileSystem[filePath]) {
            fileSystem[filePath].async('string').then(script => {
                pyodide.runPython(script);
            }).catch(error => logToTerminal("Ошибка выполнения Python скрипта из ZIP."));
        } else {
            return { message: `Файл "${args}" не найден.` };
        }
    }
    return { message: `Python скрипт ${args} выполнен.` };
};
