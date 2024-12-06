param(
  [string]$Source,
  [string]$Network
)

$build_path = "target/wasm32-unknown-unknown/release/democrachain.wasm"

$owner_address = stellar keys address $Source

Write-Host "Building Contract..."

stellar contract build > $null 2>&1

Write-Host "Deploying to $Network..."

$contract_address = stellar contract deploy `
  --wasm $build_path `
  --source $Source `
  --network $Network `
  -- --owner-address $owner_address `
  > $null 2>&1

Write-Host "Deployment Completed with Address of " -NoNewline
Write-Host $contract_address -ForegroundColor Blue