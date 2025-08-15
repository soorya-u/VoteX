#! /bin/bash

set -eo pipefail

STATUS_OUTPUT=$(supervisorctl status 2>/dev/null) || {
  echo "Supervisor not responding"
  exit 1
}

if echo "$STATUS_OUTPUT" | grep -vq "RUNNING"; then
  echo "Some services are not running:"
  echo "$STATUS_OUTPUT" | grep -v "RUNNING"
  exit 1
fi

echo "All services running!"

curl -s http://localhost:8000 > /dev/null || { echo "horizon is not responding"; exit 1; }

echo "Horizon is responsive!"

response=$(
  curl -s -X POST http://localhost:8000/soroban/rpc \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
)
status=$(echo "$response" | jq -r '.result.status')

if [ "$status" != "healthy" ]; then
  echo "soroban rpc is not healthy: status=$status"
  exit 1
fi

echo "Soroban RPC is healthy!"

output=$(stellar-core http-command info 2>/dev/null)
json=$(echo "$output" | sed -n '/^{/,$p')

state=$(echo "$json" | jq -r '.info.state')

if [ "$state" != "Synced!" ]; then
  echo "Stellar core NOT synced (state=$state)"
  exit 1
fi

echo "Stellar core is synced!"

exit 0