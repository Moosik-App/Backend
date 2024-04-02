export enum PermsEnum {
    VIEW = 1 << 1,     // 2
    UPDATE = 1 << 2,   // 4
    CREATE = 1 << 3,   // 8
    DELETE = 1 << 4,   // 16
    LAST = 1 << 5, // 32
    ALL = VIEW | UPDATE | CREATE | DELETE // Combines all permissions
}
