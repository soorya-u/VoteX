param(
  [string]$Source,
  [string]$Network
)

try {
  stellar --version  > $null 2>&1
} catch {
  Write-Host "Stellar is either not installed or its PATH is not set." -ForegroundColor Red
  exit
}

$build_path = "target\wasm32-unknown-unknown\release\votex_contract.wasm"

$admin_address = stellar keys show $Source

Write-Host "Building Contract..."

stellar contract build > $null 2>&1

Write-Host "Deploying to $Network..."

$contract_address = stellar contract deploy `
  --wasm $build_path `
  --source $Source `
  --network $Network `
  -- --admin-address $admin_address 2>$null

Write-Host "Deployment Completed with Address of " -NoNewline
Write-Host $contract_address -ForegroundColor Blue