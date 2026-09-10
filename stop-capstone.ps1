Get-Process node,python -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host 'Stopped local Node.js and Python capstone processes.'
