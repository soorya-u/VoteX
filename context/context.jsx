import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setAllowed, isConnected } from "@stellar/freighter-api";

import { retrievePublicKey, connectWallet, signTransaction } from "./wallet";
import { numberToU64, stringToScValString } from "./value-converter";
import {
  BASE_FEE,
  TransactionBuilder,
  Address,
  scValToNative,
  Keypair,
} from "@stellar/stellar-sdk";
import { getUserInfo } from "@stellar/freighter-api";
import { contract, server } from "./constants";
import { ownerPublicKey, notifyError, notifySuccess } from "./constants";

export const VotingDappConext = React.createContext();

export const VotingDappProvider = ({ children }) => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [loader, setLoader] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [checkVote, setCheckVote] = useState(false);

  useEffect(() => {
    const initFn = async () => {
      if (!(await isConnected())) return;
      await setAllowed().then(async () => setIsWalletConnected(true));
      const pk = await retrievePublicKey();
      setPublicKey(pk);
    };
    initFn();
  }, []);

  const callContract = async (functionName, values = null, fee = BASE_FEE) => {
    if (!isWalletConnected) return;

    const { publicKey } = await getUserInfo();

    const account = await server.getAccount(publicKey);

    const params = {
      fee,
      networkPassphrase: "Test SDF Network ; September 2015",
    };

    let buildTx;

    if (values === null) {
      buildTx = new TransactionBuilder(account, params)
        .addOperation(contract.call(functionName))
        .setTimeout(30)
        .build();
    } else if (Array.isArray(values)) {
      buildTx = new TransactionBuilder(account, params)
        .addOperation(contract.call(functionName, ...values))
        .setTimeout(30)
        .build();
    } else {
      buildTx = new TransactionBuilder(account, params)
        .addOperation(contract.call(functionName, values))
        .setTimeout(30)
        .build();
    }

    const prepareTx = await server.prepareTransaction(buildTx);

    const xdrTx = prepareTx.toXDR();
    const signedTx = await signTransaction(xdrTx, "TESTNET", publicKey);
    const tx = TransactionBuilder.fromXDR(
      signedTx,
      "Test SDF Network ; September 2015"
    );

    try {
      let sendTx = await server.sendTransaction(tx).catch((err) => {
        console.log("Catch-1", err);
        return err;
      });
      if (sendTx.errorResult) {
        throw new Error("Unable to submit transaction");
      }
      if (sendTx.status === "PENDING") {
        let txResponse = await server.getTransaction(sendTx.hash);
        while (txResponse.status === "NOT_FOUND") {
          txResponse = await server.getTransaction(sendTx.hash);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (txResponse.status === "SUCCESS") {
          let result = txResponse.returnValue;
          return result;
        }
      }
    } catch (err) {
      console.log("Catch-2", err);
      return;
    }
  };

  const registerCandidate = async (updateCandidate, image, pdf) => {
    const {
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
    } = updateCandidate;

    if (
      !_name ||
      !_nominationForm ||
      !_affidavit ||
      !_criminalAntecedents ||
      !_assetsAndLiabilities ||
      !_educationalQualifications ||
      !_electoralRollEntry ||
      !_securityDeposit ||
      !_partyAffiliation ||
      !_oathOrAffirmation ||
      !_photographs ||
      !_proofOfAge ||
      !_proofOfAddress ||
      !_panCardDetails ||
      !_voterIdCardDetails ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Registering Candidate, kindly wait...");
    setLoader(true);

    const data = JSON.stringify({
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      const publicKey = await retrievePublicKey();
      const publicKeyAddr = new Address(publicKey);
      await callContract("registerCandidate", [
        stringToScValString(_name),
        stringToScValString(url),
        publicKeyAddr.toScVal(),
      ]);

      notifySuccess("Successfully Registered Candidate");
      setLoader(false);
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess(
        "Registration failed, kindly connect to ellection commission"
      );
      console.log(error);
    }
  };

  const registerVoter = async (updateVoter, image, pdf) => {
    const {
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
    } = updateVoter;

    if (
      !_name ||
      !_voterAddress ||
      !_photograph ||
      !_parentOrSpouseName ||
      !_gender ||
      !_dobOrAge ||
      !_addressDetails ||
      !_epicNumber ||
      !_partNumberAndName ||
      !_assemblyConstituencyNumberAndName ||
      !_issuingAuthoritySignature ||
      !_hologramAndBarcode ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Registering Voter, kindly wait...");
    setLoader(true);

    const data = JSON.stringify({
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      const publicKey = await retrievePublicKey();
      const publicKeyAddr = new Address(publicKey).toScVal();
      contract.call("registerVoter", _name, url);
      await callContract("registerVoter", [
        stringToScValString(_name),
        stringToScValString(url),
        publicKeyAddr,
      ]);

      notifySuccess("Successfully Registered Voters");
      setLoader(false);
      router.push("/");
    } catch (error) {
      setLoader(false);
      notifySuccess(
        "Registration failed, kindly connect to election commission"
      );
      console.log(error);
    }
  };

  const approveCandidate = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving candidate...");
    setLoader(true);

    try {
      const pka = new Address(address);

      await callContract("approveCandidate", [
        pka.toScVal(),
        stringToScValString(message),
      ]);

      setLoader(false);
      notifySuccess("Successfully approve Candidate");
      router.push("/approve-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("approve failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const approveVoter = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving voter...");
    setLoader(true);

    const pka = new Address(address);

    try {
      await callContract("approve_voter", [
        pka.toScVal(),
        stringToScValString(message),
      ]);

      setLoader(false);
      notifySuccess("Successfully approved voter");
      router.push("/approve-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("approving failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const rejectCandidate = async (address, message) => {
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving candidate...");
    setLoader(true);

    try {
      const pka = new Address(address);

      await callContract("rejectCandidate", [
        pka.toScVal(),
        stringToScValString(message),
      ]);

      setLoader(false);
      notifySuccess(" Candidate Rejected");
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("approve failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const rejectVoting = async (address, message) => {
    console.log(address, message);
    if (!address || !message) return notifyError("Data Is Missing");
    notifySuccess("kindly wait, approving voter...");
    setLoader(true);

    try {
      const pka = new Address(address);

      await callContract("reject_voter", [
        pka.toScVal(),
        stringToScValString(message),
      ]);

      setLoader(false);
      notifySuccess("Successfully Rejected");
      router.push("/all-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("approving failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const setVotingPeriod = async (voteTime) => {
    const { startTime, endTime } = voteTime;

    if (!startTime || !endTime) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const startTimeMilliseconds = startDate.getTime();
    const endTimeMilliseconds = endDate.getTime();

    const startTimeSeconds = Math.floor(startTimeMilliseconds / 1000);
    const endTimeSeconds = Math.floor(endTimeMilliseconds / 1000);

    try {
      await callContract("set_voting_period", [
        numberToU64(startTimeSeconds),
        numberToU64(endTimeSeconds),
      ]);

      setLoader(false);
      notifySuccess("Successfully set voting period ");
      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      notifySuccess(
        "set voting period failed, kindly connect to ellection commission"
      );
      console.log(error);
    }
  };

  const updateVoter = async (updateVoter, image, pdf) => {
    const {
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
    } = updateVoter;

    if (
      !_name ||
      !_voterAddress ||
      !_photograph ||
      !_parentOrSpouseName ||
      !_gender ||
      !_dobOrAge ||
      !_addressDetails ||
      !_epicNumber ||
      !_partNumberAndName ||
      !_assemblyConstituencyNumberAndName ||
      !_issuingAuthoritySignature ||
      !_hologramAndBarcode ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Upadate Voter, kindly wait...");
    setLoader(true);

    const data = JSON.stringify({
      _name,
      _voterAddress,
      _photograph,
      _parentOrSpouseName,
      _gender,
      _dobOrAge,
      _addressDetails,
      _epicNumber,
      _partNumberAndName,
      _assemblyConstituencyNumberAndName,
      _issuingAuthoritySignature,
      _hologramAndBarcode,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      const pk = await retrievePublicKey();
      const pka = new Address(pk);
      await callContract("update_voter", [
        stringToScValString(_name),
        stringToScValString(url),
        pka.toScVal(),
      ]);

      notifySuccess("Successfully updated voter");
      setLoader(false);
      router.push("/all-voters");
    } catch (error) {
      setLoader(false);
      notifySuccess("Update failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const updateCandidate = async (updateCandidate, image, pdf) => {
    const {
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
    } = updateCandidate;

    if (
      !_name ||
      !_nominationForm ||
      !_affidavit ||
      !_criminalAntecedents ||
      !_assetsAndLiabilities ||
      !_educationalQualifications ||
      !_electoralRollEntry ||
      !_securityDeposit ||
      !_partyAffiliation ||
      !_oathOrAffirmation ||
      !_photographs ||
      !_proofOfAge ||
      !_proofOfAddress ||
      !_panCardDetails ||
      !_voterIdCardDetails ||
      !image ||
      !pdf
    )
      return notifyError("Data Is Missing");
    notifySuccess("Updating Candidate, kindly wait...");
    setLoader(true);

    const data = JSON.stringify({
      _name,
      _nominationForm,
      _affidavit,
      _criminalAntecedents,
      _assetsAndLiabilities,
      _educationalQualifications,
      _electoralRollEntry,
      _securityDeposit,
      _partyAffiliation,
      _oathOrAffirmation,
      _photographs,
      _proofOfAge,
      _proofOfAddress,
      _panCardDetails,
      _voterIdCardDetails,
      image,
      pdf,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      const pk = await retrievePublicKey();
      const pka = new Address(pk);
      await callContract("update_candidate", [
        stringToScValString(_name),
        stringToScValString(url),
        pka.toScVal(),
      ]);

      notifySuccess("Successfully Updated Candidate");
      setLoader(false);
      router.push("/all-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("Update failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const changeOwner = async (_newOwner) => {
    if (!_newOwner) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    const newOwner = new Address(_newOwner);
    const pk = await retrievePublicKey();
    const pka = new Address(pk);

    try {
      await callContract("change_owner", [newOwner.toScVal(), pka.toScVal()]);

      setLoader(false);
      notifySuccess("Successfully updated ");
      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      notifySuccess("updated failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const resetContract = async () => {
    notifySuccess("kindly wait...");
    setLoader(true);

    try {
      const pk = await retrievePublicKey();
      const pka = new Address(pk);
      await callContract("reset_contract", pka.toScVal());

      setLoader(false);
      notifySuccess("Successfully RESET ");
      router.push("/");
    } catch (error) {
      setLoader(false);
      notifySuccess("RESET failed, kindly connect to ellection commission");
      console.log(error.message);
    }
  };

  const giveVote = async (_candidateAddress) => {
    if (!_candidateAddress) return notifyError("Data Is Missing");
    notifySuccess("kindly wait...");
    setLoader(true);

    try {
      const candidateAddress = new Address(_candidateAddress);
      const pk = await retrievePublicKey();
      const pka = new Address(pk);
      await callContract("vote", [candidateAddress.toScVal(), pka.toScVal()]);

      setLoader(false);
      notifySuccess("Successfully voted ");
      router.push("/approve-candidates");
    } catch (error) {
      setLoader(false);
      notifySuccess("vote failed, kindly connect to ellection commission");
      console.log(error);
    }
  };

  const initContractData = async () => {
    try {
      if (isWalletConnected) {
        const [startDateN, endDateN] = await callContract("get_voting_time");

        const timestamp1 = startDateN;
        const timestamp2 = endDateN;

        const date1 = new Date(timestamp1 * 1000);
        const date2 = new Date(timestamp2 * 1000);

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

        const item = {
          startDate: date1.toLocaleDateString("en-US", options),
          endDate: date2.toLocaleDateString("en-US", options),
          startDateN: startDateN.toNumber(),
          endDateN: endDateN.toNumber(),
        };

        return item;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const getRegisteredCandidate = async () => {
    try {
      if (isWalletConnected) {
        const candidates = await callContract("get_all_registered_candidates");
        const items = await Promise.all(
          await scValToNative(candidates).map(
            async ({
              ipfs,
              candidate_address,
              registerId,
              status,
              voteCount,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _nominationForm,
                  _affidavit,
                  _criminalAntecedents,
                  _assetsAndLiabilities,
                  _educationalQualifications,
                  _electoralRollEntry,
                  _securityDeposit,
                  _partyAffiliation,
                  _oathOrAffirmation,
                  _photographs,
                  _proofOfAge,
                  _proofOfAddress,
                  _panCardDetails,
                  _voterIdCardDetails,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: candidate_address,
                registerId: registerId?.toNumber(),
                status,
                voteCount: voteCount?.toNumber(),
                ipfs,
                message,
                _name,
                _nominationForm,
                _affidavit,
                _criminalAntecedents,
                _assetsAndLiabilities,
                _educationalQualifications,
                _electoralRollEntry,
                _securityDeposit,
                _partyAffiliation,
                _oathOrAffirmation,
                _photographs,
                _proofOfAge,
                _proofOfAddress,
                _panCardDetails,
                _voterIdCardDetails,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const getRegisteredVoters = async () => {
    try {
      if (isWalletConnected) {
        const voters = await callContract("get_all_registered_voters");
        console.log(voters);

        const items = await Promise.all(
          scValToNative(voters).map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const votedVoters = async () => {
    try {
      if (isWalletConnected) {
        const voters = callContract("get_all_voters_who_voted");
        console.log(voters);

        const items = await Promise.all(
          voters.map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                address: voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        items?.filter((user) =>
          user.address.toLowerCase() === publicKey
            ? setCheckVote(true)
            : setCheckVote(false)
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const initFunction = async (val = BASE_FEE) => {
    const pk = await retrievePublicKey();
    const addres = new Address(pk).toScVal();
    callContract("init", addres, val);
  };

  const highestVotedCandidate = async () => {
    try {
      if (isWalletConnected) {
        const candidate = await callContract("get_current_voting_status");

        console.log(candidate);

        if (candidates?.candidateAddress.toLowerCase() === zeroAddress) return;

        const {
          data: {
            _name,
            _nominationForm,
            _affidavit,
            _criminalAntecedents,
            _assetsAndLiabilities,
            _educationalQualifications,
            _electoralRollEntry,
            _securityDeposit,
            _partyAffiliation,
            _oathOrAffirmation,
            _photographs,
            _proofOfAge,
            _proofOfAddress,
            _panCardDetails,
            _voterIdCardDetails,
            image,
            pdf,
          },
        } = await axios.get(candidates?.ipfs);

        const candidateData = {
          address: candidates?.candidateAddress,
          registerId: candidates?.registerId?.toNumber(),
          status: candidates?.status,
          voteCount: candidates?.voteCount?.toNumber(),
          ipfs: candidates?.ipfs,
          message: candidates?.message,
          _name,
          _nominationForm,
          _affidavit,
          _criminalAntecedents,
          _assetsAndLiabilities,
          _educationalQualifications,
          _electoralRollEntry,
          _securityDeposit,
          _partyAffiliation,
          _oathOrAffirmation,
          _photographs,
          _proofOfAge,
          _proofOfAddress,
          _panCardDetails,
          _voterIdCardDetails,
          image,
          pdf,
        };

        return candidateData;
      }
    } catch (error) {
      notifyError("Something went wrong");
      console.log(error);
    }
  };

  const addTransaction = async (destinationId, amount) => {
    var transaction;
    var sourceKeys = Keypair.fromSecret(
      "SCXX7GGIJEYGBL2H4JKSPR3VJXCYUT7KDQHKD2QIDGOMI566SJWEGWZS"
    );
    await server
      .loadAccount(destinationId)
      .catch(function (error) {
        if (error instanceof StellarSdk.NotFoundError) {
          throw new Error("The destination account does not exist!");
        } else return error;
      })
      .then(function () {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then(function (sourceAccount) {
        transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destinationId,
              asset: StellarSdk.Asset.native(),
              amount,
            })
          )
          .addMemo(StellarSdk.Memo.text("Test Transaction"))
          .setTimeout(180)
          .build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
      })
      .then(function (result) {
        console.log("Success! Results:", result);
      })
      .catch(function (error) {
        console.error("Something went wrong!", error);
      });
  };

  const getWinner = async () => {
    try {
      if (isWalletConnected) {
        const candidate = await callContract("get_winning_candidate");
        console.log(candidate);

        const items = await Promise.all(
          candidate.map(
            async ({
              ipfs,
              voterAddress,
              registerId,
              status,
              hasVoted,
              message,
            }) => {
              const {
                data: {
                  _name,
                  _voterAddress,
                  _photograph,
                  _parentOrSpouseName,
                  _gender,
                  _dobOrAge,
                  _addressDetails,
                  _epicNumber,
                  _partNumberAndName,
                  _assemblyConstituencyNumberAndName,
                  _issuingAuthoritySignature,
                  _hologramAndBarcode,
                  image,
                  pdf,
                },
              } = await axios.get(ipfs, {});

              return {
                voterAddress,
                registerId: registerId?.toNumber(),
                status,
                hasVoted,
                message,
                ipfs,
                _name,
                _voterAddress,
                _photograph,
                _parentOrSpouseName,
                _gender,
                _dobOrAge,
                _addressDetails,
                _epicNumber,
                _partNumberAndName,
                _assemblyConstituencyNumberAndName,
                _issuingAuthoritySignature,
                _hologramAndBarcode,
                image,
                pdf,
              };
            }
          )
        );

        return items;
      }
    } catch (error) {
      notifyError("Something weng wrong ");
      console.log(error);
    }
  };

  const getSingleVoter = async (address) => {
    try {
      if (!address) return notifyError("Kindly provide address");
      const pka = new Address(address);
      const data = await callContract("get_voter", pka.toScVal());
      const {
        data: {
          _name,
          _voterAddress,
          _photograph,
          _parentOrSpouseName,
          _gender,
          _dobOrAge,
          _addressDetails,
          _epicNumber,
          _partNumberAndName,
          _assemblyConstituencyNumberAndName,
          _issuingAuthoritySignature,
          _hologramAndBarcode,
          image,
          pdf,
        },
      } = await axios.get(data?.ipfs, {});

      const voter = {
        address: data?.voterAddress,
        registerId: data?.registerId.toNumber(),
        ipfs: data?.ipfs,
        status: data?.status,
        hasVoted: data?.hasVoted,
        message: data?.message,
        _name,
        _voterAddress,
        _photograph,
        _parentOrSpouseName,
        _gender,
        _dobOrAge,
        _addressDetails,
        _epicNumber,
        _partNumberAndName,
        _assemblyConstituencyNumberAndName,
        _issuingAuthoritySignature,
        _hologramAndBarcode,
        image,
        pdf,
      };

      return voter;
    } catch (error) {
      notifySuccess("Failed to get data, kindly reload page");
      console.log(error.message);
    }
  };

  const getSingleCandidate = async (address) => {
    try {
      if (!address) return notifyError("Kindly provide address");

      const pk = await retrievePublicKey();
      const pka = new Address(pk);

      const data = await scValToNative(
        await callContract("get_candidate", pka.toScVal())
      );

      const {
        data: {
          _name,
          _nominationForm,
          _affidavit,
          _criminalAntecedents,
          _assetsAndLiabilities,
          _educationalQualifications,
          _electoralRollEntry,
          _securityDeposit,
          _partyAffiliation,
          _oathOrAffirmation,
          _photographs,
          _proofOfAge,
          _proofOfAddress,
          _panCardDetails,
          _voterIdCardDetails,
          image,
          pdf,
        },
      } = await axios.get(data?.ipfs, {});
      console.log(_name);
      const candidate = {
        address: data?.candidateAddress,
        registerId: data?.registerId.toNumber(),
        ipfs: data?.ipfs,
        status: data?.status,
        voteCount: data?.voteCount.toNumber(),
        message: data?.message,
        _name,
        _nominationForm,
        _affidavit,
        _criminalAntecedents,
        _assetsAndLiabilities,
        _educationalQualifications,
        _electoralRollEntry,
        _securityDeposit,
        _partyAffiliation,
        _oathOrAffirmation,
        _photographs,
        _proofOfAge,
        _proofOfAddress,
        _panCardDetails,
        _voterIdCardDetails,
        image,
        pdf,
      };

      return candidate;
    } catch (error) {
      notifySuccess("Failed to get data, kindly reload page");
      console.log(error);
    }
  };

  return (
    <VotingDappConext.Provider
      value={{
        getSingleCandidate,
        getSingleVoter,
        getRegisteredCandidate,
        getRegisteredVoters,
        highestVotedCandidate,
        initContractData,
        votedVoters,
        getWinner,
        notifySuccess,
        notifyError,
        setLoader,
        connectWallet,
        publicKey,
        checkVote,
        isWalletConnected,
        loader,
        registerCandidate,
        registerVoter,
        approveVoter,
        approveCandidate,
        giveVote,
        updateCandidate,
        updateVoter,
        changeOwner,
        resetContract,
        setVotingPeriod,
        rejectCandidate,
        registerVoter,
        rejectVoting,
        callContract,
        ownerPublicKey,
        retrievePublicKey,
        addTransaction,
        initFunction,
      }}
    >
      {children}
    </VotingDappConext.Provider>
  );
};
