import { Api } from "../api";

const mockedFetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });

describe("Api.getGoods", () => {
  const GET_GOODS_URL = "/api/goods?";
  let api: Api;

  beforeEach(() => {
    // @ts-ignore
    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn(mockedFetch);
    api = new Api();
  });

  it("корректно собирает пустой урл", async () => {
    await api.getGoods("");
    expect(fetch).toBeCalledWith(GET_GOODS_URL);
  });

  it("корректно собирает урл с параметрами", async () => {
    await api.getGoods("ids=3");
    expect(fetch).toBeCalledWith(`${GET_GOODS_URL}ids=3`);
  });

  it("корректно собирает урл с параметрами поиска", async () => {
    await api.getGoods(
      "limit=10&offset=0&text=fa&categoryTypeIds=3&minPrice=200&maxPrice=690"
    );
    expect(fetch).toBeCalledWith(
      `${GET_GOODS_URL}limit=10&offset=0&text=fa&categoryTypeIds=3&minPrice=200&maxPrice=690`
    );
  });
});
