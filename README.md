# DemocraChain

## Prerequisites of the Project

1. Create a Certificate Authority.

   ```sh
   openssl genrsa -out localhost-ca.key 2048
   ```
   ```sh
   openssl req -x509 -new -nodes -key localhost-ca.key -sha256 -days 1024 -out localhost-ca.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```

2. Create a certificate for localhost.

   ```sh
   openssl genrsa -out localhost.key 2048
   ```
   ```sh
   openssl req -new -key localhost.key -out localhost.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
   ```sh
   openssl x509 -req -in localhost.csr -CA localhost-ca.crt -CAkey localhost-ca.key -CAcreateserial -out localhost.crt -days 500 -sha256
   ```

## Run Project Locally

To run the Project locally:

1. Create a _.env_ File by running the Command:

   ```sh
   cp .env.example .env
   ```

2. Enter the Pinata API Key, Secret and Owner Public Key. 

3. Build the Contract. 

   ```sh
   cd web3 && stellar contract build
   ```
   
4. Deploy the Contract.

   ```sh
    stellar contract deploy --wasm target/wasm32-unknown-unknown/release/voting_organization.wasm --source <account-name> --network <network-name>
    ```

5. Copy the Contract ID to `NEXT_PUBLIC_CONTRACT_ID` in \*.env\_ File

6. Run the Init Function.

   ```sh
   stellar contract invoke --id <contract-id> --source <account-name> --network <network-name> -- init --owner-address <owner-address>
   ```
7. Run the Command to start the Frontend.

   ```sh
   npm run dev
   ```
