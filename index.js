const tau = require('tau-prolog')
const parser = require('compromise')
const testData = require("./test")

class Program {
    constructor(source) {
        this._session = tau.create();
        this._session.consult(source);
    }
    query(source) {
        this._session.query(source);
        return new QueryIterator(this._session);
    }
    queryArray(source) {
        return Array.from(this.query(source), s =>
            Object.keys(s.links).map(key => {
                return { key, val: s.links[key].id || s.links[key].value }
            }
            ).reduce((acc, val) => {

                acc[val.key] = val.val
                return acc
            }, {})
        )
    }
}

class QueryIterator {
    constructor(session) {
        this._session = session;
        this._callback = x => this._value = x;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        this._session.answer(this._callback);
        return this._value ? { done: false, value: this._value } : { done: true };
    }
}

// const nlp = (data) => {
//     const request = parser(String.raw(data))
//     const verb = request.verbs().toPastTense().slice(0, 1).text().trim()
//     const teams = request.values().numbers()
//     return teams.map(t => `${verb}(X, frc${t})`).join(';') + "."
// }

const pl = (data) => {
    return new Program(String.raw(data))
}

// iri = pl`
// defended(frc48, frc111).
// defended(frc48, frc2910).
// defended(frc25, frc910).
// defended(frc6443, frc33).
// scored(lRocket1, frc33).
// scored(lRocket3, frc33).
// scored(lRocket2, frc33).
// scored(lRocket1, frc2910).
// scoredUnderDefense(Team, Defender, Location) :- defended(Defender, Team), scored(Location, Team).
// `

// const test = new Program(testData)
const testRes = test.queryArray(`location(frc33, T, X, Y),  '@<'(1562947004.0, T), '@>'(1562947024.0, T).`)
console.log(Array.from(testRes))
