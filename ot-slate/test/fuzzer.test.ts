import { Descendant, Operation, Transforms } from "slate";

const _ = require("lodash");
const expect = require("chai").expect;
const fuzzer = require("ot-fuzzer");
const slate = require("../lib/type");

function generateRandomOp(snapshot: Descendant[]): [Operation, Descendant[]] {
  const newSnapshot = _.cloneDeep(snapshot);
  const op: Operation = {
    type: "insert_text",
    path: [],
    text: "xxx",
    offset: 0,
  };
  return [op, newSnapshot];
}

describe("fuzzer", function () {
  it("random operations", function () {
    expect(function () {
      fuzzer(slate.type, generateRandomOp, 10);
    }).to.not.throw(Error);
  });
});
