import React, { useEffect, useState, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // Подключаем стили xterm
import './term.css'; // Подключаем собственные стили
import Flowchart from './Flowchart'; // Импортируем компонент блок-схемы


function LinuxEmulation() {
  const [commandHistory, setCommandHistory] = useState([]); // История команд
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]); // Подсказки автодополнения
  const terminalRef = useRef(null); // Используем ref для контейнера
  const terminalInstance = useRef(null); // Ссылка на экземпляр терминала
  const fileSystem = useRef({ '/home/user': {} }); // Файловая система с простыми каталогами и файлами

  useEffect(() => {
    const terminalContainer = terminalRef.current;

    // Функция инициализации терминала
    const initTerminal = () => {
      if (terminalInstance.current) {
        return; // Если терминал уже инициализирован, не создаём новый
      }

      const terminal = new Terminal({
        cursorBlink: true,
        theme: {
          background: '#000000',
          foreground: '#ffffff',
        },
      });

      terminal.open(terminalContainer);
      terminalInstance.current = terminal;

      terminal.write('Welcome to your virtual Linux terminal! Made by love for developers! \r\n');

      const prompt = () => {
        terminal.write('\r\n$  ');
      };
      prompt();

      const whiteList = [
        'ls',
        'pwd',
        'echo',
        'clear',
        'help',
        'date',
        'whoami',
        'uname',
        'cat',
        'touch',
        'mkdir',
        'rmdir',
        'cd',
        'mv',
        'cp',
        'find',
        'grep',
        'chmod',
        'ping',
        'df',
        'du',
        'top',
        'ps',
        'kill',
        'exit',
        'history',
        'cat >',
        'touch',
      ]; // Белый список команд
      const blackList = ['rm', 'shutdown', 'reboot']; // Чёрный список команд

      let currentCommand = ''; // Переменная для хранения команды

      terminal.onData(data => {
        if (data === '\u0008' || data === '\x7f') {
          // Backspace
          if (currentCommand.length > 0) {
            currentCommand = currentCommand.slice(0, -1);
            terminal.write('\b \b');
          }
        } else if (data === '\r') {
          // Enter
          handleCommand(currentCommand, terminal);
          currentCommand = ''; // Очищаем текущую команду после обработки
        } else if (data === '\t') {
          // Tab (автодополнение)
          handleAutoComplete(currentCommand, terminal);
        } else {
          // Обычные символы
          currentCommand += data;
          terminal.write(data);
        }
      });

      // Обработка автодополнения
      function handleAutoComplete(currentCommand, terminal) {
        const suggestions = whiteList.filter(cmd =>
          cmd.startsWith(currentCommand.trim())
        );

        if (suggestions.length === 1) {
          // Если найдена одна команда — автодополняем
          terminal.write(suggestions[0].slice(currentCommand.length));
          currentCommand = suggestions[0]; // Обновляем текущую команду
        } else if (suggestions.length > 1) {
          // Если несколько вариантов, показываем список подсказок
          setAutoCompleteSuggestions(suggestions);
          terminal.write('\r\n' + suggestions.join(' ') + '\r\n');
          prompt();
        }
      }

      // Обработка команды
      function handleCommand(command, terminal) {
        const sanitizedCommand = command.trim();

        // Проверка на чёрный список команд
        if (blackList.includes(sanitizedCommand.split(' ')[0])) {
          terminal.write('Command is restricted.\r\n');
          prompt();
          return;
        }

        // Проверка на белый список команд
        if (whiteList.includes(sanitizedCommand.split(' ')[0])) {
          executeCommand(sanitizedCommand, terminal);
        } else {
          terminal.write(`Command not recognized: ${sanitizedCommand}\r\n`);
          prompt();
        }

        // Добавляем команду в историю
        setCommandHistory(prevHistory => [
          ...prevHistory,
          `$ ${sanitizedCommand}`,
        ]);
      }

      // Выполнение команды
      function executeCommand(command, terminal) {
        let output = '';
        const sanitizedCommand = command.trim();
        const commandArgs = sanitizedCommand.split(' '); // Разделяем команду и аргументы

        switch (commandArgs[0]) {
          case 'ls':
            // Вывод списка файлов
            output = listDirectory(commandArgs[1]);
            break;
          case 'pwd':
            // Вывод текущего пути
            output = getCurrentPath(commandArgs);
            break;
          case 'echo':
            // Эхо-команда (выводит аргументы команды)
            output = sanitizedCommand.substring(5) + '\r\n'; // Убираем 'echo ' из начала команды
            break;
          case 'help':
            // Вывод списка доступных команд
            output =
              'Available commands: ' +
              whiteList.filter(cmd => !blackList.includes(cmd)).join(', ') +
              '\r\n';
            break;
          case 'clear':
            // Очистка терминала
            terminal.clear();
            prompt();
            return;
          case 'history':
            // Вывод истории команд
            output = commandHistory
              .map((cmd, index) => `${index + 1}. ${cmd}`)
              .join('\r\n') + '\r\n';
            break;
          case 'date':
            // Вывод текущей даты и времени
            output = new Date().toLocaleString() + ' \r\n';
            break;
          case 'whoami':
            // Вывод имени пользователя
            output = ' user\r\n';
            break;
          case 'uname':
            // Вывод информации о системе
            output = ' Linux my-pc 5.10.0-9-amd64 #1 SMP Debian 5.10.7-2 x86_64 GNU/Linux\r\n';
            break;
          case 'cat':
            // Обработка команды 'cat'
            const fileName = commandArgs[1];
            if (fileSystem.current['/home/user'][fileName]) {
              output = `Contents of ${fileName}\r\n${fileSystem.current['/home/user'][fileName]}\r\n`;
            } else {
              output = ` cat: ${fileName}: No such file or directory\r\n`;
            }
            break;
          case 'mkdir':
            // Создание каталога
            const dirName = commandArgs[1];
            if (dirName) {
              createDirectory(dirName);
              output = `Directory ${dirName} created.\r\n`;
            } else {
              output = ' mkdir: missing operand\r\n';
            }
            break;
          case 'rmdir':
            // Удаление каталога
            const removeDir = commandArgs[1];
            if (removeDir) {
              removeDirectory(removeDir);
              output = `Directory ${removeDir} removed.\r\n`;
            } else {
              output = ' rmdir: missing operand\r\n';
            }
            break;
          case 'cd':
            // Смена каталога
            const newDir = commandArgs[1];
            if (newDir === '..') {
              output = '/home/user\r\n';
            } else {
              output = `/home/user/${newDir}\r\n`;
            }
            break;
          case 'mv':
            // Перемещение файла
            const [source, destination] = commandArgs.slice(1);
            moveFile(source, destination);
            output = `Moved ${source} to ${destination}\r\n`;
            break;
          case 'cp':
            // Копирование файла
            const [sourceFile, targetFile] = commandArgs.slice(1);
            copyFile(sourceFile, targetFile);
            output = `Copied ${sourceFile} to ${targetFile}\r\n`;
            break;
          case 'find':
            // Поиск файлов
            output = `Searching for files named ${commandArgs[1]}\r\n`;
            break;
          case 'grep':
            // Поиск текста в файле
            output = `Searching for ${commandArgs[1]} in file\r\n`;
            break;
          case 'chmod':
            // Изменение прав доступа
            output = `Changed permissions of ${commandArgs[1]}\r\n`;
            break;
          case 'ping':
            // Пинг
            output = 'Pinging google.com...\r\n';
            break;
          case 'df':
            // Проверка дискового пространства
            output = 'Filesystem  1K-blocks  Used Available Use% Mounted on\r\n/dev/sda1   1024000  204800  819200  21% /\r\n';
            break;
          case 'du':
            // Использование диска
            output = '4.0K    ./folder1\r\n8.0K    ./folder2\r\n';
            break;
          case 'top':
            // Вывод информации о процессах
            output = 'PID USER   PR  NI  VIRT  RES  SHR S  %CPU %MEM    TIME+  COMMAND\r\n';
            break;
          case 'ps':
            // Вывод списка процессов
            output = 'PID TTY      STAT   TIME COMMAND\r\n';
            break;
          case 'kill':
            // Убийство процесса
            output = `Terminating process ${commandArgs[1]}\r\n`;
            break;
          case 'exit':
            // Выход
            output = 'Exiting terminal.\r\n';
            terminal.write(output);
            return;
          default:
            // Для неизвестных команд
            output = `Command not recognized: ${sanitizedCommand}\r\n`;
        }

        terminal.write(output);

        // Добавляем вывод в историю
        setCommandHistory(prevHistory => [
          ...prevHistory,
          `Output: ${output.trim()}`,
        ]);

        prompt();
      }

      // Функции для файловой системы
      function createDirectory(dirName) {
        fileSystem.current['/home/user'][dirName] = {};
      }

      function removeDirectory(dirName) {
        delete fileSystem.current['/home/user'][dirName];
      }

      function moveFile(source, destination) {
        const file = fileSystem.current['/home/user'][source];
        if (file) {
          fileSystem.current['/home/user'][destination] = file;
          delete fileSystem.current['/home/user'][source];
        }
      }

      function copyFile(source, target) {
        const file = fileSystem.current['/home/user'][source];
        if (file) {
          fileSystem.current['/home/user'][target] = file;
        }
      }

      function listDirectory(path) {
        const dirPath = path ? `/home/user/${path}` : '/home/user';
        const files = Object.keys(fileSystem.current[dirPath] || {});
        return files.join(' ') + '\r\n';
      }

      function getCurrentPath() {
        return '/home/user\r\n';
      }

      // Очистка при размонтировании компонента
      return () => terminal.dispose();
    };

    // Инициализация терминала только если контейнер доступен
    if (terminalContainer && terminalContainer.clientWidth > 0 && terminalContainer.clientHeight > 0) {
      initTerminal();
    } else {
      console.error('Terminal container is not yet available or has no dimensions.');
    }
  }, [commandHistory]); // Убираем зависимость от commandHistory, чтобы избежать асинхронных проблем

  function getOutputForCommand(command) {
    const lastCommand = commandHistory.find(cmd => cmd.startsWith(`$ ${command}`));
    if (lastCommand) {
      const output = commandHistory
        .filter(cmd => cmd.startsWith(`Output: ${lastCommand.trim()}`))
        .map(outputCmd => outputCmd.replace('Output: ', ''))
        .join('\r\n');
      return output;
    }
    return ''; // Если нет вывода для команды, возвращаем пустую строку
  }

  return (
    <div>
      <h1>Эмулятор Linux</h1>
      <div ref={terminalRef} style={{ height: '400px', width: '100%' }}></div>
      
      <h2>История команд</h2>
      <div id="command-history">
        {commandHistory.map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
  
      <h2>График выполнения команд</h2>
      <div className="flowchart-wrapper">
        <div className="flowchart-container">
          {commandHistory.map((command, index) => (
            <>
              <div className="flowchart-link-wrapper">
                <div key={index} className={`flowchart-block ${command}`}>
                  <div className="block-content">
                    {/* Команда */}
                    <div className="command">{command}</div>
  
                    {/* Вывод команды */}
                    <div className="output">{getOutputForCommand(command)}</div>
                  </div>
                </div>
                {index < commandHistory.length - 1 && (
                  <div key={`arrow-${index}`} className="flowchart-arrow"></div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinuxEmulation;
