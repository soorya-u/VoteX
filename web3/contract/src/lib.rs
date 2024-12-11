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
    occupation: String,
    location: String,
    face_ipfs_hash: String,
    profile_ipfs_hash: String,
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
    profile_ipfs_hash: String,
    status: Symbol,
    vote_count: U256,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    NotAdminError = 1,
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

const ADMIN: Symbol = symbol_short!("Admin");

const REGISTERED_VOTERS: Symbol = symbol_short!("Voters");
const REGISTERED_CANDIDATES: Symbol = symbol_short!("Candids");

const START_TIME: Symbol = symbol_short!("StartTime");
const END_TIME: Symbol = symbol_short!("EndTime");

#[contract]
pub struct VotingOrganization;

#[contractimpl]
impl VotingOrganization {
    pub fn __constructor(env: Env, admin_address: Address) {
        const INITIAL_TIME: u64 = 0;

        let empty_array: Vec<Address> = vec![&env];

        env.storage().persistent().set(&ADMIN, &admin_address);

        env.storage().persistent().set(&START_TIME, &INITIAL_TIME);
        env.storage().persistent().set(&END_TIME, &INITIAL_TIME);

        env.storage()
            .persistent()
            .set(&REGISTERED_VOTERS, &empty_array);
        env.storage()
            .persistent()
            .set(&REGISTERED_CANDIDATES, &empty_array);
    }

    fn _admin_authorization(env: &Env, address: Address) {
        let stored_addr: Address = env.storage().persistent().get(&ADMIN).unwrap();
        assert_with_error!(&env, stored_addr == address, ContractError::NotAdminError);
    }

    fn _append_to_vector(
        env: &Env,
        addr: Address,
    ) -> impl FnOnce(Option<Vec<Address>>) -> Vec<Address> {
        let new_vector: Vec<Address> = vec![env];

        |v: Option<Vec<Address>>| -> Vec<Address> {
            let mut vector = match v {
                Some(v) => v,
                None => new_vector,
            };

            vector.push_back(addr);

            vector
        }
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
        occupation: String,
        profile_ipfs_hash: String,
    ) {
        let voter_id_key = Voters::Voter(address.clone());

        let voter_address = address.clone();

        let new_voter = Voter {
            name,
            voter_address,
            email,
            gender,
            occupation,
            profile_ipfs_hash,
            date_of_birth: U256::from_u128(&env, date_of_birth as u128),
            voter_id,
            location,
            face_ipfs_hash: String::from_str(&env, ""),
            status: NOT_VERIFIED,
            has_voted: false,
        };

        env.storage().persistent().set(&voter_id_key, &new_voter);

        env.storage()
            .persistent()
            .update(&REGISTERED_VOTERS, Self::_append_to_vector(&env, address));
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
        profile_ipfs_hash: String,
    ) {
        let candidate_id_key = Candidates::Candidate(address.clone());

        let candidate_address = address.clone();

        let new_candidate = Candidate {
            candidate_address,
            name,
            email,
            gender,
            profile_ipfs_hash,
            date_of_birth: U256::from_u128(&env, date_of_birth as u128),
            party_name,
            degree_details,
            current_income: U256::from_u128(&env, current_income as u128),
            location,
            status: NOT_VERIFIED,
            vote_count: U256::from_u32(&env, 0),
        };

        env.storage()
            .persistent()
            .set(&candidate_id_key, &new_candidate);

        env.storage().persistent().update(
            &REGISTERED_CANDIDATES,
            Self::_append_to_vector(&env, address),
        );
    }

    pub fn set_voter_as_approved(
        env: Env,
        address: Address,
        face_ipfs_hash: String,
        admin_address: Address,
    ) {
        Self::_admin_authorization(&env, admin_address);

        let key = Voters::Voter(address.clone());

        env.storage().persistent().update(&key, |v: Option<Voter>| {
            let mut voter = v.unwrap();
            voter.face_ipfs_hash = face_ipfs_hash;
            voter.status = APPROVED;

            voter
        });
    }

    pub fn set_candidate_as_verified(env: Env, address: Address, admin_address: Address) {
        Self::_admin_authorization(&env, admin_address);
        let key = Candidates::Candidate(address);

        let update_fn = |c: Option<Candidate>| {
            let mut candidate = c.unwrap();
            candidate.status = PENDING;
            candidate
        };

        env.storage().persistent().update(&key, update_fn);
    }

    pub fn approve_candidate(env: Env, address: Address, admin_address: Address) {
        Self::_admin_authorization(&env, admin_address);

        let key = Candidates::Candidate(address.clone());

        let update_fn = |c: Option<Candidate>| {
            let mut candidate = c.unwrap();
            assert_with_error!(
                &env,
                candidate.status == PENDING,
                ContractError::CandidateNotApprovedError
            );
            candidate.status = APPROVED;
            candidate
        };

        env.storage().persistent().update(&key, update_fn);
    }

    pub fn reject_candidate(env: Env, address: Address, admin_address: Address) {
        Self::_admin_authorization(&env, admin_address);

        let key = Candidates::Candidate(address.clone());

        env.storage()
            .persistent()
            .update(&key, |c: Option<Candidate>| {
                let mut candidate = c.unwrap();
                candidate.status = REJECTED;
                candidate
            });
    }

    pub fn set_voting_period(env: Env, start_time: U256, end_time: U256, address: Address) {
        Self::_admin_authorization(&env, address);

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
        occupation: String,
    ) {
        let key = Voters::Voter(address);

        let update_fn = |v: Option<Voter>| {
            let mut voter = v.unwrap();

            voter.name = name;
            voter.email = email;
            voter.gender = gender;
            voter.date_of_birth = U256::from_u128(&env, date_of_birth as u128);
            voter.location = location;
            voter.voter_id = voter_id;
            voter.occupation = occupation;

            voter
        };

        env.storage().persistent().update(&key, update_fn);
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

        let update_fn = |c: Option<Candidate>| {
            let mut candidate = c.unwrap();

            candidate.name = name;
            candidate.email = email;
            candidate.gender = gender;
            candidate.date_of_birth = U256::from_u128(&env, date_of_birth as u128);
            candidate.party_name = party_name;
            candidate.degree_details = degree_details;
            candidate.location = location;
            candidate.current_income = U256::from_u128(&env, current_income as u128);

            candidate
        };

        env.storage().persistent().update(&key, update_fn);
    }

    pub fn reset_contract(env: Env, address: Address) {
        Self::_admin_authorization(&env, address);

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
    }

    pub fn vote(env: Env, candidate_address: Address, voter_address: Address) {
        let voter_key = Voters::Voter(voter_address.clone());
        let candidate_key = Candidates::Candidate(candidate_address.clone());

        env.storage()
            .persistent()
            .update(&voter_key, |v: Option<Voter>| {
                let mut voter = v.unwrap();

                assert_with_error!(
                    &env,
                    voter.has_voted == false,
                    ContractError::VoterAlreadyVotedError
                );

                voter.has_voted = true;

                voter
            });

        env.storage()
            .persistent()
            .update(&candidate_key, |c: Option<Candidate>| {
                let mut candidate = c.unwrap();

                assert_with_error!(
                    &env,
                    candidate.status == APPROVED,
                    ContractError::CandidateNotApprovedError
                );

                candidate.vote_count = candidate.vote_count.add(&U256::from_u32(&env, 1));

                candidate
            });
    }
}
