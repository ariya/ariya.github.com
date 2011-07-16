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

/*global TapDigit:true */
var lexer, parseId;

function parse() {
    if (parseId) {
        window.clearTimeout(parseId);
    }

    parseId = window.setTimeout(function () {
        var code, str,
            lexer, tokens, token, i,
            parser, syntax;

        code = document.getElementById('code').value;
        try {
            if (typeof lexer === 'undefined') {
                lexer = new TapDigit.Lexer();
            }

            if (typeof parser === 'undefined') {
                parser = new TapDigit.Parser();
            }

            tokens = [];
            lexer.reset(code);
            while (true) {
                token = lexer.next();
                if (typeof token === 'undefined') {
                    break;
                }
                tokens.push(token);
            }

            str = '<table width=200>\n';
            for (i = 0; i < tokens.length; i += 1) {
                token = tokens[i];
                str += '<tr>';
                str += '<td>';
                str += token.type;
                str += '</td>';
                str += '<td align=center>';
                str += token.value;
                str += '</td>';
                str += '</tr>';
                str += '\n';
            }
            document.getElementById('tokens').innerHTML = str;

            syntax = parser.parse(code);

            function stringify(object, key, depth) {
                var indent = '',
                    str = '',
                    value = object[key],
                    i,
                    len;

                while (indent.length < depth * 3) {
                    indent += ' ';
                }

                switch (typeof value) {
                case 'string':
                    str = value;
                    break;
                case 'number':
                case 'boolean':
                case 'null':
                    str = String(value);
                    break;
                case 'object':
                    for (i in value) {
                        if (value.hasOwnProperty(i)) {
                            str += ('<br>' + stringify(value, i, depth + 1));
                        }
                    }
                    break;
                }

                return indent + ' ' + key + ': ' + str;
            }

            document.getElementById('syntax').innerHTML = stringify(syntax, 'Expression', 0);
        } catch (e) {
            document.getElementById('syntax').innerText = e.message;
            document.getElementById('tokens').innerText = '';
        }
        parseId = undefined;
    }, 345);
}
