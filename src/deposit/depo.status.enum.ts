/**
 * Determines current state of specific deposit. Used in DepoModel.
 */
enum DepoStatus {
    /**
     * All good - your stuff is waiting for you
     */
    ACTIVE = 'ACTIVE',
    /**
     * You already got your email, property will be disposed of within 1 week.
     */
    CONTACTED = 'CONTACTED',
    /**
     * Your stuff is going to be disposed of realy soon.
     */
    OUTDATED = 'OUTDATED',
    /**
     * Sorry, we thrown it out.
     */
    DISPOSED = 'DISPOSED',
    /**
     * All good, you took your stuff,
     * we hid the files in the archive.
     */
    ARCHIVED = 'ARCHIVED',
    /**
     * We got rid of your stuff, and the files are archived.
     */
    ARCHIVED_DISPOSED = 'ARCHIVED_DISPOSED',
}

export default DepoStatus