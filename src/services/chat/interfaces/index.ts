export interface NewChatApiServiceParams {
	userName: string,
	message: string,
	location: {
		coordinates: number[]
	}
}

export interface GetAllChatsChatApiServiceParams {
	lat: number;
    long: number;
	radiusInKm: number;
}

export interface ChatExternal {
    _id: string;
    userName: string;
    createdAt: string;
    message: string;
}

export interface ChatApiServiceExternalReturn {
    chats: ChatExternal[]
}
