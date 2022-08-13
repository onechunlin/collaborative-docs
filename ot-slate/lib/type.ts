import { Descendant, Operation } from "slate";

module.exports = {
  Operation,
  type: {
    name: "slate",
    uri: "http://sharejs.org/types/slate/v1",

    create: function (initial: Descendant[]): Descendant[] {
      return initial;
    },

    apply: function (snapshot: Descendant[], op: Operation) {},

    compose: function () {},

    transform: function () {},
  },
};
