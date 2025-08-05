module DigitalID::IdentityManagement {

    use std::signer;
    use std::string::{Self, String};
    use aptos_framework::timestamp;

    /// On-chain self-sovereign profile
    struct Identity has key {
        username: String,
        bio: String,
        updated_at: u64,
    }

    /// Create a fresh identity (one per account)
    public entry fun create_identity(
        account: &signer,
        username: vector<u8>,
        bio: vector<u8>,
    ) {
        let addr = signer::address_of(account);
        assert!(!exists<Identity>(addr), 1);
        move_to(account, Identity {
            username: String::utf8(username),
            bio: String::utf8(bio),
            updated_at: timestamp::now_microseconds(),
        });
    }

    /// Update existing identity data
    public entry fun update_identity(
        account: &signer,
        username: vector<u8>,
        bio: vector<u8>,
    ) acquires Identity {
        let id = borrow_global_mut<Identity>(signer::address_of(account));
        id.username   = String::utf8(username);
        id.bio        = String::utf8(bio);
        id.updated_at = timestamp::now_microseconds();
    }
}
