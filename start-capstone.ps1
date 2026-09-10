$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$databasePath = Join-Path $projectRoot 'server\database'
$frontendPath = Join-Path $projectRoot 'server\frontend'
$flaskPath = Join-Path $projectRoot 'server\djangoapp\microservices'
$djangoPath = Join-Path $projectRoot 'server'
$logsPath = Join-Path $projectRoot 'logs'
New-Item -ItemType Directory -Force -Path $logsPath | Out-Null

if (-not (Test-NetConnection 127.0.0.1 -Port 27017 -InformationLevel Quiet)) { throw 'MongoDB is not running. Start the Windows MongoDB service, then run this script again.' }

function Run-RequiredCommand($command, $arguments, $workingDirectory) {
    Push-Location $workingDirectory
    try {
        & $command @arguments | Out-Host
        if ($LASTEXITCODE -ne 0) { throw "Command failed: $command $arguments" }
    } finally { Pop-Location }
}

if (-not (Test-Path (Join-Path $databasePath 'node_modules'))) { Run-RequiredCommand 'npm' @('install') $databasePath }
if (-not (Test-Path (Join-Path $frontendPath 'node_modules'))) { Run-RequiredCommand 'npm' @('install') $frontendPath }

# Install Python packages for the current Windows user; this avoids venv/ensurepip failures.
Run-RequiredCommand 'python' @('-m', 'pip', 'install', '--user', '-r', (Join-Path $flaskPath 'requirements.txt')) $projectRoot
Run-RequiredCommand 'python' @('-m', 'pip', 'install', '--user', '-r', (Join-Path $djangoPath 'requirements.txt')) $projectRoot
Run-RequiredCommand 'python' @('-c', "import nltk; nltk.download('vader_lexicon', quiet=True)") $projectRoot
Run-RequiredCommand 'python' @('manage.py', 'migrate') $djangoPath

function Start-CapstoneProcess($name, $program, $arguments, $workingDirectory) {
    $outLog = Join-Path $logsPath "$name.out.log"; $errLog = Join-Path $logsPath "$name.err.log"
    $process = Start-Process -FilePath $program -ArgumentList $arguments -WorkingDirectory $workingDirectory -WindowStyle Hidden -RedirectStandardOutput $outLog -RedirectStandardError $errLog -PassThru
    Write-Host "$name started (PID $($process.Id))."
}

$env:MONGODB_URI = 'mongodb://127.0.0.1:27017/dealershipsDB'
$pythonExe = (Get-Command python).Source
Start-CapstoneProcess 'express' (Get-Command node).Source 'app.js' $databasePath
Start-CapstoneProcess 'flask' $pythonExe 'app.py' $flaskPath
Start-CapstoneProcess 'django' $pythonExe 'manage.py runserver' $djangoPath
Start-CapstoneProcess 'react' (Get-Command npm.cmd).Source 'start' $frontendPath
Write-Host 'Wait about 15 seconds, then open: http://localhost:3000'
Write-Host "Service logs: $logsPath"
