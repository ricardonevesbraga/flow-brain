# Captura zero-fricção — adiciona linha no topo do Backlog de captura.md
# Uso: .\cap.ps1 "ideia: minha ideia"
param([Parameter(Mandatory=$true)][string]$Texto)

$VaultDir = Split-Path -Parent $PSScriptRoot
$Captura = Join-Path $VaultDir "00-inbox\captura.md"
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$Entrada = "- $Timestamp — $Texto"

$Conteudo = Get-Content $Captura -Encoding UTF8
$Idx = ($Conteudo | Select-String -Pattern "<!-- Cole aqui no topo").LineNumber
$Novo = $Conteudo[0..($Idx-1)] + $Entrada + $Conteudo[$Idx..($Conteudo.Length-1)]
$Novo | Set-Content $Captura -Encoding UTF8

Write-Host "Capturado: $Texto"
