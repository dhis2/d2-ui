import { userCanManage } from '../auth';
import _ from 'lodash';

const getObjectOf = (id) => ({
  id: "1234",
  user: {id},
});

const d2 = {
  currentUser: {
    id: "123",
    authorities: new Set(),
  },
};

describe("userCanManage", () => {
  it("should return false for void arguments", () => {
    expect(userCanManage(null, null)).toBe(false);
    expect(userCanManage(null, {})).toBe(false);
    expect(userCanManage(d2, null)).toBe(false);
    expect(userCanManage(d2, {user: null})).toBe(false);
  });

  it("should return false if current user is not the owner", () => {
    expect(userCanManage(d2, getObjectOf("not-the-owner"))).toBe(false);
  });

  it("should return true if currentUser is the owner", () => {
    expect(userCanManage(d2, getObjectOf(d2.currentUser.id))).toBe(true);
  });

  it("should return true if currentUser has the ALL authority even if it's not the owner", () => {
    const d2WithAllAuthority = _.merge(d2, {currentUser: {authorities: new Set(["ALL"])}});
    expect(userCanManage(d2WithAllAuthority, getObjectOf("not-the-owner"))).toBe(true);
  });
});
