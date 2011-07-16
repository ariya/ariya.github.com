/*
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2010 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var TapDigit;
TapDigit = TapDigit || {};

TapDigit.Token = {
    Operator: 'Operator',
    Identifier: 'Identifier',
    Number: 'Number'
};

TapDigit.Lexer = function () {
    var expression = '',
        length = 0,
        index = 0,
        T = TapDigit.Token;

    function peekNextChar() {
        var idx = index;
        return ((idx < length) ? expression.charAt(idx) : '\x00');
    }

    function getNextChar() {
        var ch = '\x00',
            idx = index;
        if (idx < length) {
            ch = expression.charAt(idx);
            index += 1;
        }
        return ch;
    }

    function isWhiteSpace(ch) {
        return (ch === '\u0009') || (ch === ' ');
    }

    function isLetter(ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    }

    function isDecimalDigit(ch) {
        return (ch >= '0') && (ch <= '9');
    }

    function createToken(type, value) {
        return {
            type: type,
            value: value
        };
    }

    function skipSpaces() {
        var ch;

        while (index < length) {
            ch = peekNextChar();
            if (!isWhiteSpace(ch)) {
                break;
            }
            getNextChar();
        }
    }

    function scanOperator() {
        var ch = peekNextChar();
        if ('+-*/()^%=;,'.indexOf(ch) >= 0) {
            return createToken(T.Operator, getNextChar());
        }
        return undefined;
    }

    function isIdentifierStart(ch) {
        return (ch === '_') || isLetter(ch);
    }

    function isIdentifierPart(ch) {
        return isIdentifierStart(ch) || isDecimalDigit(ch);
    }

    function scanIdentifier() {
        var ch, id;

        ch = peekNextChar();
        if (!isIdentifierStart(ch)) {
            return undefined;
        }

        id = getNextChar();
        while (true) {
            ch = peekNextChar();
            if (!isIdentifierPart(ch)) {
                break;
            }
            id += getNextChar();
        }

        return createToken(T.Identifier, id);
    }

    function scanNumber() {
        var ch, number;

        ch = peekNextChar();
        if (!isDecimalDigit(ch) && (ch !== '.')) {
            return undefined;
        }

        number = getNextChar();
        while (true) {
            ch = peekNextChar();
            if (!isDecimalDigit(ch)) {
                break;
            }
            number += getNextChar();
        }

        if (ch === '.') {
            number += getNextChar();
            while (true) {
                ch = peekNextChar();
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += getNextChar();
            }
        }

        if (ch === 'e' || ch === 'E') {
            number += getNextChar();
            ch = peekNextChar();
            if (ch === '+' || ch === '-' || isDecimalDigit(ch)) {
                number += getNextChar();
                while (true) {
                    ch = peekNextChar();
                    if (!isDecimalDigit(ch)) {
                        break;
                    }
                    number += getNextChar();
                }
            } else {
                ch = 'character ' + ch;
                if (index >= length) {
                    ch = '<end>';
                }
                throw {
                    message: 'Unexpected ' + ch + ' after the exponent sign'
                };
            }
        }

        if (number === '.') {
            throw {
                message: 'Expecting decimal digits after the dot sign'
            };
        }

        return createToken(T.Number, number);
    }

    function reset(str) {
        expression = str;
        length = str.length;
        index = 0;
    }

    function next() {
        var token;

        skipSpaces();
        if (index >= length) {
            return undefined;
        }

        token = scanNumber();
        if (typeof token !== 'undefined') {
            return token;
        }

        token = scanOperator();
        if (typeof token !== 'undefined') {
            return token;
        }

        token = scanIdentifier();
        if (typeof token !== 'undefined') {
            return token;
        }


        throw {
            message: 'Unknown token from character ' + peekNextChar()
        };
    }

    function peek() {
        var token, idx;

        idx = index;
        try {
            token = next();
        } catch (e) {
            token = undefined;
        }
        index = idx;

        return token;
    }

    return {
        reset: reset,
        next: next,
        peek: peek
    };
};

TapDigit.Parser = function () {

    var lexer = new TapDigit.Lexer(),
        T = TapDigit.Token;

    function matchOp(token, op) {
        return (typeof token !== 'undefined') &&
            token.type === T.Operator &&
            token.value === op;
    }

    // ArgumentList := Expression |
    //                 Expression ',' ArgumentList
    function parseArgumentList() {
        var token, expr, args = [];

        while (true) {
            expr = parseExpression();
            if (typeof expr === 'undefined') {
                // TODO maybe throw exception?
                break;
            }
            args.push(expr);
            token = lexer.peek();
            if (!matchOp(token, ',')) {
                break;
            }
            lexer.next();
        }

        return args;
    }

    // FunctionCall ::= Identifier '(' ')' ||
    //                  Identifier '(' ArgumentList ')'
    function parseFunctionCall(name) {
        var token, args = [];

        token = lexer.next();
        if (!matchOp(token, '(')) {
            throw {
                message: 'Expecting ( in a function call "' + name + '"'
            };
        }

        token = lexer.peek();
        if (!matchOp(token, ')')) {
            args = parseArgumentList();
        }

        token = lexer.next();
        if (!matchOp(token, ')')) {
            throw {
                message: 'Expecting ) in a function call "' + name + '"'
            };
        }

        return {
            'Function' : {
                'name': name,
                'args': args
            }
        };
    }

    // Primary ::= Identifier |
    //             Number |
    //             '(' Assignment ')' |
    //             FunctionCall
    function parsePrimary() {
        var token, expr;

        token = lexer.peek();

        if (typeof token === 'undefined') {
            throw {
                message: 'Unexpected termination of expression'
            };
        }

        if (token.type === T.Identifier) {
            token = lexer.next();
            if (matchOp(lexer.peek(), '(')) {
                return parseFunctionCall(token.value);
            } else {
                return {
                    'Identifier': token.value
                };
            }
        }

        if (token.type === T.Number) {
            token = lexer.next();
            return {
                'Number': token.value
            };
        }

        if (matchOp(token, '(')) {
            lexer.next();
            expr = parseAssignment();
            token = lexer.next();
            if (!matchOp(token, ')')) {
                throw {
                    message: 'Expecting )'
                };
            }
            return {
                'Expression': expr
            };
        }

        throw {
            message: 'Parse error, can not process token ' + token.value
        };
    }

    // Unary ::= Primary |
    //           '-' Unary
    function parseUnary() {
        var token, expr;

        token = lexer.peek();
        if (matchOp(token, '-') || matchOp(token, '+')) {
            token = lexer.next();
            expr = parseUnary();
            return {
                'Unary': {
                    operator: token.value,
                    expression: expr
                }
            };
        }

        return parsePrimary();
    }

    // Multiplicative ::= Unary |
    //                    Multiplicative '*' Unary |
    //                    Multiplicative '/' Unary
    function parseMultiplicative() {
        var token, left, right;

        left = parseUnary();
        token = lexer.peek();
        if (matchOp(token, '*') || matchOp(token, '/')) {
            token = lexer.next();
            right = parseMultiplicative();
            return {
                'Binary': {
                    operator: token.value,
                    left: left,
                    right: right
                }
            };
        }
        return left;
    }

    // Additive ::= Multiplicative |
    //              Additive '+' Multiplicative |
    //              Additive '-' Multiplicative
    function parseAdditive() {
        var token, left, right;

        left = parseMultiplicative();
        token = lexer.peek();
        if (matchOp(token, '+') || matchOp(token, '-')) {
            token = lexer.next();
            right = parseAdditive();
            return {
                'Binary': {
                    operator: token.value,
                    left: left,
                    right: right
                }
            };
        }
        return left;
    }

    // Assignment ::= Identifier '=' Assignment |
    //                Additive
    function parseAssignment() {
        var token, expr;

        expr = parseAdditive();

        if (typeof expr !== 'undefined' && expr.Identifier) {
            token = lexer.peek();
            if (matchOp(token, '=')) {
                lexer.next();
                return {
                    'Assignment': {
                        name: expr,
                        value: parseAssignment()
                    }
                };
            }
            return {
                'Assignment': {
                    name: expr,
                    value: undefined
                }
            };
        }

        return expr;
    }

    // Expression ::= Assignment
    function parseExpression() {
        return parseAssignment();
    }

    function parse(expression) {
        var expr, token;

        lexer.reset(expression);
        expr = parseExpression();

        token = lexer.next();
        if (typeof token !== 'undefined') {
            throw {
                message: 'Unexpected token ' + token.value
            };
        }

        return {
            'Expression': expr
        };
    }

    return {
        parse: parse
    };
};

