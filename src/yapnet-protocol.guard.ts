/*
 * Generated type guards for "yapnet-protocol.ts".
 * WARNING: Do not manually change this file.
 */
import { YN_Message, Hello, Back, Welcome, PlayerJoined, PlayerLeft, ChatSend, ChatSent, YNError, RecapHead, RecapTail } from "./yapnet-protocol";

export function isYN_Message(obj: unknown): obj is YN_Message {
    const typedObj = obj as YN_Message
    return (
        (isPlayerJoined(typedObj) as boolean ||
            isHello(typedObj) as boolean ||
            isBack(typedObj) as boolean ||
            isWelcome(typedObj) as boolean ||
            isPlayerLeft(typedObj) as boolean ||
            isChatSend(typedObj) as boolean ||
            isChatSent(typedObj) as boolean ||
            isYNError(typedObj) as boolean ||
            isRecapHead(typedObj) as boolean ||
            isRecapTail(typedObj) as boolean)
    )
}

export function isHello(obj: unknown): obj is Hello {
    const typedObj = obj as Hello
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "helo" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["username"] === "string"
    )
}

export function isBack(obj: unknown): obj is Back {
    const typedObj = obj as Back
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "back" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["token"] === "string"
    )
}

export function isWelcome(obj: unknown): obj is Welcome {
    const typedObj = obj as Welcome
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "welc" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["username"] === "string" &&
        typeof typedObj["data"]["token"] === "string"
    )
}

export function isPlayerJoined(obj: unknown): obj is PlayerJoined {
    const typedObj = obj as PlayerJoined
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "plrj" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["username"] === "string"
    )
}

export function isPlayerLeft(obj: unknown): obj is PlayerLeft {
    const typedObj = obj as PlayerLeft
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "plrl" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["username"] === "string"
    )
}

export function isChatSend(obj: unknown): obj is ChatSend {
    const typedObj = obj as ChatSend
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "chas" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["chat_target"] === "string" &&
        typeof typedObj["data"]["chat_content"] === "string"
    )
}

export function isChatSent(obj: unknown): obj is ChatSent {
    const typedObj = obj as ChatSent
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "chat" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["chat_sender"] === "string" &&
        typeof typedObj["data"]["chat_target"] === "string" &&
        typeof typedObj["data"]["chat_content"] === "string"
    )
}

export function isYNError(obj: unknown): obj is YNError {
    const typedObj = obj as YNError
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "err" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["kind"] === "string" &&
        typeof typedObj["data"]["info"] === "string" &&
        typeof typedObj["data"]["details"] === "string"
    )
}

export function isRecapHead(obj: unknown): obj is RecapHead {
    const typedObj = obj as RecapHead
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "rech" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["count"] === "number" &&
        typeof typedObj["data"]["chunk_sz"] === "number"
    )
}

export function isRecapTail(obj: unknown): obj is RecapTail {
    const typedObj = obj as RecapTail
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["seq"] === "number" &&
        typedObj["msg_type"] === "recx" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["start"] === "number" &&
        Array.isArray(typedObj["data"]["msgs"]) &&
        typedObj["data"]["msgs"].every((e: any) =>
            isYN_Message(e) as boolean
        )
    )
}
