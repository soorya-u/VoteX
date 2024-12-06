#![no_std]

use soroban_sdk::{
    assert_with_error, contract, contracterror, contractimpl, contracttype, symbol_short, vec,
    Address, Env, String, Symbol, Vec, U256,
};

#[contracttype]
pub struct Voter {
    voter_address: Address,
    name: String,
    gender: String,
    date_of_birth: U256,
    email: String,
    voter_id: String,
    location: String,
    face_ipfs_hash: String,
    status: Symbol,
    has_voted: bool,
}

#[contracttype]
pub struct Candidate {
    candidate_address: Address,
    name: String,
    gender: String,
    date_of_birth: U256,
    party_name: String,
    email: String,
    location: String,
    degree_details: String,
    current_income: U256,
    status: Symbol,
    vote_count: U256,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    NotOwnerError = 1,
    CandidateNotApprovedError = 2,
    VoterAlreadyVotedError = 3,
    NotVotingPeriodError = 4,
    UpdateNotAllowedError = 5,
    NotFoundError = 6,
    ValueError = 7,
}

#[contracttype]
pub enum Voters {
    Voter(Address),
}

#[contracttype]
pub enum Candidates {
    Candidate(Address),
}

const NOT_VERIFIED: Symbol = symbol_short!("NotVer");
const PENDING: Symbol = symbol_short!("Pending");
const APPROVED: Symbol = symbol_short!("Approved");
const REJECTED: Symbol = symbol_short!("Rejected");

const OWNER: Symbol = symbol_short!("Owner");

const REGISTERED_VOTERS: Symbol = symbol_short!("RegVot");
const REGISTERED_CANDIDATES: Symbol = symbol_short!("RegCan");

const APPROVED_VOTERS: Symbol = symbol_short!("ApproVot");
const APPROVED_CANDIDATES: Symbol = symbol_short!("ApproCan");

const VOTED_VOTERS: Symbol = symbol_short!("VotVoted");

const START_TIME: Symbol = symbol_short!("StartTime");
const END_TIME: Symbol = symbol_short!("EndTime");

#[contract]
pub struct VotingOrganization;

#[contractimpl]
impl VotingOrganization {
    fn owner_only(env: &Env, address: Address) {
        let stored_addr: Address = env.storage().persistent().get(&OWNER).unwrap();
        assert_with_error!(&env, stored_addr == address, ContractError::NotOwnerError);
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

    pub fn register_voter(
        env: Env,
        address: Address,
        name: String,
        email: String,
        gender: String,
        date_of_birth: u64,
        location: String,
        voter_id: String,
    ) {
        let voter_id_key = Voters::Voter(address.clone());

        let voter_address = address.clone();

        let new_voter = Voter {
            name,
            voter_address,
            email,
            gender,
            date_of_birth: U256::from_u128(&env, date_of_birth as u128),
            voter_id,
            location,
            face_ipfs_hash: String::from_str(&env, ""),
            status: NOT_VERIFIED.clone(),
            has_voted: false,
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
    }

    pub fn register_candidate(
        env: Env,
        address: Address,
        name: String,
        email: String,
        gender: String,
        date_of_birth: u64,
        party_name: String,
        degree_details: String,
        current_income: u64,
        location: String,
    ) {
        let candidate_id_key = Candidates::Candidate(address.clone());

        let candidate_address = address.clone();

        let new_candidate = Candidate {
            candidate_address,
            name,
            email,
            gender,
            date_of_birth: U256::from_u128(&env, date_of_birth as u128),
            party_name,
            degree_details,
            current_income: U256::from_u128(&env, current_income as u128),
            location,
            status: NOT_VERIFIED.clone(),
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
    }

    pub fn approve_voter(
        env: Env,
        address: Address,
        face_ipfs_hash: String,
        owner_address: Address,
    ) {
        Self::owner_only(&env, owner_address);

        let key = Voters::Voter(address.clone());
        let mut voter: Voter = env.storage().persistent().get(&key).unwrap();

        voter.face_ipfs_hash = face_ipfs_hash;
        voter.status = APPROVED.clone();

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

    pub fn set_candidate_as_verified(env: Env, address: Address, owner_address: Address) {
        Self::owner_only(&env, owner_address);
        let key = Candidates::Candidate(address);

        let update_fn = |c: Option<Candidate>| -> Candidate {
            let mut candidate = c.unwrap();
            candidate.status = PENDING.clone();
            candidate
        };

        env.storage().persistent().update(&key, update_fn);
    }

    pub fn approve_candidate(env: Env, address: Address, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Candidates::Candidate(address.clone());
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.status = APPROVED.clone();

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

    pub fn reject_candidate(env: Env, address: Address, owner_address: Address) {
        Self::owner_only(&env, owner_address);

        let key = Candidates::Candidate(address.clone());
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.status = REJECTED.clone();

        env.storage().persistent().set(&key, &candidate);
    }

    pub fn set_voting_period(env: Env, start_time: u64, end_time: u64, address: Address) {
        Self::owner_only(&env, address);

        assert_with_error!(&env, start_time < end_time, ContractError::ValueError);

        env.storage().persistent().set(&START_TIME, &start_time);
        env.storage().persistent().set(&END_TIME, &end_time);
    }

    pub fn update_voter(
        env: Env,
        address: Address,
        name: String,
        email: String,
        gender: String,
        date_of_birth: u64,
        location: String,
        voter_id: String,
    ) {
        let key = Voters::Voter(address);
        let mut voter: Voter = env.storage().persistent().get(&key).unwrap();

        voter.name = name;
        voter.email = email;
        voter.gender = gender;
        voter.date_of_birth = U256::from_u128(&env, date_of_birth as u128);
        voter.location = location;
        voter.voter_id = voter_id;

        env.storage().persistent().set(&key, &voter)
    }

    pub fn update_candidate(
        env: Env,
        address: Address,
        name: String,
        email: String,
        gender: String,
        date_of_birth: u64,
        party_name: String,
        degree_details: String,
        location: String,
        current_income: u64,
    ) {
        let key = Candidates::Candidate(address);
        let mut candidate: Candidate = env.storage().persistent().get(&key).unwrap();

        candidate.name = name;
        candidate.email = email;
        candidate.gender = gender;
        candidate.date_of_birth = U256::from_u128(&env, date_of_birth as u128);
        candidate.party_name = party_name;
        candidate.degree_details = degree_details;
        candidate.location = location;
        candidate.current_income = U256::from_u128(&env, current_income as u128);

        env.storage().persistent().set(&key, &candidate)
    }

    pub fn change_owner(env: Env, new_owner: Address, address: Address) {
        Self::owner_only(&env, address);
        env.storage().persistent().set(&OWNER, &new_owner);
    }

    pub fn reset_contract(env: Env, address: Address) {
        Self::owner_only(&env, address);

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
    }

    pub fn vote(env: Env, candidate_address: Address, voter_address: Address) {
        let mut voter: Voter = env
            .storage()
            .persistent()
            .get(&Voters::Voter(voter_address.clone()))
            .unwrap();

        let mut candidate: Candidate = env
            .storage()
            .persistent()
            .get(&Candidates::Candidate(candidate_address.clone()))
            .unwrap();

        voter.has_voted = true;
        candidate.vote_count = candidate.vote_count.add(&U256::from_u32(&env, 1));

        env.storage().persistent().set(
            &Candidates::Candidate(candidate_address.clone()),
            &candidate,
        );

        env.storage()
            .persistent()
            .set(&Voters::Voter(voter_address.clone()), &voter);

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
