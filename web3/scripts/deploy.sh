#! /bin/bash

RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   export "$KEY"="$VALUE"
done

stellar --version > /dev/null 2>&1 || {
  echo -e "${RED}Stellar is either not installed or its PATH is not set.${NC}"
  exit
}

build_path="target/wasm32-unknown-unknown/release/votex_contract.wasm"
admin_address=$(stellar keys address $SOURCE)

echo "Building Contract..."
stellar contract build > /dev/null 2>&1

echo "Deploying to $NETWORK..."
contract_address=$(stellar contract deploy \
  --wasm $build_path \
  --source $SOURCE \
  --network $NETWORK \
  -- --admin-address $admin_address 2> /dev/null)

printf "Deployment Completed with Address of ${BLUE}${contract_address}${NC}"