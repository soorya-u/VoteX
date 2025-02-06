<a id="readme-top"></a>

<br />
<div align="center">
  <img src="https://votex.soorya-u.dev/logo.webp" alt="Logo" width="80" height="80">

  <h1 align="center">VoteX</h1>

  <p align="center">
    An AI driven Stellar based Decentralized Voting Application which empowers communities to make decisions collectively with confidence.
    <br />
    <br />
    <a href="https://votex.soorya-u.dev">View Demo</a>
    <strong>&middot;</strong>
    <a href="https://github.com/soorya-u/VoteX/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#architecture">Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

## About The Project

This project is a secure, AI-driven, decentralized voting application built on the Stellar blockchain with Soroban smart contracts to ensure transparency and immutability. The system leverages Next.js for the frontend, a Python-based proxy server, and Redis as the database.

#### Key Features

- Decentralized & Secure – Built on Stellar blockchain with Soroban smart contracts for transparent voting.
- AI-Powered Authentication – Uses OCR for Aadhaar card recognition and face recognition models for enhanced security.
- Fast & Scalable – A Python proxy server optimizes API calls, and Redis ensures quick data access.
- User-Friendly Interface – A seamless Next.js frontend for an intuitive voting experience.

This system guarantees secure, verifiable, and tamper-proof elections with the power of AI and blockchain.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Client

[![Typescript][typescript-badge]][typescript-url]
[![Next][nextjs-badge]][nextjs-url]
[![Tailwind][tailwind-badge]][tailwind-url]

#### Server

[![Python][python-badge]][python-url]
[![FastAPI][fastapi-badge]][fastapi-url]

#### Database & Services

[![Redis][redis-badge]][redis-url]
[![Twilio][twilio-badge]][twilio-url]

#### Web3

[![Rust][rust-badge]][rust-url]
[![Stellar][stellar-badge]][stellar-url]
[![Pinata][pinata-badge]][pinata-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Architecture

<picture>
  <source srcset="https://votex.soorya-u.dev/architecture-dark.png" media="(prefers-color-scheme: dark)" style="filter: invert(1);" />
  <img src="https://votex.soorya-u.dev/architecture-light.png" alt="architecture" align="center" style="filter: invert(0);" />
</picture>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This is a set of instructions on how to set up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

These are the softwares required to run the project locally.

- [Node.js](https://nodejs.org/en/download)
- [Python](https://www.python.org/downloads/release/python-3124/)
- [Rust](https://www.rust-lang.org/tools/install)

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/soorya-u/votex.git
   ```

2. Install Stellar CLI

3. Create a new Account in any Stellar Network

4. Navigate to _web3_ Directory

   ```sh
   cd web3
   ```

5. Run the Deploy Command with Username and Network Options as Parameters to get the Deployed Contract Address

   ```ps1
   .\scripts\deploy.ps1 -Source <your-username> -Network <your-network>
   ```

6. Retrieve API Keys from Pinata and Twilio

7. Navigate to Server

   ```sh
   cd server
   ```

8. Create .env and fill the required variables
   ```sh
   cp .env.example .env
   ```

9. Install all the required packages
   ```sh
   poetry install
   ```

10. Run the FastAPI Server
   ```sh
   poetry run fastapi dev src
   ```

11. Navigate to Client
   ```sh
   cd client
   ```

12. Create .env and fill the required variables
   ```sh
   cp .env.example .env
   ```

13. Install Dependencies
   ```sh
   bun install
   ```

13. Run the Development Server
   ```sh
   bun dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Rasa Chatbot Integration

See the [open issues](https://github.com/soorya-u/votex/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[typescript-badge]: https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[nextjs-badge]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[nextjs-url]: https://nextjs.org/
[tailwind-badge]: https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[python-badge]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://python.org/
[fastapi-badge]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[fastapi-url]: https://fastapi.tiangolo.com/
[redis-badge]: https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white
[redis-url]: https://redis.io/
[twilio-badge]: https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white
[twilio-url]: https://www.twilio.com/
[rust-badge]: https://img.shields.io/badge/Rust-B6400E?style=for-the-badge&logo=rust&logoColor=white
[rust-url]: https://www.rust-lang.org/
[stellar-badge]: https://img.shields.io/badge/Stellar-000000?style=for-the-badge&logo=stellar&logoColor=white
[stellar-url]: https://stellar.org/
[pinata-badge]: https://img.shields.io/badge/Pinata-6D3AC6?style=for-the-badge&logo=pinboard&logoColor=white
[pinata-url]: https://pinata.cloud/
