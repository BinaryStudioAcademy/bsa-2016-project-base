import letters from "./letters";
const SPACE = " ";
import Token from "./Token";
import Node from"./Node";

export default function (string) {
    class Exception extends Error {
        constructor(token, expected) {
            super(`Unknown symbol ${token} at position ${i}${expected?`, expected ${expected}`:``}`);
            Error.captureStackTrace(this, this.constructor);
        }
    }
    let currentToken,
        currentTokenValue,
        i = -1;
    getToken();
    return expr();

    function getToken() {
        do {
            i += 1;
        }
        while (string[i] === SPACE);
        if (!string[i]) {
            currentToken = Token.END;
            return;
        }
        switch (string[i]) {
            case Token.DIS:
            case Token.CON:
            case Token.LP:
            case Token.RP:
            case Token.MOD2:
            case Token.NOT:
                return currentToken = string[i];
            case "-":
                if (string[i + 1] === ">") {
                    i += 1;
                    return currentToken = Token.IMPL;
                } else throw new Exception(string[i + 1], ">");
            default:
                if (letters.indexOf(string[i]) > -1) {
                    return currentToken = name();
                }
        }
    }

    function name() {
        const _i = i;
        while (letters.indexOf(string[i]) > -1) {
            i += 1;
        }
        currentTokenValue = string.slice(_i, i);
        i -= 1;
        return Token.NAME;
    }

    function expr() {
        const left = term();
        switch (currentToken) {
            case Token.IMPL:
            case Token.MOD2:
            case Token.DIS:
                const token = currentToken;
                getToken();
                return new Node({
                    value: token,
                    left,
                    right: expr()
                });
            default:
                return new Node({value: left});
        }
    }

    function term() {
        const left = prim();
        switch (currentToken) {
            case Token.CON:
                getToken();
                return new Node({
                    value: Token.CON,
                    left,
                    right: term()
                });
            default:
                return new Node({value: left})
        }
    }

    function prim() {
        switch (currentToken) {
            case Token.NOT:
                getToken();
                return new Node({value: Token.NOT, child: prim()});
            case Token.NAME:
                const name = new Node({value: currentTokenValue});
                getToken();
                return name;
            case Token.LP:
                getToken();
                const e = expr();
                if (currentToken != Token.RP)throw new Exception(currentToken, Token.RP);
                getToken();
                return e;
            default:
                throw new Exception(currentToken)
        }
    }
};