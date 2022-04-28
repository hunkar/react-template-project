import { postRequest } from "../utils/connection";

jest.mock("axios", () => ({
  default: {
    post: () =>
      new Promise((res) =>
        res({
          data: {
            data: 12,
          },
        })
      ),
  },
}));

test("Result should be 12", async () => {
  const result = await postRequest();

  expect(result).toEqual(12);
});
