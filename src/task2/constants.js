export const PROCESS_COMMAND_BY_OS = {
    windows: 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"',
    unix: 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
};

export const UPDATE_CONSOLE_PERIOD_MS = 100;
export const UPDATE_FILE_PERIOD_MS = 60000;
