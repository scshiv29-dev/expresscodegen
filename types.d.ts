export interface Root {
        session: Session
        user: User2
}

export interface Session {
        access_token: string
        token_type: string
        expires_in: number
        refresh_token: string
        user: User
        expires_at: number
}

export interface User {
        id: string
        aud: string
        role: string
        email: string
        email_confirmed_at: string
        phone: string
        confirmation_sent_at: string
        confirmed_at: string
        last_sign_in_at: string
        app_metadata: AppMetadata
        user_metadata: UserMetadata
        identities: Identity[]
        created_at: string
        updated_at: string
}

export interface AppMetadata {
        provider: string
        providers: string[]
}

export interface UserMetadata { }

export interface Identity {
        id: string
        user_id: string
        identity_data: IdentityData
        provider: string
        last_sign_in_at: string
        created_at: string
        updated_at: string
}

export interface IdentityData {
        email: string
        sub: string
}

export interface User2 {
        id: string
        aud: string
        role: string
        email: string
        email_confirmed_at: string
        phone: string
        confirmation_sent_at: string
        confirmed_at: string
        last_sign_in_at: string
        app_metadata: AppMetadata2
        user_metadata: UserMetadata2
        identities: Identity2[]
        created_at: string
        updated_at: string
}

export interface AppMetadata2 {
        provider: string
        providers: string[]
}

export interface UserMetadata2 { }

export interface Identity2 {
        id: string
        user_id: string
        identity_data: IdentityData2
        provider: string
        last_sign_in_at: string
        created_at: string
        updated_at: string
}

export interface IdentityData2 {
        email: string
        sub: string
}
export type Paste = {
        id: string
        created_at: string
        title: string
        content: string
        isViewOnce: boolean
        views: number
        anonymous: boolean
        user: string
        isProtected: boolean
        password: any
}
export type PasteR = {
        title: string
        content: string
        isViewOnce: boolean
        views: number
        anonymous: boolean
        user: string
        isProtected: boolean
        password: any
}
