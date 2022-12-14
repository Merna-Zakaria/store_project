import { User, UserSrore } from "../user";
import { setupTestDatabase } from "../../utils/testUtils";

const store = new UserSrore();

describe("user model", () => {
  let dbResult;
  let userRes: User;
  let userPayload: User;

  beforeAll(async () => {
    dbResult = await setupTestDatabase();
    userRes = dbResult.userCreated;
    userPayload = dbResult.userPayload;
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result?.length).toBeGreaterThanOrEqual(1);
  });

  it("should have an show method", () => {
    expect(store.show).toBeDefined();
  });

  it("show method should return single user", async () => {
    const userId = userRes.id;
    const result = await store.show(JSON.stringify(userId));
    expect(result?.id).toEqual(userId);
  });

  it("create method should return user", async () => {
    const result = await store.create({ ...userPayload });
    expect(result.first_name).toEqual(userPayload.first_name);
    expect(result.last_name).toBe(userPayload.last_name);
  });

  it("authenticate method should return user", async () => {
    const result = await store.authenticate({ ...userPayload });
    expect(result).not.toBeNull();
  });
  // //   it('delete method should remove the user', async () => {
  // //     store.delete("1");
  // //     const result = await store.index()

  // //     expect(result).toEqual([]);
  // //   });
});
