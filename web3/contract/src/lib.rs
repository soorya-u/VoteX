#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, vec, Address, Env, String, Symbol, Vec,
    U256,
};

const PENDING: Symbol = symbol_short!("Pending");
const APPROVED: Symbol = symbol_short!("Approved");
const REJECTED: Symbol = symbol_short!("Rejected");

#[contracttype]
pub struct Voter {
    voter_address: Address,
    name: String,
    ipfs: String,
    register_id: U256,
    status: Symbol,
    has_voted: bool,
    message: String,
}

#[contracttype]
pub struct Candidate {
    candidate_address: Address,
    name: String,
    ipfs: String,
    register_id: U256,
    status: Symbol,
    vote_count: U256,
    message: String,
}

#[contracttype]
pub enum Voters {
    Voter(Address),
}

#[contracttype]
pub enum Candidates {
    Candidate(Address),
}

const OWNER: Symbol = symbol_short!("Owner");
const REGISTERED_VOTERS: Symbol = symbol_short!("RegVot");
const REGISTERED_CANDIDATES: Symbol = symbol_short!("RegCan");
const APPROVED_VOTERS: Symbol = symbol_short!("ApproVot");
const APPROVED_CANDIDATES: Symbol = symbol_short!("ApproCan");
const VOTED_VOTERS: Symbol = symbol_short!("VotVoted");
const VOTER_ID_COUNTER: Symbol = symbol_short!("votIdCntr");
const CANDIDATE_ID_COUNTER: Symbol = symbol_short!("canIdCntr");
const START_TIME: Symbol = symbol_short!("StartTime");
const END_TIME: Symbol = symbol_short!("EndTime");

#[contract]
pub struct VotingOrganization;

#[contractimpl]
impl VotingOrganization {
    fn owner_only(env: &Env, address: Address) {
        let stored_addr: Address = env.storage().persistent().get(&OWNER).unwrap();
        assert_eq!(stored_addr, address, "can only be called by owner");
    }

    fn only_during_voting_period(env: &Env) {
        let start_time = env.storage().persistent().get(&START_TIME).unwrap_or(0);
        let end_time = env.storage().persistent().get(&END_TIME).unwrap_or(0);

        if !(env.ledger().timestamp() >= start_time && env.ledger().timestamp() <= end_time) {
            panic!("Voting is not active")
        }
    }

    pub fn init(env: Env, owner_address: Address) {
        const INITIAL_TIME: u64 = 0;
        let empty_array: Vec<Address> = vec![&env];
        env.storage().persistent().set(&OWNER, &owner_address);
        env.storage().persistent().set(&START_TIME, &INITIAL_TIME);
        env.storage().persistent().set(&END_TIME, &INITIAL_TIME);
        env.storage()
            .persistent()
            .set(&REGISTERED_VOTERS, &empty_array);
        env.storage()
            .persistent()
            .set(&REGISTERED_CANDIDATES, &empty_array);
        env.storage()
            .persistent()
            .set(&APPROVED_VOTERS, &empty_array);
        env.storage()
            .persistent()
            .set(&APPROVED_CANDIDATES, &empty_array);
        env.storage().persistent().set(&VOTED_VOTERS, &empty_array);
    }

    pub fn register_voter(env: Env, name: String, ipfs: String, address: Address) {
        const PENDING_MESSAGE: &str = "Currently your registration is pending";
        let voter_id_key = Voters::Voter(address.clone());

        let id_counter = env
            .storage()
            .persistent()
            .get(&VOTER_ID_COUNTER)
            .unwrap_or(1);

        let new_voter = Voter {
            voter_address: address.clone(),
            name,
            ipfs,
            has_voted: false,
            message: String::from_str(&env, PENDING_MESSAGE),
            register_id: U256::from_u32(&env, id_counter.clone()),
            status: PENDING.clone(),
        };

        env.storage().persistent().set(&voter_id_key, &new_voter);
        let mut registered_voters: Vec<Address> = env
            .storage()
            .persistent()
            .get(&REGISTERED_VOTERS)
            .unwrap_or(vec![&env]);

        registered_voters.push_back(address);

        env.storage()
            .persistent()
            .set(&REGISTERED_VOTERS, &registered_voters);

        env.storage()
            .persistent()
            .set(&VOTER_ID_COUNTER, &(id_counter + 1));
    }

    pub fn register_candidate(env: Env, name: String, ipfs: String, address: Address) {
        const PENDING_MESSAGE: &str = "Currently your registration is pending";
        let candidate_id_key = Candidates::Candidate(address.clone());

        let id_counter = env
            .storage()
            .persistent()
            .get(&CANDIDATE_ID_COUNTER)
            .unwrap_or(1);

        let new_candidate = Candidate {
            candidate_address: address.clone(),
            name,
            ipfs,
            message: String::from_str(&env, PENDING_MESSAGE),
            register_id: U256::from_u32(&env, id_counter),
            status: PENDING.clone(),
            vote_count: U256::from_u32(&env, 0),
        };

        env.storage()
            .persistent()
            .set(&candidate_id_key, &new_candidate);

        let mut registered_candidates: Vec<Address> = env
            .storage()
            .persistent()
            .get(&REGISTERED_CANDIDATES)
            .unwrap_or(vec![&env]);

        registered_candidates.push_back(address);

        env.storage()
            .persistent()
            .set(&REGISTERED_CANDIDATES, &registered_candidates);

        env.storage()
            .persistent()
            .set(&CANDIDATE_ID_COUNTER, &(id_counter + 1));
    }

    pub fn approve_voter(env: Env, address: Address, message: String, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Voters::Voter(address.clone());
        let mut voter: Voter = env.storage().persistent().get(&key).unwrap();

        voter.status = APPROVED.clone();
        voter.message = message;

        env.storage().persistent().set(&key, &voter);

        let mut approved_voters: Vec<Address> = env
            .storage()
            .persistent()
            .get(&APPROVED_VOTERS)
            .unwrap_or(vec![&env]);

        approved_voters.push_back(address);
        env.storage()
            .persistent()
            .set(&APPROVED_VOTERS, &approved_voters);
    }

    pub fn approve_candidate(env: Env, address: Address, message: String, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Candidates::Candidate(address.clone());
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.status = APPROVED.clone();
        candidate.message = message;

        env.storage().persistent().set(&key, &candidate);

        let mut approved_candidate: Vec<Address> = env
            .storage()
            .persistent()
            .get(&APPROVED_CANDIDATES)
            .unwrap_or(vec![&env]);

        approved_candidate.push_back(address);
        env.storage()
            .persistent()
            .set(&APPROVED_CANDIDATES, &approved_candidate);
    }

    pub fn reject_voter(env: Env, address: Address, message: String, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Voters::Voter(address.clone());
        let mut voter: Voter = env.storage().persistent().get(&key).unwrap();

        voter.status = REJECTED.clone();
        voter.message = message;

        env.storage().persistent().set(&key, &voter);
    }

    pub fn reject_candidate(env: Env, address: Address, message: String, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Candidates::Candidate(address.clone());
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.status = REJECTED.clone();
        candidate.message = message;

        env.storage().persistent().set(&key, &candidate);
    }

    pub fn set_voting_period(env: Env, start_time: u64, end_time: u64, address: Address) {
        Self::owner_only(&env, address.clone());

        assert!(start_time < end_time, "Start time must be before end time.");

        env.storage().persistent().set(&START_TIME, &start_time);
        env.storage().persistent().set(&END_TIME, &end_time);
    }

    pub fn update_voter(env: Env, name: String, ipfs: String, addr: Address) {
        const PENDING_MESSAGE: &str = "Currently your registration is pending";
        let key = Voters::Voter(addr.clone());
        let mut voter: Voter = env.storage().persistent().get(&key).unwrap();

        voter.name = name;
        voter.ipfs = ipfs;
        voter.message = String::from_str(&env, PENDING_MESSAGE);
        voter.status = PENDING.clone();

        env.storage().persistent().set(&key, &voter)
    }

    pub fn update_candidate(env: Env, name: String, ipfs: String, addr: Address) {
        let key = Candidates::Candidate(addr.clone());
        const PENDING_MESSAGE: &str = "Currently your registration is pending";
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.name = name;
        candidate.ipfs = ipfs;
        candidate.message = String::from_str(&env, PENDING_MESSAGE);
        candidate.status = PENDING.clone();

        env.storage().persistent().set(&key, &candidate)
    }

    pub fn change_owner(env: Env, new_owner: Address, address: Address) {
        Self::owner_only(&env, address.clone());
        env.storage().persistent().set(&OWNER, &new_owner);
    }

    pub fn reset_contract(env: Env, address: Address) {
        Self::owner_only(&env, address.clone());

        let voters: Vec<Address> = env
            .storage()
            .persistent()
            .get(&REGISTERED_VOTERS)
            .unwrap_or(vec![&env]);

        for v in voters {
            let key = Voters::Voter(v);
            env.storage().persistent().remove(&key);
        }

        let candidates: Vec<Address> = env
            .storage()
            .persistent()
            .get(&REGISTERED_CANDIDATES)
            .unwrap_or(vec![&env]);

        for c in candidates {
            let key = Candidates::Candidate(c);
            env.storage().persistent().remove(&key);
        }

        const INITIAL_TIME: u64 = 0;
        let empty_array: Vec<Address> = vec![&env];
        env.storage().persistent().set(&START_TIME, &INITIAL_TIME);
        env.storage().persistent().set(&END_TIME, &INITIAL_TIME);
        env.storage()
            .persistent()
            .set(&REGISTERED_VOTERS, &empty_array);
        env.storage()
            .persistent()
            .set(&REGISTERED_CANDIDATES, &empty_array);
        env.storage()
            .persistent()
            .set(&APPROVED_VOTERS, &empty_array);
        env.storage()
            .persistent()
            .set(&APPROVED_CANDIDATES, &empty_array);
        env.storage().persistent().set(&VOTED_VOTERS, &empty_array);

        env.storage().persistent().remove(&VOTER_ID_COUNTER);
        env.storage().persistent().remove(&CANDIDATE_ID_COUNTER);
    }

    pub fn vote(env: Env, candidate_address: Address, voter_address: Address) {
        Self::only_during_voting_period(&env);
        let mut voter: Voter = env
            .storage()
            .persistent()
            .get(&Voters::Voter(voter_address.clone()))
            .unwrap();

        assert_eq!(
            voter.status,
            APPROVED.clone(),
            "You are not an approved voter."
        );

        assert!(!voter.has_voted, "You have already voted.");

        let mut candidate: Candidate = env
            .storage()
            .persistent()
            .get(&Candidates::Candidate(candidate_address.clone()))
            .unwrap();

        assert_eq!(
            candidate.status,
            APPROVED.clone(),
            "Candidate is not approved."
        );

        voter.has_voted = true;
        candidate.vote_count = candidate.vote_count.add(&U256::from_u32(&env, 1));

        env.storage()
            .persistent()
            .set(&Candidates::Candidate(candidate_address), &candidate);
        env.storage()
            .persistent()
            .set(&Voters::Voter(voter_address.clone()), &voter);

        let mut voters_who_voted: Vec<Address> = env
            .storage()
            .persistent()
            .get(&VOTED_VOTERS)
            .unwrap_or(vec![&env]);

        voters_who_voted.push_back(voter_address);

        env.storage()
            .persistent()
            .set(&VOTED_VOTERS, &voters_who_voted)
    }
}
