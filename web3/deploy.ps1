$source = "bored-man"
$network = "testnet"
$build_path = "target/wasm32-unknown-unknown/release/democrachain.wasm"

$owner_address = stellar keys address $source

Write-Host "Building Contract..."

stellar contract build > $null 2>&1

Write-Host "Deploying to $network..."

$contract_address = stellar contract deploy `
  --wasm $build_path `
  --source $source `
  --network $network

Write-Host "Invoking Initialization Function..."

stellar contract invoke `
  --id $contract_address `
  --source $source `
  --network $network `
  -- init `
  --owner_address $owner_address  `
  > $null 2>&1

Write-Host "Deployment Completed with Address of " -NoNewline
Write-Host $contract_address -ForegroundColor Blue