/**
 * Permissions for users.
 */
enum Permits{
    /**
     * Read/Write Depos in SDM Korab
     */
    KORAB = 'KORAB',
    /**
     * Read/Write Depos in SDM Pasat
     */
    PASAT = 'PASAT',
    /**
     * Read/Write all depos, register and manage users
     */
    ADMIN = 'ADMIN',
    /**
     * \*laughs in TypeScript\*
     */
    ROOT = 'ROOT',
}

export default Permits