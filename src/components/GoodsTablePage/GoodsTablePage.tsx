import { Table, Pagination } from "antd";
import css from "./styles.module.css";
// import { debounce } from "lodash";
import { Input, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goodsAction,
  getGoods,
  getTotalGoods,
  getGoodsLoadStatus,
} from "../../store/goodsReducer";
import { CategoryType, getSideMenuItems } from "../../store/categoriesReducer";
import { useNavigate } from "react-router";
import { Loader } from "../Loader";
import { LOAD_STATUSES } from "../../store/constatns";

export interface GoodsCardType {
  id: string;
  categoryTypeId: string;
  label: string;
  price: string;
  img: string;
  description?: string;
  type?: string;
}

interface ParamsType {
  limit?: string;
  offset?: string;
  text?: string;
  categoryTypeIds?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortDirection?: string;
}

export const GoodsTablePage = () => {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("");
  const [offset, setOffset] = useState("");
  const [categoryTypeIds, setCategoryTypeIds] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: "Категория",
      dataIndex: "type",
      width: 150,
    },
    {
      title: "Товар",
      dataIndex: "label",
      width: 150,
      sorter: true,
      onHeaderCell: () => {
        return {
          onClick: () => {
            setSortBy("label");
            sortDirection === "asc"
              ? setSortDirection("desc")
              : setSortDirection("asc");
          },
        };
      },
    },
    {
      title: "Цена",
      dataIndex: "price",
      width: 150,
      sorter: true,
      onHeaderCell: () => {
        return {
          onClick: () => {
            setSortBy("price");
            sortDirection === "asc"
              ? setSortDirection("desc")
              : setSortDirection("asc");
          },
        };
      },
    },
  ];

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getParams = (obj: any) => {
    let newObj: any = {};
    for (let key in obj) {
      if (obj[key]) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  // const getDataFilter = () => {
  // const globalParams: ParamsType = {
  //   limit,
  //   offset,
  //   text,
  //   categoryTypeIds,
  //   minPrice,
  //   maxPrice,
  //   sortBy,
  // sortDirection
  // };
  // const queryParams = getParams(globalParams);
  // const searchParams = new URLSearchParams(queryParams).toString();
  //   dispatch(goodsAction.fetchGoods(searchParams));
  // };
  // const filterDebounced = debounce(getDataFilter, 1500);

  useEffect(() => {
    setTimeout(() => {
      const globalParams: ParamsType = {
        limit,
        offset,
        text,
        categoryTypeIds,
        minPrice,
        maxPrice,
        sortBy,
        sortDirection,
      };
      const queryParams = getParams(globalParams);
      const searchParams = new URLSearchParams(queryParams).toString();
      dispatch(goodsAction.fetchGoods(searchParams));
    }, 1500);
  }, [
    dispatch,
    limit,
    offset,
    text,
    categoryTypeIds,
    minPrice,
    maxPrice,
    sortBy,
    sortDirection,
  ]);

  const dataGoods: GoodsCardType[] = useSelector(getGoods);
  const totalItems: number = useSelector(getTotalGoods);
  const categoriesItems: CategoryType[] = useSelector(getSideMenuItems);
  const pageStatus = useSelector(getGoodsLoadStatus);
  const maks = { 0: "0", 100: "100х10" };

  return (
    <div className={css.tablePage}>
      <div className={css.filters}>
        <p className={css.filtersTitle}>Параметры поиска:</p>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По товару:</label>
          <Input
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              setOffset("0");
              setLimit("10");
            }}
          />
        </div>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По категории:</label>
          <Input.Group>
            <Select
              defaultValue={categoriesItems[0].label}
              style={{ width: "70%" }}
              onChange={(value: string) => {
                setCategoryTypeIds(value);
                setOffset("0");
                setLimit("10");
              }}
            >
              {categoriesItems.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Input.Group>
        </div>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По цене:</label>
          <Slider
            marks={maks}
            range
            step={1}
            defaultValue={[20, 50]}
            onChange={(value) => {
              setMinPrice(String(value[0] * 10));
              setMaxPrice(String(value[1] * 10));
              setOffset("0");
              setLimit("10");
            }}
          />
        </div>
      </div>
      <div className={css.table}>
        {pageStatus === LOAD_STATUSES.LOADING && <Loader />}
        {pageStatus === LOAD_STATUSES.SUCCESS && (
          <div>
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={dataGoods}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(`/product/${record.id}`);
                  },
                };
              }}
            />
            <Pagination
              onChange={(page: number, pageSize: number | undefined) => {
                setLimit(String(pageSize));
                setPage(page);
                if (pageSize) {
                  setOffset(String((page - 1) * pageSize));
                  setPageSize(pageSize);
                }
              }}
              total={totalItems}
              current={page}
              pageSize={pageSize}
            />
          </div>
        )}
        {pageStatus === LOAD_STATUSES.FAILURE && (
          <div className={css.error}>Ошибка, попробуйте позже</div>
        )}
      </div>
    </div>
  );
};
