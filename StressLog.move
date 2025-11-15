module NeuroBalance::StressLog {
    use std::signer;
    use std::vector;

    struct Log has store { user: address, mfi: u8, timestamp: u64 }
    struct Logs has key { entries: vector<Log> }

    public entry fun init(account: &signer) {
        move_to(account, Logs { entries: vector::empty<Log>() })
    }

    public entry fun record(account: &signer, user: address, mfi: u8, timestamp: u64) {
        let logs = borrow_global_mut<Logs>(signer::address_of(account));
        vector::push_back(&mut logs.entries, Log { user, mfi, timestamp })
    }
}
