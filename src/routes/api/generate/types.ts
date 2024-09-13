interface Badges {
    clickAction: string;
    clickURL: string | null;
    id: string; // b64-enc
    image1x: string; // url
    image2x: string; // url
    image4x: string; // url
    setID: string;
    title: string;
    version: string;
    __typename: string;
}

// this lists channel details in both 'User' and 'Channel' types
interface RecapBase {
    id: string;
    displayName: string;
    profileImageURL: string; // url
}

interface User extends RecapBase {
    broadcastBadges: Badges[];
    self: {
        recap: UserRecap;
        subscriptionBenefit: Benefit;
        subscriptionTenure: Tenure;
    }
}

interface UserRecap {
    chatMessagesSent: string;
    minutesWatched: string;
    streamsPlayed: string;
    __typename: string; // 'UserRecap'
}

interface Benefit {
    endsAt: string; // date
    gift: {
        gifter?: {
            displayName: string;
            id: string;
            login: string;
            __typename: string;
        };
        isGift: boolean; // if false, no gifter field on gift object
        __typename: string;
    };
    id: string;
    interval: {
        unit: string;
        duration: number;
        __typename: string;
    }
    isDNRd: boolean; // 'do not renew'-ed
    isExtended: boolean;
    pendingSubscription: any | null; // idk
    platform: string;
    purchasedWithPrime: boolean;
    renewsAt: string | null // assuming date when auto-renew enabled
    tier: string; // 1000/2000/3000 for each tier
    __typename: string;
}

interface Tenure {
    daysRemaining: number;
    months: number;
    __typename: string;
}

interface Channel extends RecapBase {
    recap: ChannelRecap;
    __typename: string; // 'Channel' or 'UserSelfConnection'
}

interface ChannelRecap {
    chatMessagesSent: string;
    emoteUsage: Array<{
        emote: {
            id: string;
            suffix: string;
            token: string;
            __typename: string;
        };
        totalUsage: string;
        __typename: string;
    }>;
    minutesStreams: string;
    streamsStreamed: string;
    __typename: string;
}

export interface RecapsQueryResponse {
    data: {
        badges: Badges[]
        channel: Channel;
        user: User;
    };

    extensions: {
        durationMilliseconds: number;
        operationName: string;
        requestID: string;
    };
}
